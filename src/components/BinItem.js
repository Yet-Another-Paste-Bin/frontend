import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faLock, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { UpdateBin } from "../utils/networkUtils";
const BinItem = (props) => {
  var { bin } = props;
  var { data, _id } = bin;
  const binLink = window.location.origin.toString() + "/" + _id;
  const [updatable, setUpdatable] = useState(false);
  var dataTextarea = nanoid();
  var collapseId = nanoid();

  const copyBinToClipboard = () => {
    navigator.clipboard.writeText(document.getElementById(dataTextarea).value);
  };
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(binLink);
  };

  const handleTextDataChange = () => {
    const dataval = document.getElementById(dataTextarea).value;
    if (data === dataval) setUpdatable(false);
    if (data !== dataval) setUpdatable(true);
  };

  const updateBin = () => {
    let tempBin = Object.assign({}, bin);
    tempBin.data = document.getElementById(dataTextarea).value;
    UpdateBin(tempBin).then((status) => {
      if (status === 200) {
        bin = Object.assign({}, tempBin);
        data = bin.data;
        _id = bin._id;
        document.getElementById(dataTextarea).value = data;
        setUpdatable(false);
      }
    });
  };

  return (
    <div className="container m-1">
      <div className="card">
        <div className="card-header">
          <div className="row m-1">
            {bin.private ? (
              <>
                <span className="mx-1">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                &nbsp;
              </>
            ) : null}

            {binLink}
          </div>
          <div className="row justify-content-center">
            <button
              className="btn btn-secondary-revert mx-2 my-1"
              data-toggle="collapse"
              data-target={`#${collapseId}`}
              aria-expanded="false"
              aria-controls={collapseId}
            >
              Show Bin Content
            </button>
            <button
              className="btn btn-secondary-revert mx-2 my-1"
              style={{ color: "rgb(189, 189, 189)" }}
              onClick={copyBinToClipboard}
            >
              Copy Bin &nbsp;
              <FontAwesomeIcon icon={faClone} />
            </button>
            <button
              className="btn btn-secondary-revert mx-2 my-1"
              style={{ color: "rgb(189, 189, 189)" }}
              onClick={copyLinkToClipboard}
            >
              Copy Bin Link &nbsp;
              <FontAwesomeIcon icon={faClone} />
            </button>
            <button
              className="btn btn-secondary-revert mx-2 my-1"
              style={{ color: "rgb(189, 189, 189)" }}
              onClick={() => {
                props.deleteFn(_id);
              }}
            >
              Delete &nbsp;
              <FontAwesomeIcon icon={faTrash} />
            </button>
            {updatable ? (
              <button
                className="btn btn-secondary-revert mx-2 my-1"
                style={{ color: "rgb(189, 189, 189)" }}
                onClick={updateBin}
              >
                Update &nbsp;
                <FontAwesomeIcon icon={faUpload} />
              </button>
            ) : null}
          </div>
        </div>
        <div className="collapse" id={collapseId}>
          <div className="card-body bg-card-secondary">
            <div className="row justify-content-around">
              <span>
                <b>Created At :</b> {new Date(bin.createdAt).toUTCString()}
              </span>
              <span>
                <b>Updated At :</b> {new Date(bin.updatedAt).toUTCString()}
              </span>
            </div>
            <hr />
            <div style={{ fontFamily: "Fira Code", display: "flex" }}>
              <textarea
                id={dataTextarea}
                className="full-size-textarea"
                defaultValue={data}
                onChange={handleTextDataChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BinItem;
