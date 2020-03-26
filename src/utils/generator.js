import * as _ from "lodash";
import * as beautify from "js-beautify";

//將 table schema 轉成 Array
export const formatTableSchemaToArray = _tableSchema => {
  let preprocessData = _.split(_tableSchema, "[");
  const patt = new RegExp("]");
  preprocessData = _.filter(preprocessData, item => patt.test(item));
  preprocessData = _.map(preprocessData, item => _.split(item, "]")[0]);

  preprocessData = _.filter(preprocessData, o => {
    return o !== "" && o !== "\n";
  });

  const map = new Map();

  map.set("VAR", "String"); //VARCHAR
  map.set("DEC", "Double"); //DECIMAL
  map.set("INT", "Integer"); //INT
  map.set("NVA", "String"); //NVARCHAR
  map.set("CHA", "String"); //CHAR
  map.set("BIT", "Boolean"); //BIT

  //ignore entity colunm
  const ignoreColumnName = [
    "CREATE_TIME",
    "CREATE_USER",
    "CREATE_USER_NAME",
    "LAST_MODIFIED",
    "LAST_MODIFY_USER",
    "LAST_MODIFY_USER_NAME",
    "TS",
    "DR",
    "ID"
  ];

  let result = [];
  for (let i = 0; i < preprocessData.length; i += 2) {
    const isBasePO =
      ignoreColumnName.indexOf(_.toUpper(preprocessData[i])) > -1;

    if (isBasePO) {
      continue;
    }

    let obj = {
      key: preprocessData[i],
      columnName: preprocessData[i],
      columnType: preprocessData[i + 1],
      javaName: _.camelCase(preprocessData[i]),
      javaType: map.get(preprocessData[i + 1].trim().substring(0, 3))
        ? map.get(preprocessData[i + 1].trim().substring(0, 3))
        : "String"
    };
    result.push(obj);
  }

  return result;
};

//產生 PO
export const genPO = _setting => {
  const {
    tableName,
    tableSchema,
    packageName,
    projectName,
    at_CodeRules
  } = _setting;
  let result = "";

  const hasEnum = _.find(
    tableSchema,
    item => item.annotation === "at_I18nEnumCode"
  );

  result += `
      package ${packageName}.po;

      import com.alibaba.fastjson.annotation.JSONField;
      import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
      import com.yonyou.iuap.baseservice.entity.AuditTrail;
      import com.yonyou.iuap.baseservice.entity.MainBusinessObjectCode;
      import com.yonyou.iuap.baseservice.entity.annotation.BizLogs;
      import com.yonyou.iuap.baseservice.entity.annotation.CodeRules;
      import com.yonyou.iuap.baseservice.entity.annotation.I18nEnumCode;
      import com.yonyou.iuap.baseservice.entity.annotation.Reference;
      import com.yonyou.iuap.baseservice.support.bpm.bo.IBpmModel;
      import com.yonyou.iuap.baseservice.support.condition.Condition;
      import com.yonyou.iuap.baseservice.support.condition.Match;
      `;

  if (hasEnum) {
    result += `import ${packageName}.constant.*;`;
  }
  result += `
      import com.yonyou.iuap.ucf.dao.BasePO;
      import lombok.Data;

      import javax.persistence.Column;
      import javax.persistence.Table;
      import javax.persistence.Transient;
      import java.math.BigDecimal;

      import static com.yonyou.iuap.baseservice.support.condition.Match.EQ;
      import static com.yonyou.iuap.baseservice.support.condition.Match.LIKE;

      //@BizLogs(metaId="------")
      @JsonIgnoreProperties(ignoreUnknown = true)
      @Table(name = "${tableName}")`;

  //檢查是否有需code rule字段
  if (at_CodeRules) {
    result += `
    @CodeRules(ruleCode = "xxxxx", target = "${at_CodeRules}")`;
  }

  result += `
  @Data
    public class ${projectName}PO extends BasePO implements AuditTrail  {
  `;

  _.forEach(tableSchema, item => {
    switch (item.annotation) {
      case "at_I18nEnumCode":
        result += `

    /*
    *
    * ${item.columnName}
    * 
    */    
    @I18nEnumCode(clazz = ${_.upperFirst(item.javaName)}Enum.class, target = "${
          item.javaName
        }EnumValue")
    @Condition
    @Column(name = "${item.columnName}")
    private ${item.javaType} ${item.javaName}; 

        
    @Transient
    private String ${item.javaName}EnumValue;  
        
        `;
        break;
      case "at_Reference":
        result += `


                  /*
                  *
                  * ${item.columnName}
                  * 
                  */   
              @Condition
              @Column(name = "${item.columnName}")
              @Reference(code = "xxxxx", srcProperties = {"code"}, desProperties = {"${item.javaName}Name"})
              private ${item.javaType} ${item.javaName}; 


      
      `;

        const findRefColumnName = _.find(
          tableSchema,
          item => item.javaName === `${item.javaName}Name`
        );
        if (!findRefColumnName) {
          result += `
            @Transient
            private String ${item.javaName}Name;  `;
        }
        break;
      default:
        result += ` 

        /*
        *
        * ${item.columnName}
        * 
        */   
        @Condition(match = Match.LIKE)
        @Column(name = "${item.columnName}")
        private ${item.javaType} ${item.javaName}; 
        `;
    }
  });

  result += `
         /**
		     * 修改人 
		     */
		    @Column(name = "last_modify_user")
		    private String lastModifyUser;

		    @Column(name = "last_modify_user_name")
		    //@Transient
		    private String lastModifyUserName;

		    /**
		     * 修改時間
		     */
		    @Column(name = "last_modified")
		    private String lastModified;

		    /**
		     * 創建人
		     */
		    @Column(name = "create_user")
		    private String createUser;

		    @Column(name = "create_user_name")
		    private String createUserName;

		    /**
		     * 創建時間
		     */
		    @Column(name = "create_time")
		    private String createTime;
  
  `;

  result += `
    }
  `;

  return beautify.js_beautify(result);
};

//產生 DAO
export const genDAO = _setting => {
  const {
    tableName,
    tableSchema,
    packageName,
    projectName,
    at_CodeRules
  } = _setting;
  let result = "";

  result += `
  
  package ${packageName}.dao;

  import org.apache.ibatis.annotations.Mapper;
  import org.springframework.stereotype.Repository;
  import ${packageName}.po.${projectName}PO;
  import com.yonyou.iuap.ucf.dao.BaseDAO;
  
  @Mapper
  @Repository
  public interface  ${projectName}DAO extends BaseDAO<${projectName}PO, String> {
  
  }
  
  `;
  return beautify.js_beautify(result);
};

//產生 Service
export const genService = _setting => {
  const {
    tableName,
    tableSchema,
    packageName,
    projectName,
    at_CodeRules
  } = _setting;
  let result = "";

  result += ` 

          package ${packageName}.service;

        import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.I18N_ENUM;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;
        import com.yonyou.iuap.baseservice.intg.service.GenericUcfService;
        import com.yonyou.iuap.baseservice.intg.support.ServiceFeature;
        import ${packageName}.dao.${projectName}DAO;
        import ${packageName}.po.${projectName}PO;
        import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.AUDIT;
        import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.BIZLOGS;


        @Service
        public class ${projectName}Service extends GenericUcfService<${projectName}PO,String> {

            @Autowired
            private ${projectName}DAO dao;

            @Autowired
            public void setContractDAO(${projectName}DAO dao) {
                this.dao = dao;
                super.setGenericMapper(dao);
            }




  `;

  //要插拔的服務

  let services = ["AUDIT"];

  const hasEnum = _.find(
    tableSchema,
    item => item.annotation === "at_I18nEnumCode"
  );

  if (hasEnum) {
    services.push("I18N_ENUM");
  }

  if (at_CodeRules) {
    services.push("ServiceFeature.CODERULES");
  }

  result += ` 

  @Override
  protected ServiceFeature[] getFeats() {
    return new ServiceFeature[] {${services.toString()}};
  }

  }
`;
  return beautify.js_beautify(result);
};

//產生 DTO
export const genDTO = _setting => {
  const {
    tableName,
    tableSchema,
    packageName,
    projectName,
    at_CodeRules
  } = _setting;
  let result = "";

  result += ` 
   package ${packageName}.dto;

      import java.util.List;
      import java.util.Map;
      import com.yonyou.iuap.baseservice.support.entity.vo.BaseSearchVO;
      import lombok.Data;

      @Data
      public class ${projectName}SearchVO extends BaseSearchVO {
        //动态查询方法传入查询条件A1
          /**处理行过滤参数*/
          private List<Map<String, Object>> whereParam;
          /**处理复合排序参数*/
        private List<Map<String, String>> orderByParam;
    `;

  _.forEach(tableSchema, item => {
    result += ` 

    /** ${item.javaName} **/
    private ${item.javaType} ${item.javaName};

     `;
  });

  result += ` } `;

  return beautify.js_beautify(result);
};

//產生 Controller
export const genController = _setting => {
  const {
    tableName,
    tableSchema,
    packageName,
    projectName,
    at_CodeRules
  } = _setting;
  let result = "";

  result += `package  ${packageName}.controller;

    import java.io.Serializable;
    import java.lang.reflect.Field;

    import javax.servlet.http.HttpServletRequest;

    import org.apache.commons.lang3.StringUtils;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.data.domain.Page;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;

    import com.alibaba.fastjson.JSONObject;
    import com.yonyou.iuap.baseservice.support.entity.dto.SimpleSearchDTO;
    import com.yonyou.iuap.baseservice.support.util.CommonTools;
    import ${packageName}.dto.${projectName}SearchVO;
    import ${packageName}.po.${projectName}PO;
    import ${packageName}.service.${projectName}Service;
    import com.yonyou.iuap.demo.utils.CookiesUtils;
    import com.yonyou.iuap.demo.utils.SearchSupportUtil;
    import com.yonyou.iuap.ucf.common.exception.BusinessException;
    import com.yonyou.iuap.ucf.common.i18n.MessageUtils;
    import com.yonyou.iuap.ucf.common.rest.CommonResponse;
    import com.yonyou.iuap.ucf.dao.support.SqlParam;
    import com.yonyou.iuap.ucf.dao.support.UcfPageRequest;
    import com.yonyou.iuap.ucf.dao.utils.FieldUtil;

    import cn.hutool.core.util.ReflectUtil;

    @RestController
    @RequestMapping(value = "/${_.toLower(projectName)}")
    public class ${projectName}Controller {

    private Logger logger = LoggerFactory.getLogger(${projectName}Controller.class);
    
    @Autowired
    private ${projectName}Service ${_.toLower(projectName)}Service;
    
    
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public Object list(@RequestBody ${projectName}SearchVO searchVO) {
        //case1：分页条数=1时查询全部数据---5.0分页约定
        if (searchVO.getPageSize() == 1) {
       searchVO.setPageSize(Integer.MAX_VALUE-1);
     }
        //case2：orderField转换--->属性到字段,验证排序条件的合法性
        if(!StringUtils.isEmpty(searchVO.getOrderField())&&!StringUtils.isEmpty(searchVO.getOrderSort())){
          try {
            Field field = ReflectUtil.getField(${projectName}PO.class, searchVO.getOrderField());
            searchVO.setOrderField(FieldUtil.getColumnName(field));
            searchVO.setOrderSort(searchVO.getOrderSort().toString().toUpperCase());
       } catch (Exception e) {
         return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.xxxxxx.0001")));
       }
        }


        /**A2标准查询对于String类型字段需要先做如下处理**/
        //TODO 需要修改SimpleSearchDTO的toSearchParams方法中非空判断，目前先这样处理非EQ查询

        `;

  //處理 String 類型非空判斷

  _.forEach(tableSchema, item => {
    if (item.javaType === "String") {
      result += `
      
      if (StringUtils.isEmpty(searchVO.get${_.upperFirst(item.javaName)}())) {
        searchVO.set${_.upperFirst(item.javaName)}(null);
      }
      
      `;
    }
  });

  result += ` 
        SimpleSearchDTO<${projectName}SearchVO> searchDTO = new SimpleSearchDTO<>();
        searchDTO.setSearchEntity(searchVO);
        /**1.通过condition注解实现where条件查询*/
        SqlParam sqlParams = (SqlParam) searchDTO.toSearchParams(${projectName}PO.class);

        /**A1多过滤和多排序处理*/
        SearchSupportUtil.processSqlParamsFor${_.upperFirst(
          projectName
        )}(searchVO, ${projectName}PO.class,sqlParams);
       
        Page<${projectName}PO> page = ${_.toLower(
    projectName
  )}Service.selectAllByPage(UcfPageRequest.of(searchVO.getPageIndex(), searchVO.getPageSize()), sqlParams);
        return CommonResponse.ofSuccess(page);
    }
    
    
    
    

    @RequestMapping(value = "/get${projectName}InfoById", method = RequestMethod.GET)
    public Object get${projectName}InfoByUniqueKey(@RequestParam(value = "id") Serializable id) {
        if (id == null || id.equals("")) {
            logger.warn(MessageUtils.getMessage("ja.iuap.con.0001"));
            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(4L), MessageUtils.getMessage("ja.iuap.con.0001")));
        }
        ${projectName}PO vo = ${_.toLower(
    projectName
  )}Service.findUnique("id", id);
        if (vo != null) {
            logger.info("查询成功============="+id);
            return CommonResponse.ofSuccess(vo);
        } else {
            logger.warn(MessageUtils.getMessage("ja.iuap.con.0001"));
            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.con.0002")));
        }
    }
    
    
    
    @RequestMapping(value = "/saveEntity", method = RequestMethod.POST)
    @Transactional
    public Object saveEntity(HttpServletRequest request, @RequestBody ${projectName}PO... vo) {
   
      if (vo.length == 0) {
            logger.warn(MessageUtils.getMessage("ja.iuap.con.0003"));
            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.con.0003")));
        }
        String value = CookiesUtils.getUnameByCookies(request);
        for (${projectName}PO ${projectName}PO : vo) {
          if(${projectName}PO.getId()==null){
            ${projectName}PO.setCreateUserName(value);
          }
          ${projectName}PO.setLastModifyUserName(value);
          
 
          ${_.toLower(projectName)}Service.save(${projectName}PO);
     }
        return CommonResponse.ofSuccess();

    }  
    
    
    
    
    @RequestMapping(value = "/deleEntity", method = RequestMethod.POST)
    public Object deleEntity(@RequestBody ${projectName}PO... entities) {
        if (entities.length == 0) {
            logger.warn(MessageUtils.getMessage("ja.iuap.con.0004"));
            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.con.0004")));
        }
        int count = 0;
        for (${projectName}PO entity : entities) {
            count += this.${_.toLower(
              projectName
            )}Service.delete(entity.getId());
        }
        if (count == entities.length) {
            JSONObject result = new JSONObject();
            result.put("count", count);
            return CommonResponse.ofSuccess(result);
        } else {
            logger.warn(MessageUtils.getMessage("ja.iuap.con.0004"));
            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(5L), MessageUtils.getMessage("ja.iuap.con.0004")));
        }
 }





    
    
}
`;
  return _.replace(beautify.js_beautify(result), / L\)/g, "L)");
};

//產生 contant/Enum
export const genConstantEnum = (_setting, _enumColumnObj) => {
  const {
    tableName,
    tableSchema,
    packageName,
    projectName,
    at_CodeRules
  } = _setting;

  const { javaName, javaType } = _enumColumnObj;

  let result = "";

  result += `
          package ${packageName}.constant;

        import com.yonyou.iuap.ucf.common.enums.I18nEnum;

        import java.io.Serializable;

        public enum ${_.upperFirst(javaName)}Enum implements I18nEnum {
          /*
          Female(0,"女","ja.xxxxx.enum.0001"),
          Male(1,"男","ja.xxxxx.enum.0002")
          */
          
          ;
          
          private ${javaType} key;
          
          private String value;
          
          private String i18nKey;
          
          private ${_.upperFirst(
            javaName
          )}Enum(${javaType} key, String value, String i18nKey) {
            this.key = key;
            this.value = value;
            this.i18nKey = i18nKey;
          }
          @Override
          public String getI18nTextCode() {
            return i18nKey;
          }

          @Override
          public String getI18nDefaultText() {
            return value;
          }

          @Override
          public Serializable code() {
            return key;
          }
        }

  `;

  return beautify.js_beautify(result);
};

//產生 utils/processSqlParamsFor$
export const genUtilsProcessSqlParams = _setting => {
  const {
    tableName,
    tableSchema,
    packageName,
    projectName,
    at_CodeRules
  } = _setting;
  let result = "";

  result += `
  // import ${packageName}.dto.${_.upperFirst(projectName)}SearchVO;
  public static SqlParam processSqlParamsFor${_.upperFirst(
    projectName
  )}(${_.upperFirst(
    projectName
  )}SearchVO searchVO, Class<?> entityClass,SqlParam sqlParams) {
		if (CollectionUtils.isNotEmpty(searchVO.getWhereParam())) {
			@SuppressWarnings("all")
			List<Map<String, Object>> wheres = searchVO.getWhereParam();
			for (Map<String, Object> statment : wheres) {
				String keyStr = String.valueOf(statment.get(WhereParams.key.name()));
				Object valueObj = statment.get(WhereParams.value.name());
				String conditionStr = String.valueOf(statment.get(WhereParams.condition.name()));
				/**关键参数缺一不可*/
				if (StringUtils.isEmpty(keyStr) || StringUtils.isEmpty(valueObj)) {
					logger.warn("reading incomplete whereParams [" + keyStr + ":" + valueObj + "]");
					throw new RuntimeException("recieving incomplete whereParams [" + keyStr + ":" + valueObj + "]");
				}
				Field keyField = ReflectUtil.getField(entityClass, keyStr.toString());
				if (keyField == null) {
					logger.warn("finding none field [" + keyStr + "] in model class[" + entityClass + "]!!");
					throw new RuntimeException(
							"thre is no field [" + keyStr + "] in model class[" + entityClass + "]!!");
				}
				String keyColunm = FieldUtil.getColumnName(keyField);
				if (StringUtils.isEmpty(conditionStr)) {
					sqlParams.eq(keyColunm, valueObj);
				} else if (conditionStr.equalsIgnoreCase(MatchParams.LIKE.name())) {
					sqlParams.like(keyColunm, String.valueOf(valueObj));
				} else if (conditionStr.equalsIgnoreCase(MatchParams.ULIKE.name())) {
					sqlParams.notLike(keyColunm, String.valueOf(valueObj));
				} else if (conditionStr.equalsIgnoreCase(MatchParams.EQ.name())) {
					sqlParams.eq(keyColunm, valueObj);
				} else if (conditionStr.equalsIgnoreCase(MatchParams.UEQ.name())) {
					sqlParams.ne(keyColunm, valueObj);
				} else if (conditionStr.equalsIgnoreCase(MatchParams.LLIKE.name())) {
					sqlParams.like(keyColunm, "%" + String.valueOf(valueObj));
				} else if (conditionStr.equalsIgnoreCase(MatchParams.RLIKE.name())) {
					sqlParams.like(keyColunm, String.valueOf(valueObj) + "%");
				} else {
					sqlParams.eq(keyColunm, valueObj);
				}
			}
		}
		if (CollectionUtils.isNotEmpty(searchVO.getOrderByParam())) {
			@SuppressWarnings("all")
            List<Map<String, String>> sorts = searchVO.getOrderByParam();
            if (sorts.size()>0){
            	List<String> fields = new ArrayList<String>();
                for (Map<String, String> sort : sorts) {
                    if (sort.keySet().size() > 0 && sort.keySet().toArray()[0] != null) {
                        Field keyField = ReflectUtil.getField(entityClass, sort.keySet().toArray()[0].toString());
                        if (keyField==null){
                            throw new RuntimeException("cannot find field "+sort.keySet().toArray()[0].toString()+" in  model [" + entityClass + "] ");
                        }
                        if(sort.get(sort.keySet().toArray()[0]).toString().equalsIgnoreCase(Direction.DESC)){
                        	fields.add(FieldUtil.getColumnName(keyField)+" "+Direction.DESC);
                        }else {
                        	fields.add(FieldUtil.getColumnName(keyField)+" "+Direction.ASC);
						}
                    }
                }
                sqlParams.orderBy(fields.toArray( new String[]{}));
            }else {
                logger.debug("receiving none sort param in sortMap of querying =>"+entityClass);
            }
        }
		return sqlParams;

	}
  
  `;

  return beautify.js_beautify(result);
};
