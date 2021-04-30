import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { BinContext } from "../contexts/BinContext";
import { ReqPostBin } from "../utils/networkUtils";
const Navbar = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { binLink, setBinLink, setBinText } = useContext(BinContext);
  const location = useLocation();
  const { status, username } = auth;

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
    console.log();
    const isPrivate = document.getElementById("privatbin")?.checked || false;
    const res = await ReqPostBin(bin, isPrivate);
    if (res && res.id) {
      if (document.getElementById("privatbin")) {
        document.getElementById("privatbin").checked = false;
      }
      setBinLink(window.location.origin.toString() + "/" + res.id);
    }
  };

  const SaveBtn = () => {
    return binLink !== "" ? null : (
      <>
        <button
          type="button"
          className="btn btn-secondary m-1"
          onClick={postBin}
        >
          Save
        </button>
        {status ? (
          <>
            <div className="form-check-inline m-1">
              <label
                className="form-check-label"
                style={{ color: "rgb(189, 189, 189)" }}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  value=""
                  id="privatbin"
                />
                Private Bin
              </label>
            </div>
          </>
        ) : null}
      </>
    );
  };

  const NavItems = () => {
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
            <SaveBtn />

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

            <SaveBtn />
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
