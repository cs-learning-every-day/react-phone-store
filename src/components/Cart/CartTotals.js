import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CartTotals extends Component {
  render() {
    const {
      cartSubTotal,
      cartTax,
      cartTotal,
      clearCart,
      setHistory,
    } = this.props.value;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-right">
              <Link to="/">
                <button
                  className="btn btn-outline-danger mb-3 px-5"
                  type="button"
                  onClick={() => clearCart()}
                >
                  清空购物车
                </button>
              </Link>
              <h5>
                <span className="text-title"> 小计 :</span>{" "}
                <strong>￥ {cartSubTotal} </strong>
              </h5>
              <h5>
                <span className="text-title"> 税收 :</span>{" "}
                <strong>￥ {cartTax} </strong>
              </h5>
              <h5>
                <span className="text-title"> 合计 :</span>{" "}
                <strong>￥ {cartTotal} </strong>
              </h5>
              <button
                className="btn btn-outline-warning mb-3 px-5"
                type="button"
                onClick={() => {
                  setHistory();
                  clearCart();
                }}
              >
                去结算
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
