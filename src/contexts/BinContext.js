import React, { createContext, useState } from "react";

export const BinContext = createContext();

const BinContextProvider = (props) => {
  const [binLink, setBinLink] = useState("");
  const [binText, setBinText] = useState("");
  return (
    <BinContext.Provider value={{ binLink, setBinLink, binText, setBinText }}>
      {props.children}
    </BinContext.Provider>
  );
};

export default BinContextProvider;
