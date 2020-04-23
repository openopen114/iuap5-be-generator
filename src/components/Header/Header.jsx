import React from "react";
import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import "./Header.scss";

export default function Header() {
  return (
    <div>
      {/* Github Button */}

      <Button ghost className="github-btn" icon={<GithubOutlined />}>
        <a
          href="https://github.com/openopen114/iuap5-be-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Github
        </a>
      </Button>

      <h1 className="app-title">IUAP5 BE GENERATOR</h1>
    </div>
  );
}
