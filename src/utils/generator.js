import * as _ from "lodash";

//將 table schema 轉成 Array
export const formatTableSchemaToArray = _tableSchema => {
  let preprocessData = _.split(_tableSchema, "[");
  const patt = new RegExp("]");
  preprocessData = _.filter(preprocessData, item => patt.test(item));
  preprocessData = _.map(preprocessData, item => _.split(item, "]")[0]);

  preprocessData = _.filter(preprocessData, o => {
    return o !== "" && o !== "\n";
  });

  let result = [];
  for (let i = 0; i < preprocessData.length; i += 2) {
    let obj = {
      key: preprocessData[i],
      columnName: preprocessData[i],
      columnType: preprocessData[i + 1],
      javaName: _.camelCase(preprocessData[i])
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
      import com.yonyou.iuap.demo.allowance.constant.*;
      import com.yonyou.iuap.ucf.dao.BasePO;
      import lombok.Data;

      import javax.persistence.Column;
      import javax.persistence.Table;
      import javax.persistence.Transient;
      import java.math.BigDecimal;

      import static com.yonyou.iuap.baseservice.support.condition.Match.EQ;
      import static com.yonyou.iuap.baseservice.support.condition.Match.LIKE;


      @JsonIgnoreProperties(ignoreUnknown = true)
      @Table(name = "${tableName}")
    `;

  //檢查是否有需code rule字段
  if (at_CodeRules) {
    result += `@CodeRules(ruleCode = "iuap5cn.allowance.allowance", target = "${at_CodeRules}")`;
  }

  result += `
  @Data
public class ${projectName}PO extends BasePO implements AuditTrail  {
  `;

  //TODO: foreach table schema to po result string
};
