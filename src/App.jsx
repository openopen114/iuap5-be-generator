import React from "react";
import AppContextProvider from "./Context/ContextProvider";

import Header from "./components/Header/Header";
import SettingArea from "./components/SettingArea/SettingArea";
import AnnotationConfig from "./components/AnnotationConfig/AnnotationConfig";

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
      </AppContextProvider>
    </div>
  );
}

export default App;
