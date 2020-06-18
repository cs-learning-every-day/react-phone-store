import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
export default class History extends Component {
  getLocalTime = (nS) => {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, " ");
  };

  render() {
    return (
      <div className="py-5">
        <div className="container">
          <ProductConsumer>
            {(value) => {
              return value.history.map((p) => {
                return (
                  <div key={p.id + Math.random()} className="card">
                    <div className="card-header">{p.date}</div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-3">
                          <img className="card-img" src={p.img} alt="" />
                        </div>
                        <div className="col-2">
                          <Link to="/detail">{p.title}</Link>
                        </div>
                        <div className="col-2">￥{p.price}</div>
                        <div className="col-2">{p.count}</div>
                        <div className="col-3">￥{p.total}</div>
                      </div>
                    </div>
                  </div>
                );
              });
            }}
          </ProductConsumer>
        </div>
      </div>
    );
  }
}
