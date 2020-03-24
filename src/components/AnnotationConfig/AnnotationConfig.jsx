import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";

import { Table, Radio, Button } from "antd";
import { CodeOutlined } from "@ant-design/icons";

import * as _ from "lodash";

import "./AnnotationConfig.scss";

export default function AnnotationConfig() {
  const { settingArea, setSettingArea } = useContext(AppContext);
  const { tableSchema } = settingArea;

  // on chage 事件
  const onChange = (e, _index) => {
    let newTableSchema = _.cloneDeep(tableSchema);

    newTableSchema[_index] = {
      ...newTableSchema[_index],
      annotation: e.target.value
    };

    if (e.target.value === "at_CodeRules") {
      //自動編碼欄位,加設定在setting
      setSettingArea({
        ...settingArea,
        tableSchema: newTableSchema,
        at_CodeRules: tableSchema[_index]["columnName"]
      });
    } else {
      setSettingArea({
        ...settingArea,
        tableSchema: newTableSchema
      });
    }
  };

  // 產生後端五寶
  const doGenerate = () => {
    console.log("產生後端五寶");
    //TODO: 把五寶資料存在物件
    //TODO: highlight
  };

  const columns = [
    {
      title: "Column Name",
      dataIndex: "columnName",
      key: "columnName"
    },
    {
      title: "Type",
      dataIndex: "columnType",
      key: "columnType"
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

      {_.size(settingArea) > 0 && (
        <Table columns={columns} dataSource={tableSchema} pagination={false} />
      )}

      {_.size(settingArea) > 0 && (
        <Button type="primary" icon={<CodeOutlined />}>
          Generate Code
        </Button>
      )}
    </div>
  );
}
