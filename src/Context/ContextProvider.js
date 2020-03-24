import React, { useState } from "react";

import AppContext from "./AppContext";

// 設計Provider
const AppContextProvider = props => {
  const [name, setName] = useState("");
  // 設定區域
  const [settingArea, setSettingArea] = useState({});

  return (
    //這Provider提供 name 跟 setName 給子組件用(子組件可用 useContext獲取)
    <AppContext.Provider value={{ settingArea, setSettingArea }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
