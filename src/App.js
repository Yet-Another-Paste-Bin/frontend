import "./App.css";
import Navbar from "./components/Navbar";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SingupPage";

const Home = () => {
  return (
    <main>
      <div className="row justify-content-center mb-2">
        <textarea
          className="full-size p-3"
          wrap="off"
          spellCheck="false"
          id="textbin"
        ></textarea>
      </div>
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Navbar />

          <Switch>
            <Route path="/login" component={LoginPage} exact />
            <Route path="/" component={Home} exact />
            <Route path="/signup" component={SignupPage} exact />
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
