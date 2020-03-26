import React from "react";
import AppContextProvider from "./Context/ContextProvider";

import Header from "./components/Header/Header";
import SettingArea from "./components/SettingArea/SettingArea";
import AnnotationConfig from "./components/AnnotationConfig/AnnotationConfig";
import HighlightArea from "./components/HighlightArea/HighlightArea";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        {/* 頭部 */}
        <Header></Header>
        {/* 設定區域 */}
        <SettingArea></SettingArea>
        {/* Annotation Config */}
        <AnnotationConfig></AnnotationConfig>
        {/* Syntax Highlight  */}
        <HighlightArea></HighlightArea>
      </AppContextProvider>
    </div>
  );
}

export default App;
