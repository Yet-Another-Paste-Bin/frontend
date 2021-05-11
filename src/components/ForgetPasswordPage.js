import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { ReqPasswordResetToken } from "../utils/networkUtils";
const ForgetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [alertMsg, setAlertMsg] = useState(
    <>
      Sorry of inconvenience <br /> Please try again later
    </>
  );
  const [resetLink, setResetLink] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      document.getElementById("username").readOnly = true;
      document.getElementById("email").readOnly = true;
      document.getElementById("phoneno").readOnly = true;
    } else {
      document.getElementById("username").readOnly = false;
      document.getElementById("email").readOnly = false;
      document.getElementById("phoneno").readOnly = false;
    }
    return () => {};
  }, [loading]);

  const handleChange = () => {
    if (resetLink !== "") setResetLink("");
    setisError(false);
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phoneno = document.getElementById("phoneno").value;
    setLoading(true);
    ReqPasswordResetToken(username, email, phoneno)
      .then(({ status, passwordresettoken }) => {
        if (status === 200) {
          setResetLink(`./passwordreset?token=${passwordresettoken}`);
        } else if (status === 500) {
          setisError(true);
        } else if (status === 401) {
          setisError(true);
          setAlertMsg(<>User Not found or Token Expired</>);
        } else {
          setisError(true);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ height: "80vh" }}>
      <div className="wrapper">
        <div className="card" style={{ width: "20rem", maxWidth: "90%" }}>
          <div className="card-body center">
            <h5 className="card-title">Forget Password</h5>
            <form
              className="center"
              style={{ maxWidth: "90%" }}
              onSubmit={forgotPassword}
            >
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                style={{ maxWidth: "90%" }}
                onChange={handleChange}
                required
              />
              <br></br>
              <input
                type="Email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                style={{ maxWidth: "90%" }}
                onChange={handleChange}
                required
              />
              <br></br>
              <input
                type="tel"
                className="form-control"
                id="phoneno"
                placeholder="Enter Phone No"
                pattern="[0-9]{10}"
                title="Must contain 10 digits"
                style={{ maxWidth: "90%" }}
                onChange={handleChange}
                required
              />
              {isError ? (
                <div
                  id="alter-div"
                  className="alert alert-danger mt-4 text-center"
                  role="alert"
                >
                  {alertMsg}
                </div>
              ) : null}
              <div className="row mt-4 justify-content-center">
                {resetLink === "" ? (
                  <button
                    type="submit"
                    className="btn btn-secondary m-1"
                    style={{ backgroundColor: "#292929" }}
                  >
                    Forgot Password
                  </button>
                ) : (
                  <Link to={resetLink}>
                    <button
                      className="btn btn-secondary m-1"
                      style={{ backgroundColor: "#292929" }}
                    >
                      Click to Reset Password
                    </button>
                  </Link>
                )}
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
export default ForgetPasswordPage;
