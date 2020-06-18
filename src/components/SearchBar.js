import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    len: 0,
  };
  handleFilterData = (event) => {
    const key = event.target.value;
    if (key.length < this.state.len) {
      this.props.setFilterData("");
    }
    this.setState(
      {
        len: key.length,
      },
      () => this.props.setFilterData(key)
    );
  };
  render() {
    return (
      <div>
        <input
          onChange={this.handleFilterData}
          className="form-control"
          type="text"
          placeholder="Search"
        ></input>
      </div>
    );
  }
}
