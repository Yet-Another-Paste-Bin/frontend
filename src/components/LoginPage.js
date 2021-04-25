import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ReqLogin } from "../utils/networkUtils";
import { MoonLoader } from "react-spinners";
import { useHistory } from "react-router";

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      document.getElementById("username").readOnly = true;
      document.getElementById("password").readOnly = true;
    } else {
      document.getElementById("username").readOnly = false;
      document.getElementById("password").readOnly = false;
    }
    return () => {};
  }, [loading]);

  const checkText = () => {
    if (
      document.getElementById("username").value !== "" ||
      (document.getElementById("password").value !== "" && isError)
    ) {
      setisError(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const username_text = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (![username_text, password].includes("")) {
      setLoading(true);
      try {
        const {
          status = false,
          error = false,
          username,
          token,
        } = await ReqLogin(username_text, password);
        if (error) {
          setisError(true);
          setLoading(false);
          return;
        }
        if (!status) {
          context.setAuth({
            status,
          });
          setLoading(false);
          return;
        }
        context.setAuth({
          status,
          username,
          authtoken: token,
        });
        setLoading(false);
        history.push("/");
      } catch (error) {}
    }
  };

  return (
    <div style={{ height: "80vh" }}>
      <div className="wrapper">
        <div className="card" style={{ width: "20rem", maxWidth: "90%" }}>
          <div className="card-body center">
            <h5 className="card-title">Login</h5>
            <form
              onSubmit={login}
              className="center"
              style={{ maxWidth: "90%" }}
            >
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username/Email"
                onChange={checkText}
                style={{ maxWidth: "90%" }}
                required
              />
              <br></br>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                onChange={checkText}
                style={{ maxWidth: "90%" }}
                required
              />
              {isError ? (
                <div
                  className="alert alert-danger mt-4 text-center"
                  role="alert"
                >
                  Sorry of inconvenience <br /> Please try again later
                </div>
              ) : null}
              <div className="row mt-4 justify-content-center">
                {loading ? (
                  <MoonLoader size="40px" />
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-secondary m-1"
                      style={{ backgroundColor: "#292929" }}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary m-1"
                      onClick={() => history.push("/signup")}
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
