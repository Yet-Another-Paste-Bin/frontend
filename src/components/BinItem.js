import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faLock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import React from "react";
const BinItem = (props) => {
  const { bin } = props;
  const { data, _id } = bin;
  const binLink = window.location.origin.toString() + "/" + _id;
  var dataDivId = nanoid();
  var collapseId = nanoid();

  const copyBinToClipboard = () => {
    navigator.clipboard.writeText(document.getElementById(dataDivId).innerHTML);
  };
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(binLink);
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
          </div>
        </div>
        <div className="collapse" id={collapseId}>
          <div className="card-body bg-card-secondary" id={dataDivId}>
            {data}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BinItem;
