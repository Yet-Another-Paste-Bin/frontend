import React, { Component } from "react";
import { ReqAllBin } from "../utils/networkUtils";
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

  render() {
    return (
      <div className="center">
        {this.state.bins.length > 0 ? (
          this.state.bins.map((e) => <BinItem bin={e} key={nanoid()} />)
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default MyBins;
