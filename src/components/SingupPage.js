import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ReqSignup } from "../utils/networkUtils";
import { MoonLoader } from "react-spinners";
import { useHistory } from "react-router";

const SignupPage = () => {
  const context = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [alertText, setAlertText] = useState("");
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
    if (document.getElementById(e.target.id).value !== "" && isError) {
      setisError(false);
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
      setisError(true);
      setAlertText("Password And Confirm Password Doesn't Match");
      return;
    }

    if (![username_text, password, conf, email, phoneno].includes("")) {
      setLoading(true);
      try {
        const {
          status = false,
          error = false,
          username,
          token,
          statusCode,
        } = await ReqSignup(username_text, email, password, phoneno);

        if (statusCode && statusCode === 400) {
          setisError(true);
          setAlertText("Account with given Username/Email already exists !");
          setLoading(false);
          return;
        }
        if (error || statusCode === 500) {
          setisError(true);
          setAlertText("Sorry of inconvenience Please try again later");
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
                required
              />
              {isError ? (
                <div
                  id="sgalert"
                  className="alert alert-danger mt-4 text-center"
                  role="alert"
                >
                  {alertText}
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
