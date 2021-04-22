import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoginModal from "./LoginPage";

const Navbar = (props) => {
  const { auth, setAuth } = useContext(AuthContext);

  const logout = (e) => {
    e.preventDefault();
    setAuth({});
  };

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
            <Link to="/about">
              <button type="button" className="btn btn-secondary m-1">
                Save
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-secondary m-1"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button type="button" className="btn btn-secondary m-1">
                Login
              </button>
            </Link>

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
