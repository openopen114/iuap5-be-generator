import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";

import * as _ from "lodash";

import "./AnnotationConfig.scss";

export default function AnnotationConfig() {
  const { settingArea } = useContext(AppContext);
  console.log("===>AnnotationConfig");
  console.log(settingArea);

  return (
    <div className="annotation-table">
      <h1 className="text-gradient">@ Annotation</h1>
      {_.size(settingArea) && <h1>{settingArea.tableName}</h1>}
    </div>
  );
}
