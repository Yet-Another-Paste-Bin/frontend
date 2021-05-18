import React, { useState, useEffect } from "react";
import { ReqSignup } from "../utils/networkUtils";
import { MoonLoader } from "react-spinners";
import { useHistory } from "react-router";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    text: "",
    type: "alert-danger",
  });

  const history = useHistory();

  useEffect(() => {
    if (loading) {
      document.getElementById("sgusername").readOnly = true;
      document.getElementById("sgpassword").readOnly = true;
      document.getElementById("sgconfpassword").readOnly = true;
      document.getElementById("sgemail").readOnly = true;
      document.getElementById("sgphoneno").readOnly = true;
    } else {
      document.getElementById("sgusername").readOnly = false;
      document.getElementById("sgpassword").readOnly = false;
      document.getElementById("sgconfpassword").readOnly = false;
      document.getElementById("sgemail").readOnly = false;
      document.getElementById("sgphoneno").readOnly = false;
    }
    return () => {};
  }, [loading]);

  const checkText = (e) => {
    if (document.getElementById(e.target.id).value !== "" && alert.show) {
      setAlert({ ...alert, show: false });
    }
  };
  const signup = async (e) => {
    e.preventDefault();
    const username_text = document.getElementById("sgusername").value;
    const password = document.getElementById("sgpassword").value;
    const conf = document.getElementById("sgconfpassword").value;
    const email = document.getElementById("sgemail").value;
    const phoneno = document.getElementById("sgphoneno").value;

    if (conf !== password) {
      setAlert({
        ...alert,
        show: true,
        text: "Password And Confirm Password Doesn't Match",
      });

      return;
    }

    if (![username_text, password, conf, email, phoneno].includes("")) {
      setLoading(true);
      try {
        const { statusCode } = await ReqSignup(
          username_text,
          email,
          password,
          phoneno
        );

        if (statusCode === 400) {
          setAlert({
            type: "alert-danger",
            show: true,
            text: "Password And Confirm Password Doesn't Match",
          });
          setLoading(false);

          return;
        } else if (statusCode === 500) {
          setAlert({
            type: "alert-danger",
            show: true,
            text: "Sorry of inconvenience Please try again later",
          });
          setLoading(false);
          return;
        } else if (statusCode === 200) {
          setAlert({
            type: "alert-success",
            show: true,
            text: "Signup Successful please proceed to Login",
          });
          setLoading(false);
          return;
        }
      } catch (error) {}
    }
  };

  return (
    <div className="my-2" style={{ height: "80vh" }}>
      <div className="wrapper">
        <div className="card" style={{ width: "20rem", maxWidth: "90%" }}>
          <div className="card-body center">
            <h5 className="card-title">Signup</h5>
            <form
              onSubmit={signup}
              className="center"
              style={{ maxWidth: "90%" }}
            >
              <input
                type="text"
                className="form-control"
                id="sgusername"
                placeholder="Enter Username"
                onChange={checkText}
                style={{ maxWidth: "90%" }}
                required
              />
              <br></br>
              <input
                type="email"
                className="form-control"
                id="sgemail"
                placeholder="Enter Email"
                onChange={checkText}
                style={{ maxWidth: "90%" }}
                required
              />
              <br></br>
              <input
                type="password"
                className="form-control"
                id="sgpassword"
                placeholder="Enter Password"
                onChange={checkText}
                pattern="(.*).{8,}"
                title="Must contain at least 8 or more characters"
                style={{ maxWidth: "90%" }}
                minLength="8"
                required
              />
              <br></br>
              <input
                type="password"
                className="form-control"
                id="sgconfpassword"
                placeholder="Confirm Password"
                onChange={checkText}
                style={{ maxWidth: "90%" }}
                minLength="8"
                required
              />
              <br></br>
              <input
                type="tel"
                className="form-control"
                id="sgphoneno"
                placeholder="Enter Phone No"
                minLength="10"
                onChange={checkText}
                style={{ maxWidth: "90%" }}
                pattern="[0-9]{10}"
                title="10 Digit Phone No"
                required
              />
              {alert.show ? (
                <div
                  id="sgalert"
                  className={`alert ${alert.type} mt-4 text-center`}
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
                      Signup
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary m-1"
                      onClick={() => history.push("/login")}
                    >
                      Login
                    </button>
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

export default SignupPage;
