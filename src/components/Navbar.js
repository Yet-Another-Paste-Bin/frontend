import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { BinContext } from "../contexts/BinContext";
import { ReqPostBin } from "../utils/networkUtils";
import { BeatLoader } from "react-spinners";
const RequestStates = {
  notRequested: "notRequested",
  requesting: "requesting",
  requestSuccessful: "requestSuccessful",
  requestUnsuccessful: "requestUnsuccessful",
};

const Navbar = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { binLink, setBinLink, setBinText } = useContext(BinContext);
  const location = useLocation();
  const { status, username } = auth;
  const history = useHistory();
  const [requestState, setRequestState] = useState({
    state: RequestStates.notRequested,
    message: "",
  });

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setBinLink("");
    setBinText("");
    setAuth({});
    history.push("/");
  };

  const postBin = async () => {
    const bin = document.getElementById("textbin").value.trim();
    if (bin === "") return;
    const isPrivate = document.getElementById("privatbin")?.checked || false;
    setRequestState({ state: RequestStates.requesting, message: "" });
    const res = await ReqPostBin(bin, isPrivate);

    if (res.status === 200 && res.data.binId) {
      if (document.getElementById("privatbin")) {
        document.getElementById("privatbin").checked = false;
      }
      setBinLink(window.location.origin.toString() + "/" + res.data.binId);
      setRequestState({ state: RequestStates.requestSuccessful });
      return;
    }

    setRequestState({
      state: RequestStates.requestUnsuccessful,
      message:
        res.status === 500
          ? "Sorry of inconvenience Please try again later"
          : "Invalid Username",
    });
    setInterval(
      () => setRequestState({ state: RequestStates.notRequested, message: "" }),
      3000
    );
  };

  const SaveBtn = () => {
    return binLink === "" && history.location.pathname === "/" ? (
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
    ) : null;
  };

  const NavItems = () => {
    if (requestState.state === RequestStates.requesting) {
      return (
        <div className="row" style={{ paddingTop: "15px" }}>
          <span className="px-2" style={{ color: "rgb(189, 189, 189)" }}>
            <b>Saving</b>
          </span>
          <BeatLoader size="20px" loading={true} />
        </div>
      );
    } else if (
      [RequestStates.requestSuccessful, RequestStates.notRequested].includes(
        requestState.state
      )
    ) {
      return (
        <>
          {status ? (
            <>
              <button type="button" className="btn btn-secondary m-1">
                {username}
              </button>
              <Link to="/mybins">
                <button type="button" className="btn btn-secondary m-1">
                  My Bins
                </button>
              </Link>
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
          {history.location.pathname !== "/" ? (
            <Link to="/">
              <button type="button" className="btn btn-secondary m-1">
                Home
              </button>
            </Link>
          ) : null}
          <Link to="/about">
            <button type="button" className="btn btn-secondary m-1">
              About
            </button>
          </Link>
        </>
      );
    }
    return (
      <div>
        <div className="row" style={{ paddingTop: "15px" }}>
          <span className="px-2" style={{ color: "rgb(189, 189, 189)" }}>
            <b>{requestState.message}</b>
          </span>
        </div>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-around py-3">
        <Link to="/">
          <div className="custom-card px-3 pt-3 pb-2 custom-nav">
            <h2 className="app-title">{"</>"} Yet Another Paste Bin</h2>
          </div>
        </Link>

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

      <div className="row justify-content-around">
        <div
          className="alert alert-danger text-center d-none"
          role="alert"
          style={{ width: "60%" }}
          id="error-alert"
        >
          Sorry of inconvenience <br /> Please try again later
        </div>
      </div>
    </div>
  );
};

export default Navbar;
