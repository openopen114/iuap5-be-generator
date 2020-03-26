import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Form, Input, Button } from "antd";

import * as utils from "../../utils/generator";

import * as _ from "lodash";

import "./SettingArea.scss";

const { TextArea } = Input;

export default function SettingArea() {
  const { setSetting } = useContext(AppContext);

  const [form] = Form.useForm();

  // Submit 完成提交事件
  const handleSubmit = values => {
    console.log("onFinish Success:");
    console.log(values);
    const { tableName, tableSchema, packageName, projectName } = values;
    const tableSchemaArr = utils.formatTableSchemaToArray(tableSchema);

    setSetting({
      tableName: _.toUpper(tableName),
      tableSchema: tableSchemaArr,
      packageName: _.toLower(packageName) + "." + _.toLower(projectName),
      projectName: _.upperFirst(projectName)
    });
  };

  return (
    <div className="setting-area">
      <Form
        layout={"vertical"}
        form={form}
        onFinish={handleSubmit}
        name="setting-area-form"
      >
        {/* Table Name */}
        <Form.Item
          label="# Table Name"
          name="tableName"
          rules={[{ required: true, message: "Please input your Table Name!" }]}
        >
          <Input />
        </Form.Item>

        {/* Table Schema */}
        <Form.Item
          label="# Table Schema"
          name="tableSchema"
          rules={[
            { required: true, message: "Please input your table Schema !" }
          ]}
        >
          <TextArea rows={10} />
        </Form.Item>

        {/* Package Name */}
        <Form.Item
          label="# Package Name"
          name="packageName"
          rules={[
            { required: true, message: "Please input your package Name!" }
          ]}
        >
          <Input defaultValue="com.yonyou.iuap.xxx" />
        </Form.Item>

        {/* Project Name */}
        <Form.Item
          label="# Project Name"
          name="projectName"
          rules={[
            { required: true, message: "Please input your Project Name !" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
