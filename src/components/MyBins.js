import React, { Component } from "react";
import { DeleteBin, ReqAllBin } from "../utils/networkUtils";
import BinItem from "./BinItem";
import { nanoid } from "nanoid";
import { BeatLoader } from "react-spinners";

class MyBins extends Component {
  state = { bins: [], requesting: true };

  componentDidMount() {
    if (localStorage.getItem("id") === null) {
      this.props.history.push("/");
    }
    ReqAllBin()
      .then((res) => {
        const { data } = res;
        if (data && data.length > 0) {
          this.setState({ ...this.state, bins: data });
        }
      })
      .finally(() => this.setState({ ...this.state, requesting: false }));
  }

  deleteBin = (binId) => {
    DeleteBin(binId).then((status) => {
      if (status === 200) {
        this.setState({
          bins: this.state.bins.filter((bin) => bin._id !== binId),
        });
      }
    });
  };

  render() {
    return (
      <>
        {this.state.bins.length > 0 ? (
          <div className="center fade-in">
            {this.state.bins.map((e) => (
              <BinItem bin={e} key={nanoid()} deleteFn={this.deleteBin} />
            ))}
          </div>
        ) : (
          <div
            className="center"
            style={{
              minHeight: "40vh",
              color: "rgb(189, 189, 189)",
              textAlign: "center",
            }}
          >
            {this.state.requesting ? (
              <>
                <h1> Loading </h1>
                <BeatLoader size="20px" loading={true} />
              </>
            ) : (
              <h1> Oops! No Bins Found </h1>
            )}
          </div>
        )}
      </>
    );
  }
}

export default MyBins;
