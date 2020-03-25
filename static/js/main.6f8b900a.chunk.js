(this["webpackJsonpiuap5-be-generator"]=this["webpackJsonpiuap5-be-generator"]||[]).push([[0],{181:function(e,t,n){e.exports=n(572)},186:function(e,t,n){},188:function(e,t,n){},210:function(e,t,n){},335:function(e,t,n){},372:function(e,t,n){},571:function(e,t,n){},572:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(8),i=n.n(r),c=(n(186),n(26)),s=o.a.createContext(),l=function(e){var t=Object(a.useState)({}),n=Object(c.a)(t,2),o=(n[0],n[1],Object(a.useState)([])),r=Object(c.a)(o,2);r[0],r[1]},m=(n(39),n(14)),u=n(580);n(188);function p(){return o.a.createElement("div",null,o.a.createElement(m.a,{ghost:!0,className:"github-btn",icon:o.a.createElement(u.a,null)},o.a.createElement("a",{href:"https://github.com/openopen114/iuap5-be-generator",target:"_blank"}," ","Github")),o.a.createElement("h1",{className:"app-title"},"IUAP5 BE GENERATOR"))}n(574);var g=n(32),d=(n(207),n(66)),y=n(3),S=n(31),v=(n(210),d.a.TextArea);function f(){var e=Object(a.useContext)(s).setSetting,t=g.a.useForm(),n=Object(c.a)(t,1)[0];return o.a.createElement("div",{className:"setting-area"},o.a.createElement(g.a,{layout:"vertical",form:n,onFinish:function(t){console.log("onFinish Success:"),console.log(t);var n=t.tableName,a=t.tableSchema,o=t.packageName,r=t.projectName,i=function(e){var t=y.split(e,"["),n=new RegExp("]");t=y.filter(t,(function(e){return n.test(e)})),t=y.map(t,(function(e){return y.split(e,"]")[0]})),t=y.filter(t,(function(e){return""!==e&&"\n"!==e}));var a=new Map;a.set("VAR","String"),a.set("DEC","Double"),a.set("INT","Integer"),a.set("NVA","String"),a.set("CHA","String"),a.set("BIT","Boolean");for(var o=["CREATE_TIME","CREATE_USER","LAST_MODIFIED","LAST_MODIFY_USER","TS","DR","ID"],r=[],i=0;i<t.length;i+=2){if(!(o.indexOf(y.toUpper(t[i]))>-1)){var c={key:t[i],columnName:t[i],columnType:t[i+1],javaName:y.camelCase(t[i]),javaType:a.get(t[i+1].trim().substring(0,3))?a.get(t[i+1].trim().substring(0,3)):"String"};r.push(c)}}return r}(a);e({tableName:y.toUpper(n),tableSchema:i,packageName:y.toLower(o)+y.toLower(r),projectName:y.upperFirst(r)})},name:"setting-area-form"},o.a.createElement(g.a.Item,{label:"# Table Name",name:"tableName",rules:[{required:!0,message:"Please input your Table Name!"}]},o.a.createElement(d.a,null)),o.a.createElement(g.a.Item,{label:"# Table Schema",name:"tableSchema",rules:[{required:!0,message:"Please input your table Schema !"}]},o.a.createElement(v,{rows:10})),o.a.createElement(g.a.Item,{label:"# Package Name",name:"packageName",rules:[{required:!0,message:"Please input your package Name!"}]},o.a.createElement(d.a,{defaultValue:"com.yonyou.iuap.xxx"})),o.a.createElement(g.a.Item,{label:"# Project Name",name:"projectName",rules:[{required:!0,message:"Please input your Project Name !"}]},o.a.createElement(d.a,null)),o.a.createElement(g.a.Item,null,o.a.createElement(m.a,{type:"primary",htmlType:"submit"},"Submit"))))}n(573);var b=n(180),h=(n(146),n(27)),O=n(88),C=n(581);n(335);function E(){var e=Object(a.useContext)(s),t=e.setting,n=e.setSetting,r=e.setGenResult,i=t.tableSchema;console.log("tableSchema"),console.log(i);var c=function(){console.log("\u7522\u751f\u5f8c\u7aef\u4e94\u5bf6");var e=t.projectName,n=[];y.forEach(i,(function(a){if("at_I18nEnumCode"===a.annotation){var o={location:"#domain",codeString:function(e,t){e.tableName,e.tableSchema;var n=e.packageName,a=(e.projectName,e.at_CodeRules,t.javaName),o=t.javaType,r="";return r+="\n          package ".concat(n,".constant;\n\n        import com.yonyou.iuap.ucf.common.enums.I18nEnum;\n\n        import java.io.Serializable;\n\n        public enum ").concat(y.upperFirst(a),'Enum implements I18nEnum {\n          /*\n          Female(0,"\u5973","ja.xxxxx.enum.0001"),\n          Male(1,"\u7537","ja.xxxxx.enum.0002")\n          */\n          \n          ;\n          \n          private ').concat(o," key;\n          \n          private String value;\n          \n          private String i18nKey;\n          \n          private ").concat(y.upperFirst(a),"Enum(").concat(o," key, String value, String i18nKey) {\n            this.key = key;\n            this.value = value;\n            this.i18nKey = i18nKey;\n          }\n          @Override\n          public String getI18nTextCode() {\n            return i18nKey;\n          }\n\n          @Override\n          public String getI18nDefaultText() {\n            return value;\n          }\n\n          @Override\n          public Serializable code() {\n            return key;\n          }\n        }\n\n  "),S.js_beautify(r)}(t,a),title:"".concat(e,"Enum")};n.push(o)}}));var a=function(e){var t=e.tableName,n=e.tableSchema,a=e.packageName,o=e.projectName,r=e.at_CodeRules,i="";return i+="\n      package ".concat(a,".po;\n\n      import com.alibaba.fastjson.annotation.JSONField;\n      import com.fasterxml.jackson.annotation.JsonIgnoreProperties;\n      import com.yonyou.iuap.baseservice.entity.AuditTrail;\n      import com.yonyou.iuap.baseservice.entity.MainBusinessObjectCode;\n      import com.yonyou.iuap.baseservice.entity.annotation.BizLogs;\n      import com.yonyou.iuap.baseservice.entity.annotation.CodeRules;\n      import com.yonyou.iuap.baseservice.entity.annotation.I18nEnumCode;\n      import com.yonyou.iuap.baseservice.entity.annotation.Reference;\n      import com.yonyou.iuap.baseservice.support.bpm.bo.IBpmModel;\n      import com.yonyou.iuap.baseservice.support.condition.Condition;\n      import com.yonyou.iuap.baseservice.support.condition.Match;\n      // import ").concat(a,'.constant.*;\n      import com.yonyou.iuap.ucf.dao.BasePO;\n      import lombok.Data;\n\n      import javax.persistence.Column;\n      import javax.persistence.Table;\n      import javax.persistence.Transient;\n      import java.math.BigDecimal;\n\n      import static com.yonyou.iuap.baseservice.support.condition.Match.EQ;\n      import static com.yonyou.iuap.baseservice.support.condition.Match.LIKE;\n\n\n      @JsonIgnoreProperties(ignoreUnknown = true)\n      @Table(name = "').concat(t,'")\n    '),r&&(i+='@CodeRules(ruleCode = "xxxxx", target = "'.concat(r,'")')),i+="\n    @Data\n    public class ".concat(o,"PO extends BasePO implements AuditTrail  {\n  "),y.forEach(n,(function(e){switch(e.annotation){case"at_I18nEnumCode":i+="\n\n    /*\n    *\n    * ".concat(e.columnName,"\n    * \n    */    \n    @I18nEnumCode(clazz = ").concat(y.upperFirst(e.javaName),'Enum.class, target = "').concat(e.javaName,'EnumValue")\n    @Condition\n    @Column(name = "').concat(e.columnName,'")\n    private ').concat(e.javaType," ").concat(e.javaName,"; \n\n        \n    @Transient\n    private String ").concat(e.javaName,"EnumValueValue;  \n        \n        ");break;case"at_Reference":i+="\n\n\n        /*\n        *\n        * ".concat(e.columnName,'\n        * \n        */   \n    @Condition\n    @Column(name = "').concat(e.columnName,'")\n    @Reference(code = "xxxxx", srcProperties = {"code"}, desProperties = {"').concat(e.javaName,'Name"})\n\n    @Transient\n    private String ').concat(e.javaName,"Name;  \n      \n      ");break;default:i+=" \n\n        /*\n        *\n        * ".concat(e.columnName,'\n        * \n        */   \n        @Condition(match = Match.LIKE)\n        @Column(name = "').concat(e.columnName,'")\n        private ').concat(e.javaType," ").concat(e.javaName,"; \n        ")}})),i+='\n         /**\n\t\t     * \u4fee\u6539\u4eba \n\t\t     */\n\t\t    @Column(name = "last_modify_user")\n\t\t    private String lastModifyUser;\n\n\t\t    @Column(name = "last_modify_user_name")\n\t\t    //@Transient\n\t\t    private String lastModifyUserName;\n\n\t\t    /**\n\t\t     * \u4fee\u6539\u6642\u9593\n\t\t     */\n\t\t    @Column(name = "last_modified")\n\t\t    private String lastModified;\n\n\t\t    /**\n\t\t     * \u5275\u5efa\u4eba\n\t\t     */\n\t\t    @Column(name = "create_user")\n\t\t    private String createUser;\n\n\t\t    @Column(name = "create_user_name")\n\t\t    private String createUserName;\n\n\t\t    /**\n\t\t     * \u5275\u5efa\u6642\u9593\n\t\t     */\n\t\t    @Column(name = "create_time")\n\t\t    private String createTime;\n  \n  ',i+="\n    }\n  ",S.js_beautify(i)}(t),o=function(e){e.tableName,e.tableSchema;var t=e.packageName,n=e.projectName,a=(e.at_CodeRules,"");return a+="\n  \n  package ".concat(t,".dao;\n\n  import org.apache.ibatis.annotations.Mapper;\n  import org.springframework.stereotype.Repository;\n  import ").concat(t,".po.").concat(n,"PO;\n  import com.yonyou.iuap.ucf.dao.BaseDAO;\n  \n  @Mapper\n  @Repository\n  public interface  ").concat(n,"DAO extends BaseDAO<").concat(n,"PO, String> {\n  \n  }\n  \n  "),S.js_beautify(a)}(t),c=function(e){e.tableName;var t=e.tableSchema,n=e.packageName,a=e.projectName,o=e.at_CodeRules,r="";r+=" \n\n          package ".concat(n,".service;\n\n        import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.I18N_ENUM;\n        import org.springframework.beans.factory.annotation.Autowired;\n        import org.springframework.stereotype.Service;\n        import com.yonyou.iuap.baseservice.intg.service.GenericUcfService;\n        import com.yonyou.iuap.baseservice.intg.support.ServiceFeature;\n        import ").concat(n,".dao.").concat(a,"DAO;\n        import ").concat(n,".po.").concat(a,"PO;\n        import static com.yonyou.iuap.baseservice.intg.support.ServiceFeature.AUDIT;\n\n        @Service\n        public class ").concat(a,"Service extends GenericUcfService<").concat(a,"PO,String> {\n\n            @Autowired\n            private ").concat(a,"DAO dao;\n\n            @Autowired\n            public void setContractDAO(").concat(a,"DAO dao) {\n                this.dao = dao;\n                super.setGenericMapper(dao);\n            }\n\n\n\n\n  ");var i=["AUDIT"];return y.find(t,(function(e){return"at_I18nEnumCode"===e.annotation}))&&i.push("I18N_ENUM"),o&&i.push("ServiceFeature.CODERULES"),r+=" \n\n  @Override\n  protected ServiceFeature[] getFeats() {\n    return new ServiceFeature[] {".concat(i.toString(),"};\n  }\n\n  }\n"),S.js_beautify(r)}(t),s=function(e){e.tableName;var t=e.tableSchema,n=e.packageName,a=e.projectName,o=(e.at_CodeRules,"");return o+=" \n   package ".concat(n,".dto;\n\n      import java.util.List;\n      import java.util.Map;\n      import com.yonyou.iuap.baseservice.support.entity.vo.BaseSearchVO;\n      import lombok.Data;\n\n      @Data\n      public class ").concat(a,"SearchVO extends BaseSearchVO {\n        //\u52a8\u6001\u67e5\u8be2\u65b9\u6cd5\u4f20\u5165\u67e5\u8be2\u6761\u4ef6A1\n          /**\u5904\u7406\u884c\u8fc7\u6ee4\u53c2\u6570*/\n          private List<Map<String, Object>> whereParam;\n          /**\u5904\u7406\u590d\u5408\u6392\u5e8f\u53c2\u6570*/\n        private List<Map<String, String>> orderByParam;\n    "),y.forEach(t,(function(e){o+=" \n\n    /** ".concat(e.javaName," **/\n    private ").concat(e.javaType," ").concat(e.javaName,";\n\n     ")})),o+=" } ",S.js_beautify(o)}(t),l=function(e){e.tableName;var t=e.tableSchema,n=e.packageName,a=e.projectName,o=(e.at_CodeRules,"");return o+=" ".concat(n,".controller;\n\n    import java.io.Serializable;\n    import java.lang.reflect.Field;\n\n    import javax.servlet.http.HttpServletRequest;\n\n    import org.apache.commons.lang3.StringUtils;\n    import org.slf4j.Logger;\n    import org.slf4j.LoggerFactory;\n    import org.springframework.beans.factory.annotation.Autowired;\n    import org.springframework.data.domain.Page;\n    import org.springframework.transaction.annotation.Transactional;\n    import org.springframework.web.bind.annotation.RequestBody;\n    import org.springframework.web.bind.annotation.RequestMapping;\n    import org.springframework.web.bind.annotation.RequestMethod;\n    import org.springframework.web.bind.annotation.RequestParam;\n    import org.springframework.web.bind.annotation.RestController;\n\n    import com.alibaba.fastjson.JSONObject;\n    import com.yonyou.iuap.baseservice.support.entity.dto.SimpleSearchDTO;\n    import com.yonyou.iuap.baseservice.support.util.CommonTools;\n    import ").concat(n,".dto.").concat(a,"SearchVO;\n    import ").concat(n,".po.").concat(a,"PO;\n    import ").concat(n,".service.").concat(a,'Service;\n    import com.yonyou.iuap.demo.utils.CookiesUtils;\n    import com.yonyou.iuap.demo.utils.SearchSupportUtil;\n    import com.yonyou.iuap.ucf.common.exception.BusinessException;\n    import com.yonyou.iuap.ucf.common.i18n.MessageUtils;\n    import com.yonyou.iuap.ucf.common.rest.CommonResponse;\n    import com.yonyou.iuap.ucf.dao.support.SqlParam;\n    import com.yonyou.iuap.ucf.dao.support.UcfPageRequest;\n    import com.yonyou.iuap.ucf.dao.utils.FieldUtil;\n\n    import cn.hutool.core.util.ReflectUtil;\n\n    @RestController\n    @RequestMapping(value = "/').concat(y.toLower(a),'")\n    public class ').concat(a,"Controller {\n\n    private Logger logger = LoggerFactory.getLogger(").concat(a,"Controller.class);\n    \n    @Autowired\n    private ").concat(a,"Service ").concat(y.toLower(a),'Service;\n    \n    \n    @RequestMapping(value = "/list", method = RequestMethod.POST)\n    public Object list(@RequestBody ').concat(a,"SearchVO searchVO) {\n        //case1\uff1a\u5206\u9875\u6761\u6570=1\u65f6\u67e5\u8be2\u5168\u90e8\u6570\u636e---5.0\u5206\u9875\u7ea6\u5b9a\n        if (searchVO.getPageSize() == 1) {\n       searchVO.setPageSize(Integer.MAX_VALUE-1);\n     }\n        //case2\uff1aorderField\u8f6c\u6362---\x3e\u5c5e\u6027\u5230\u5b57\u6bb5,\u9a8c\u8bc1\u6392\u5e8f\u6761\u4ef6\u7684\u5408\u6cd5\u6027\n        if(!StringUtils.isEmpty(searchVO.getOrderField())&&!StringUtils.isEmpty(searchVO.getOrderSort())){\n          try {\n            Field field = ReflectUtil.getField(").concat(a,'PO.class, searchVO.getOrderField());\n            searchVO.setOrderField(FieldUtil.getColumnName(field));\n            searchVO.setOrderSort(searchVO.getOrderSort().toString().toUpperCase());\n       } catch (Exception e) {\n         return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.xxxxxx.0001")));\n       }\n        }\n\n\n        /**A2\u6807\u51c6\u67e5\u8be2\u5bf9\u4e8eString\u7c7b\u578b\u5b57\u6bb5\u9700\u8981\u5148\u505a\u5982\u4e0b\u5904\u7406**/\n        //TODO \u9700\u8981\u4fee\u6539SimpleSearchDTO\u7684toSearchParams\u65b9\u6cd5\u4e2d\u975e\u7a7a\u5224\u65ad\uff0c\u76ee\u524d\u5148\u8fd9\u6837\u5904\u7406\u975eEQ\u67e5\u8be2\n\n        '),y.forEach(t,(function(e){"String"===e.javaType&&(o+="\n      \n      if (StringUtils.isEmpty(searchVO.get".concat(y.upperFirst(e.javaName),"())) {\n        searchVO.set").concat(y.upperFirst(e.javaName),"(null);\n      }\n      \n      "))})),o+=" \n        SimpleSearchDTO<".concat(a,"SearchVO> searchDTO = new SimpleSearchDTO<>();\n        searchDTO.setSearchEntity(searchVO);\n        /**1.\u901a\u8fc7condition\u6ce8\u89e3\u5b9e\u73b0where\u6761\u4ef6\u67e5\u8be2*/\n        SqlParam sqlParams = (SqlParam) searchDTO.toSearchParams(").concat(a,"PO.class);\n\n        /**A1\u591a\u8fc7\u6ee4\u548c\u591a\u6392\u5e8f\u5904\u7406*/\n        SearchSupportUtil.processSqlParamsFor").concat(y.upperFirst(a),"(searchVO, ").concat(a,"PO.class,sqlParams);\n       \n        Page<").concat(a,"PO> page = ").concat(y.toLower(a),'Service.selectAllByPage(UcfPageRequest.of(searchVO.getPageIndex(), searchVO.getPageSize()), sqlParams);\n        return CommonResponse.ofSuccess(page);\n    }\n    \n    \n    \n    \n\n    @RequestMapping(value = "/get').concat(a,'InfoById", method = RequestMethod.GET)\n    public Object get').concat(a,'InfoByUniqueKey(@RequestParam(value = "id") Serializable id) {\n        if (id == null || id.equals("")) {\n            logger.warn(MessageUtils.getMessage("ja.iuap.con.0001"));\n            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(4L), MessageUtils.getMessage("ja.iuap.con.0001")));\n        }\n        ').concat(a,"PO vo = ").concat(y.toLower(a),'Service.findUnique("id", id);\n        if (vo != null) {\n            logger.info("\u67e5\u8be2\u6210\u529f============="+id);\n            return CommonResponse.ofSuccess(vo);\n        } else {\n            logger.warn(MessageUtils.getMessage("ja.iuap.con.0001"));\n            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.con.0002")));\n        }\n    }\n    \n    \n    \n    @RequestMapping(value = "/saveEntity", method = RequestMethod.POST)\n    @Transactional\n    public Object saveEntity(HttpServletRequest request, @RequestBody ').concat(a,'PO... vo) {\n   \n      if (vo.length == 0) {\n            logger.warn(MessageUtils.getMessage("ja.iuap.con.0003"));\n            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.con.0003")));\n        }\n        String value = CookiesUtils.getUnameByCookies(request);\n        for (').concat(a,"PO ").concat(a,"PO : vo) {\n          if(").concat(a,"PO.getId()==null){\n            ").concat(a,"PO.setCreateUserName(value);\n          }\n          ").concat(a,"PO.setLastModifyUserName(value);\n          \n \n          ").concat(y.toLower(a),"Service.save(").concat(a,'PO);\n     }\n        return CommonResponse.ofSuccess();\n\n    }  \n    \n    \n    \n    \n    @RequestMapping(value = "/deleEntity", method = RequestMethod.POST)\n    public Object deleEntity(@RequestBody ').concat(a,'PO... entities) {\n        if (entities.length == 0) {\n            logger.warn(MessageUtils.getMessage("ja.iuap.con.0004"));\n            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(3L), MessageUtils.getMessage("ja.iuap.con.0004")));\n        }\n        int count = 0;\n        for (').concat(a,"PO entity : entities) {\n            count += this.").concat(y.toLower(a),'Service.delete(entity.getId());\n        }\n        if (count == entities.length) {\n            JSONObject result = new JSONObject();\n            result.put("count", count);\n            return CommonResponse.ofSuccess(result);\n        } else {\n            logger.warn(MessageUtils.getMessage("ja.iuap.con.0004"));\n            return CommonResponse.ofFail(new BusinessException(CommonTools.buildErrorCode(5L), MessageUtils.getMessage("ja.iuap.con.0004")));\n        }\n }\n\n\n\n\n\n    \n    \n}\n'),S.js_beautify(o)}(t),m=function(e){e.tableName,e.tableSchema;var t=e.packageName,n=e.projectName,a=(e.at_CodeRules,"");return a+="\n  // import ".concat(t,".dto.").concat(y.upperFirst(n),"SearchVO;\n  public static SqlParam processSqlParamsFor").concat(y.upperFirst(n),"(").concat(y.upperFirst(n),'SearchVO searchVO, Class<?> entityClass,SqlParam sqlParams) {\n\t\tif (CollectionUtils.isNotEmpty(searchVO.getWhereParam())) {\n\t\t\t@SuppressWarnings("all")\n\t\t\tList<Map<String, Object>> wheres = searchVO.getWhereParam();\n\t\t\tfor (Map<String, Object> statment : wheres) {\n\t\t\t\tString keyStr = String.valueOf(statment.get(WhereParams.key.name()));\n\t\t\t\tObject valueObj = statment.get(WhereParams.value.name());\n\t\t\t\tString conditionStr = String.valueOf(statment.get(WhereParams.condition.name()));\n\t\t\t\t/**\u5173\u952e\u53c2\u6570\u7f3a\u4e00\u4e0d\u53ef*/\n\t\t\t\tif (StringUtils.isEmpty(keyStr) || StringUtils.isEmpty(valueObj)) {\n\t\t\t\t\tlogger.warn("reading incomplete whereParams [" + keyStr + ":" + valueObj + "]");\n\t\t\t\t\tthrow new RuntimeException("recieving incomplete whereParams [" + keyStr + ":" + valueObj + "]");\n\t\t\t\t}\n\t\t\t\tField keyField = ReflectUtil.getField(entityClass, keyStr.toString());\n\t\t\t\tif (keyField == null) {\n\t\t\t\t\tlogger.warn("finding none field [" + keyStr + "] in model class[" + entityClass + "]!!");\n\t\t\t\t\tthrow new RuntimeException(\n\t\t\t\t\t\t\t"thre is no field [" + keyStr + "] in model class[" + entityClass + "]!!");\n\t\t\t\t}\n\t\t\t\tString keyColunm = FieldUtil.getColumnName(keyField);\n\t\t\t\tif (StringUtils.isEmpty(conditionStr)) {\n\t\t\t\t\tsqlParams.eq(keyColunm, valueObj);\n\t\t\t\t} else if (conditionStr.equalsIgnoreCase(MatchParams.LIKE.name())) {\n\t\t\t\t\tsqlParams.like(keyColunm, String.valueOf(valueObj));\n\t\t\t\t} else if (conditionStr.equalsIgnoreCase(MatchParams.ULIKE.name())) {\n\t\t\t\t\tsqlParams.notLike(keyColunm, String.valueOf(valueObj));\n\t\t\t\t} else if (conditionStr.equalsIgnoreCase(MatchParams.EQ.name())) {\n\t\t\t\t\tsqlParams.eq(keyColunm, valueObj);\n\t\t\t\t} else if (conditionStr.equalsIgnoreCase(MatchParams.UEQ.name())) {\n\t\t\t\t\tsqlParams.ne(keyColunm, valueObj);\n\t\t\t\t} else if (conditionStr.equalsIgnoreCase(MatchParams.LLIKE.name())) {\n\t\t\t\t\tsqlParams.like(keyColunm, "%" + String.valueOf(valueObj));\n\t\t\t\t} else if (conditionStr.equalsIgnoreCase(MatchParams.RLIKE.name())) {\n\t\t\t\t\tsqlParams.like(keyColunm, String.valueOf(valueObj) + "%");\n\t\t\t\t} else {\n\t\t\t\t\tsqlParams.eq(keyColunm, valueObj);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tif (CollectionUtils.isNotEmpty(searchVO.getOrderByParam())) {\n\t\t\t@SuppressWarnings("all")\n            List<Map<String, String>> sorts = searchVO.getOrderByParam();\n            if (sorts.size()>0){\n            \tList<String> fields = new ArrayList<String>();\n                for (Map<String, String> sort : sorts) {\n                    if (sort.keySet().size() > 0 && sort.keySet().toArray()[0] != null) {\n                        Field keyField = ReflectUtil.getField(entityClass, sort.keySet().toArray()[0].toString());\n                        if (keyField==null){\n                            throw new RuntimeException("cannot find field "+sort.keySet().toArray()[0].toString()+" in  model [" + entityClass + "] ");\n                        }\n                        if(sort.get(sort.keySet().toArray()[0]).toString().equalsIgnoreCase(Direction.DESC)){\n                        \tfields.add(FieldUtil.getColumnName(keyField)+" "+Direction.DESC);\n                        }else {\n                        \tfields.add(FieldUtil.getColumnName(keyField)+" "+Direction.ASC);\n\t\t\t\t\t\t}\n                    }\n                }\n                sqlParams.orderBy(fields.toArray( new String[]{}));\n            }else {\n                logger.debug("receiving none sort param in sortMap of querying =>"+entityClass);\n            }\n        }\n\t\treturn sqlParams;\n\n\t}\n  \n  '),S.js_beautify(a)}(t);n.push({location:"#domain",codeString:a,title:"".concat(e,"PO")}),n.push({location:"#domain",codeString:o,title:"".concat(e,"DAO")}),n.push({location:"#domain",codeString:c,title:"".concat(e,"Service")}),n.push({location:"#app",codeString:s,title:"".concat(e,"DTO")}),n.push({location:"#domain",codeString:l,title:"".concat(e,"Controller")}),n.push({location:"#domain",codeString:m,title:"UtilsProcessSqlParamsFor".concat(e)}),r(n)},l=[{title:"Column Name",dataIndex:"columnName",key:"columnName"},{title:"Type",dataIndex:"javaType",key:"javaType"},{title:"Annotation",key:"Annotation",render:function(e,a,r){return o.a.createElement(h.a.Group,{onChange:function(e){return function(e,a){var o=y.cloneDeep(i);o[a]=Object(O.a)({},o[a],{annotation:e.target.value}),"at_CodeRules"===e.target.value?n(Object(O.a)({},t,{tableSchema:o,at_CodeRules:i[a].javaName})):n(Object(O.a)({},t,{tableSchema:o}))}(e,r)},value:a.annotation},o.a.createElement(h.a,{value:"at_I18nEnumCode"},"@I18nEnumCode"),o.a.createElement(h.a,{value:"at_Reference"},"@Reference"),o.a.createElement(h.a,{value:"at_CodeRules"},"@CodeRules"))}}];return o.a.createElement("div",{className:"annotation-table"},o.a.createElement("h1",{className:"text-gradient"},"@ Annotation"),y.size(t)>0&&o.a.createElement(b.a,{columns:l,dataSource:i,pagination:!1}),y.size(t)>0&&o.a.createElement(m.a,{type:"primary",icon:o.a.createElement(C.a,null),onClick:function(){return c()}},"Generate Code"))}var j=n(578),N=n(577),P=n(177),k=n(579);n(372);function R(){var e=Object(a.useContext)(s).genResult;return o.a.createElement("div",{className:"highlight-area"},e.map((function(e){return o.a.createElement("div",{key:"".concat(e.title)},o.a.createElement("h1",{className:"result-title"},"[","".concat(e.location),"]","".concat(e.title)),o.a.createElement(P.CopyToClipboard,{text:"".concat(e.codeString)},o.a.createElement(m.a,{shape:"round",icon:o.a.createElement(k.a,null)},"Copy")),o.a.createElement(j.a,{language:"java",style:N.a},"".concat(e.codeString)))})))}n(571);var w=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(l,null,o.a.createElement(p,null),o.a.createElement(f,null),o.a.createElement(E,null),o.a.createElement(R,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[181,1,2]]]);
//# sourceMappingURL=main.6f8b900a.chunk.js.map