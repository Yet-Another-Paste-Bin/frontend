import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { ReqPasswordReset } from "../utils/networkUtils";

const PasswordResetPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(
    <>
      Sorry of inconvenience <br /> Please try again later
    </>
  );
  const [alertType, setAlertType] = useState("alert-danger");
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      document.getElementById("password").readOnly = true;
      document.getElementById("conf_password").readOnly = true;
    } else {
      document.getElementById("password").readOnly = false;
      document.getElementById("conf_password").readOnly = false;
    }
    return () => {};
  }, [loading]);

  const handleChange = () => (isShowAlert ? setIsShowAlert(false) : undefined);
  const getToken = () =>
    new URLSearchParams(props.location.search).get("token");
  const passwordReset = (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const conf_password = document.getElementById("conf_password").value;
    if (password !== conf_password) {
      setIsShowAlert(true);
      setAlertMsg(<>Password And Confirm Password Doesn't Match</>);
      return;
    }
    setLoading(true);
    ReqPasswordReset(password, getToken())
      .then(({ status }) => {
        if (status === 200) {
          document.getElementById("password").readOnly = false;
          document.getElementById("conf_password").readOnly = false;
          setAlertType("alert-success");
          setAlertMsg(
            <>
              Password Reset Successful ! <br />
              Plese proceed to login
            </>
          );
          setIsShowAlert(true);
        } else if (status === 500) {
          setIsShowAlert(true);
        } else if (status === 401) {
          setIsShowAlert(true);
          setAlertMsg(<>User Not found or Token Expired</>);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fade-in" style={{ height: "80vh" }}>
      <div className="wrapper">
        <div className="card" style={{ width: "20rem", maxWidth: "90%" }}>
          <div className="card-body center">
            <h5 className="card-title">Password Reset</h5>
            <form
              className="center"
              style={{ maxWidth: "90%" }}
              onSubmit={passwordReset}
            >
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter New Password"
                style={{ maxWidth: "90%" }}
                onChange={handleChange}
                required
              />
              <br></br>
              <input
                type="password"
                className="form-control"
                id="conf_password"
                placeholder="Confirm New Password"
                style={{ maxWidth: "90%" }}
                onChange={handleChange}
                required
              />
              <br></br>

              {isShowAlert ? (
                <div
                  id="alter-div"
                  className={`alert ${alertType} mt-4 text-center`}
                  role="alert"
                >
                  {alertMsg}
                </div>
              ) : null}
              <div className="row mt-4 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-secondary m-1"
                  style={{ backgroundColor: "#292929" }}
                >
                  Reset Password
                </button>
              </div>

              <div className="row mt-3 justify-content-center">
                {loading ? (
                  <MoonLoader size="40px" />
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-secondary m-1"
                      onClick={() => history.push("/login")}
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

export default PasswordResetPage;
