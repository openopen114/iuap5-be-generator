import * as _ from "lodash";

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
      columnType: preprocessData[i + 1]
    };
    result.push(obj);
  }

  return result;
};
