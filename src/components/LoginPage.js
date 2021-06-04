import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ReqLogin } from "../utils/networkUtils";
import { MoonLoader } from "react-spinners";
import { useHistory } from "react-router";

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    text: "",
  });
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
      (document.getElementById("password").value !== "" && alert.show)
    ) {
      setAlert({ ...alert, show: false });
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const username_text = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (![username_text, password].includes("")) {
      setLoading(true);
      try {
        const { username, token, statusCode } = await ReqLogin(
          username_text.toLowerCase(),
          password
        );
        setLoading(false);

        if (statusCode === 401) {
          setAlert({ show: true, text: "Check Username/Password" });
          return;
        } else if (statusCode === 200) {
          context.setAuth({
            status: true,
            username,
            authtoken: token,
          });
          history.push("/");
          return;
        } else if (statusCode === 204) {
          setAlert({ show: true, text: "Username/Email not found !" });
          return;
        }
        setAlert({
          show: true,
          text: (
            <>
              Sorry of inconvenience <br /> Please try again later
            </>
          ),
        });
      } catch (error) {}
    }
  };

  return (
    <div style={{ maxHeight: "80vh" }}>
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
                pattern="(.*).{8,}"
                title="Must contain at least 8 or more characters"
                onChange={checkText}
                style={{ maxWidth: "90%" }}
                required
              />
              {alert.show ? (
                <div
                  id="alter-div"
                  className="alert alert-danger mt-4 text-center"
                  role="alert"
                >
                  {alert.text}
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
                    <br />
                  </>
                )}
              </div>
              <div className="row mt-2 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-secondary m-1"
                  onClick={() => history.push("/forgotpassword")}
                >
                  Forgot Password
                </button>
              </div>
              <div className="row mt-2 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-secondary m-1"
                  onClick={() => history.push("/")}
                >
                  Go back to Home
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
