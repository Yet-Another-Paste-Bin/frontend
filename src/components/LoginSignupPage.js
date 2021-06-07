import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import LoginPage from "./LoginPage";
import SignupPage from "./SingupPage";

const LoginSignupPage = (props) => {
  const [flipped, setFlipped] = useState(!(props.match.path === "/login"));
  useEffect(() => {
    setFlipped(!(props.match.path === "/login"));
    return () => {};
  }, [props]);
  return (
    <div className="fade-in">
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <LoginPage
          onClickSignup={(e) => {
            e.preventDefault();
            setFlipped(!flipped);
          }}
        />
        <SignupPage
          onClickLogin={(e) => {
            e.preventDefault();
            setFlipped(!flipped);
          }}
        />
      </ReactCardFlip>
    </div>
  );
};

export default LoginSignupPage;
