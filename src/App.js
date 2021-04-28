import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./components/SingupPage";
import AuthContextProvider from "./contexts/AuthContext";
import BinContextProvider, { BinContext } from "./contexts/BinContext";
import { ReqBin } from "./utils/networkUtils";
class Home extends Component {
  static contextType = BinContext;

  handleChange = () => {
    const rawBinText = document.getElementById("textbin").value;
    if (this.binText !== rawBinText) {
      this.context.setBinText(rawBinText);
      this.context.setBinLink("");
    }
  };

  componentDidMount() {
    document.getElementById("textbin").disabled = false;

    if (this.props.match.params.binid) {
      document.getElementById("textbin").disabled = true;
      ReqBin(this.props.match.params.binid)
        .then(({ data }) => {
          if (data) {
            this.context.setBinText(data);
            return;
          }
          document.getElementById("textbin").disabled = false;
          return this.props.history.push("/");
        })
        .catch((er) => console.log(er));
    }
  }

  render() {
    return (
      <main>
        <div className="row justify-content-center mb-2">
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

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BinContextProvider>
          <Router>
            <Navbar />

            <Switch>
              <Route path="/login" component={LoginPage} exact />
              <Route path="/" component={Home} exact />
              <Route path="/signup" component={SignupPage} exact />
              <Route path="/:binid" component={Home} exact />
            </Switch>
          </Router>
        </BinContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
