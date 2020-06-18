import React, { Component } from "react";

export default class Default extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
            <h1 className="display-3">404</h1>
            <h1>坠机</h1>
            <h2>与地球断开连接</h2>
            <h3>
              您访问的地址{" "}
              <span className="text-danger">
                "{this.props.location.pathname}"
              </span>{" "}
              没有找到
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
