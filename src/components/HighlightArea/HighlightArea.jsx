import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import "./HighlightArea.scss";

export default function HighlightArea() {
  const { genResult } = useContext(AppContext);

  return (
    <div className="highlight-area">
      {genResult.map(item => {
        return (
          <div key={`${item.title}`}>
            <h1 className="result-title">
              [{`${item.location}`}]{`${item.title}`}
            </h1>

            <CopyToClipboard text={`${item.codeString}`}>
              <Button shape="round" icon={<CopyOutlined />}>
                Copy
              </Button>
            </CopyToClipboard>

            <SyntaxHighlighter language="java" style={xonokai}>
              {`${item.codeString}`}
            </SyntaxHighlighter>
          </div>
        );
      })}
    </div>
  );
}
