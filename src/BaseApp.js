import React, { Component } from "react";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import LoginSignupPage from "./components/LoginSignupPage";
import MyBins from "./components/MyBins";
import Navbar from "./components/Navbar";
import PasswordResetPage from "./components/PasswordResetPage";
import About from "./components/About";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReqBin } from "./utils/networkUtils";
import BinContextProvider, { BinContext } from "./contexts/BinContext";

class Home extends Component {
  static contextType = BinContext;

  handleChange = () => {
    const rawBinText = document.getElementById("textbin").value;
    if (!document.getElementById("error-alert").classList.contains("d-none")) {
      document.getElementById("error-alert").classList.add("d-none");
    }
    if (this.binText !== rawBinText) {
      this.context.setBinText(rawBinText);
      this.context.setBinLink("");
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    document.getElementById("textbin").disabled = false;

    if (this.props.match.params.binid) {
      document.getElementById("textbin").disabled = true;
      ReqBin(this.props.match.params.binid)
        .then(({ data, notfound }) => {
          if (data) {
            this.context.setBinText(data);
            document.getElementById("textbin").disabled = false;
            return;
          }
          if (notfound) {
            document.getElementById("error-alert").innerHTML = "Bin Not Found";
            document.getElementById("error-alert").classList.remove("d-none");
            return;
          }
          document.getElementById("textbin").disabled = false;
          return this.props.history.push("/");
        })
        .catch((er) => {
          document.getElementById("textbin").disabled = false;
        });
    }
  }

  render() {
    return (
      <main className="fade-in">
        <div className="center mb-3">
          <textarea
            className="full-size p-3"
            wrap="off"
            spellCheck="false"
            id="textbin"
            onChange={this.handleChange}
            value={this.context.binText}
            disabled
          ></textarea>
        </div>
      </main>
    );
  }
}

const BaseApp = () => {
  return (
    <>
      <AuthContextProvider>
        <BinContextProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/about" component={About} exact />
              <Route path="/login" component={LoginSignupPage} exact />
              <Route path="/" component={Home} exact />
              <Route path="/signup" component={LoginSignupPage} exact />
              <Route path="/mybins" component={MyBins} exact />
              <Route
                path="/forgotpassword"
                component={ForgetPasswordPage}
                exact
              />
              <Route
                path="/passwordreset"
                component={PasswordResetPage}
                exact
              />
              <Route path="/:binid" component={Home} exact />
            </Switch>
          </Router>
        </BinContextProvider>
      </AuthContextProvider>
      <footer className="page-footer">
        <div className="row justify-content-center text-secondary mt-1 mx-0">
          <span className="text-secondary">
            &nbsp;
            <a
              className="social-custom-link text-secondary"
              href="https://github.com/Tejasvp25"
              target="_blank"
              rel="noreferrer"
            >
              Tejasvp25
            </a>{" "}
            ?? 2021 ?? Made with{" "}
            <span role="img">
              <img
                src="https://madewithlove.org.in/favicon-16x16.png?v=ngkxyOrw9y"
                alt="love"
              />
              &nbsp;
            </span>
            in India
          </span>
        </div>
        <div className="row justify-content-center text-secondary mx-0">
          <span className="text-secondary">
            <a
              className="social-custom-link text-secondary"
              href="https://github.com/Yet-Another-Paste-Bin"
              target="_blank"
              rel="noreferrer"
            >
              <span role="img">
                <img
                  src="https://github.com/devicons/devicon/raw/master/icons/github/github-original.svg"
                  alt="Git"
                  style={{ height: "20px" }}
                />
                &nbsp;
              </span>
              Yet Another Paste Bin
            </a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default BaseApp;
