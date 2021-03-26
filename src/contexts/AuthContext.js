import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({ status: true });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
