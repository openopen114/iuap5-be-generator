import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
<<<<<<< HEAD

import Highlight from "react-highlight";
=======
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

>>>>>>> 6436712a904182daf60ed735ab2be80f5e3b86fd
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

<<<<<<< HEAD
import moduleName from "../../../node_modules/highlight.js/scss/dracula.scss";
=======
>>>>>>> 6436712a904182daf60ed735ab2be80f5e3b86fd
import "./HighlightArea.scss";

export default function HighlightArea() {
  const { genResult } = useContext(AppContext);

  return (
    <div className="highlight-area">
      {genResult.map(item => {
        return (
          <div key={`${item.title}`}>
            <h1 className="result-title">
<<<<<<< HEAD
              [{`${item.location}`}] {`${item.title}`}
=======
              [{`${item.location}`}]{`${item.title}`}
>>>>>>> 6436712a904182daf60ed735ab2be80f5e3b86fd
            </h1>

            <CopyToClipboard text={`${item.codeString}`}>
              <Button shape="round" icon={<CopyOutlined />}>
                Copy
              </Button>
            </CopyToClipboard>

<<<<<<< HEAD
            <Highlight className="java">{`${item.codeString}`}</Highlight>

            {/* <SyntaxHighlighter language="java" style={xonokai}>
              {`${item.codeString}`}
            </SyntaxHighlighter> */}
=======
            <SyntaxHighlighter language="java" style={xonokai}>
              {`${item.codeString}`}
            </SyntaxHighlighter>
>>>>>>> 6436712a904182daf60ed735ab2be80f5e3b86fd
          </div>
        );
      })}
    </div>
  );
}
