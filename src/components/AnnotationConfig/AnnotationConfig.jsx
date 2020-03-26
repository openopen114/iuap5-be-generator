import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import * as utils from "../../utils/generator";

import { Table, Radio, Button } from "antd";
import { CodeOutlined } from "@ant-design/icons";

import * as _ from "lodash";

import "./AnnotationConfig.scss";

export default function AnnotationConfig() {
  const { setting, setSetting, setGenResult } = useContext(AppContext);
  const { tableSchema } = setting;

  console.log("tableSchema");
  console.log(tableSchema);

  // on chage 事件
  const onChange = (e, _index) => {
    let newTableSchema = _.cloneDeep(tableSchema);

    newTableSchema[_index] = {
      ...newTableSchema[_index],
      annotation: e.target.value
    };

    if (e.target.value === "at_CodeRules") {
      //自動編碼欄位,加設定在setting
      setSetting({
        ...setting,
        tableSchema: newTableSchema,
        at_CodeRules: tableSchema[_index]["javaName"]
      });
    } else {
      setSetting({
        ...setting,
        tableSchema: newTableSchema
      });
    }
  };

  // 產生後端五寶
  const doGenerate = () => {
    console.log("產生後端五寶");

    const { projectName } = setting;
    const generateResult = [];

    _.forEach(tableSchema, item => {
      if (item.annotation === "at_I18nEnumCode") {
        const enumConstantClass = utils.genConstantEnum(setting, item);

        const obj = {
          location: "#domain",
          codeString: enumConstantClass,
          title: `${projectName}Enum`
        };

        generateResult.push(obj);
      }
    });
    const PO = utils.genPO(setting);
    const DAO = utils.genDAO(setting);
    const Service = utils.genService(setting);
    const DTO = utils.genDTO(setting);
    const Controller = utils.genController(setting);
    const UtilsProcessSqlParams = utils.genUtilsProcessSqlParams(setting);

    generateResult.push({
      location: "#domain",
      codeString: PO,
      title: `${projectName}PO`
    });

    generateResult.push({
      location: "#domain",
      codeString: DAO,
      title: `${projectName}DAO`
    });

    generateResult.push({
      location: "#domain",
      codeString: Service,
      title: `${projectName}Service`
    });

    generateResult.push({
      location: "#app",
      codeString: DTO,
      title: `${projectName}DTO`
    });

    generateResult.push({
      location: "#domain",
      codeString: Controller,
      title: `${projectName}Controller`
    });

    generateResult.push({
      location: "#domain",
      codeString: UtilsProcessSqlParams,
      title: `UtilsProcessSqlParamsFor${projectName}`
    });

    setGenResult(generateResult);
  };

  const columns = [
    {
      title: "Column Name",
      dataIndex: "columnName",
      key: "columnName"
    },
    {
      title: "Type",
      dataIndex: "javaType",
      key: "javaType"
    },
    {
      title: "Annotation",
      key: "Annotation",
      render: (text, record, index) => (
        <Radio.Group
          onChange={e => onChange(e, index)}
          value={record.annotation}
        >
          <Radio value={"at_I18nEnumCode"}>@I18nEnumCode</Radio>
          <Radio value={"at_Reference"}>@Reference</Radio>
          <Radio value={"at_CodeRules"}>@CodeRules</Radio>
        </Radio.Group>
      )
    }
  ];

  return (
    <div className="annotation-table">
      <h1 className="text-gradient">@ Annotation</h1>

      {_.size(setting) > 0 && (
        <Table columns={columns} dataSource={tableSchema} pagination={false} />
      )}

      {_.size(setting) > 0 && (
        <Button
          type="primary"
          icon={<CodeOutlined />}
          onClick={() => doGenerate()}
        >
          Generate Code
        </Button>
      )}
    </div>
  );
}
