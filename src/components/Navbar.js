import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { BinContext } from "../contexts/BinContext";
import { ReqPostBin } from "../utils/networkUtils";
const Navbar = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { binLink, setBinLink, setBinText } = useContext(BinContext);
  const location = useLocation();

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setBinLink("");
    setBinText("");
    setAuth({});
  };

  const postBin = async () => {
    const bin = document.getElementById("textbin").value.trim();
    if (bin === "") return;
    const { id, error } = await ReqPostBin(bin, false);
    if (id) {
      setBinLink(window.location.origin.toString() + "/" + id);
    }
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

            <button
              type="button"
              className="btn btn-secondary m-1"
              onClick={postBin}
            >
              Save
            </button>

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

            <Link to="/signup">
              <button type="button" className="btn btn-secondary m-1">
                Signup
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-secondary m-1"
              onClick={postBin}
            >
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
        {location.pathname === "/" && binLink !== "" ? (
          <>
            <div className="pt-3">
              <div className="input-group">
                <input
                  id="binlink"
                  type="text"
                  className="form-control"
                  placeholder="Bin Link"
                  value={binLink}
                  readOnly
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(binLink);
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="px-3 py-2 ">
          <NavItems />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
