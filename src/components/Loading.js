import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="center" style={{ height: "100vh" }}>
      <span>
        <h1 className="text-secondary">Yet Another Paste Bin</h1>
      </span>
      <br />
      <BeatLoader />
    </div>
  );
};
export default Loading;
