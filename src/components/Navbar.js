import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = (props) => {
  const { auth, setAuth } = useContext(AuthContext);

  const NavItems = () => {
    const { status, username } = auth;
    return (
      <>
        {status ? (
          <>
            <button type="button" className="btn btn-secondary m-1">
              {username}
            </button>

            <button type="button" className="btn btn-secondary m-1">
              My Bins
            </button>

            <button type="button" className="btn btn-secondary m-1">
              Logout
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-secondary m-1">
              Login
            </button>

            <button type="button" className="btn btn-secondary m-1">
              Signup
            </button>

            <button type="button" className="btn btn-secondary m-1">
              Save
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-around py-3">
        <div className="custom-card px-3 pt-3 pb-2 custom-nav">
          <h2 className="app-title">{"</>"} Yet Another Paste Bin</h2>
        </div>

        <div className="px-3 py-2 ">
          <NavItems />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
