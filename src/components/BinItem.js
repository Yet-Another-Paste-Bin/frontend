import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
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
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              {bin.private ? (
                <>
                  <span className="mx-1">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  &nbsp;
                </>
              ) : null}

              {binLink}
              <button
                className="btn btn-secondary-revert mx-2"
                style={{ color: "rgb(189, 189, 189)" }}
                onClick={copyLinkToClipboard}
              >
                <FontAwesomeIcon icon={faClone} />
              </button>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row text-right justify-content-end">
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
                  Copy Bin&nbsp;
                  <FontAwesomeIcon icon={faClone} />
                </button>
              </div>
            </div>
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
