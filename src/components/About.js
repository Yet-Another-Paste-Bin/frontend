import React from "react";

const About = () => {
  return (
    <div
      className="center fade-in"
      style={{
        minHeight: "60vh",
        color: "rgb(189, 189, 189)",
        textAlign: "center",
        fontFamily: "Fira Code",
      }}
    >
      <h2>Yet Another Paste Bin © 2021</h2> This website is created by{" "}
      <b>Tejas Patil</b> aka <b>Tejasvp25</b>
      <br />
      <a
        className="social-custom-link text-secondary"
        href="mailto:tejasvp25@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {"<tejasvp25@gmail.com>"}
      </a>
      <a
        className="social-custom-link text-secondary"
        href="https://github.com/Tejasvp25"
        target="_blank"
        rel="noopener noreferrer"
      >
        {"<https://github.com/Tejasvp25>"}
      </a>
      <br />
      <br />
      <span style={{ fontSize: "18px" }}>
        Service similar to Pastebin, where you can store text or code snippets
        online,
        <br /> for this simply paste your text and share it with your friends.
        <br />
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
          Source Code
        </a>
      </span>
    </div>
  );
};

export default About;
