import React, { Component } from "react";
import { DeleteBin, ReqAllBin } from "../utils/networkUtils";
import BinItem from "./BinItem";
import { nanoid } from "nanoid";

class MyBins extends Component {
  state = { bins: [] };

  componentDidMount() {
    if (localStorage.getItem("id") === null) {
      this.props.history.push("/");
    }
    ReqAllBin().then((res) => {
      const { data } = res;
      if (data && data.length > 0) {
        this.setState({ bins: data });
      }
    });
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
          <div className="center">
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
            <h1> Oops! No Bins Found </h1>
          </div>
        )}
      </>
    );
  }
}

export default MyBins;
