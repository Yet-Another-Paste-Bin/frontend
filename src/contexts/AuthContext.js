import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const status = localStorage.getItem("id") ? true : false;
  const authtoken = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [auth, setAuth] = useState({
    status,
    username,
    authtoken,
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
