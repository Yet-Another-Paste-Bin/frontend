import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = (props) => {
  const { auth, setAuth } = useContext(AuthContext);

  const NavItems = () => {
    const status = auth.status || false;
    return (
      <div className="collapse navbar-collapse " id="nav-content">
        {status ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item m-1">
              <button type="button" className="btn btn-secondary">
                My Account
              </button>
            </li>
            <li className="nav-item m-1">
              <button type="button" className="btn btn-secondary">
                Bins
              </button>
            </li>
            <li className="nav-item m-1">
              <button type="button" className="btn btn-secondary">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item m-1">
              <button type="button" className="btn btn-secondary">
                Login
              </button>
            </li>
            <li className="nav-item m-1">
              <button type="button" className="btn btn-secondary">
                Signup
              </button>
            </li>
            <li className="nav-item m-1">
              <button type="button" className="btn btn-secondary">
                Save
              </button>
            </li>
          </ul>
        )}
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <a href="#" className="navbar-brand">
        <span className="app-title">{"</>"} Yet Another Paste Bin</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#nav-content"
        aria-controls="nav-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <NavItems />
    </nav>
  );
};

export default Navbar;
