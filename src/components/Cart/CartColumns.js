import React from "react";

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row ">
        <div className="col-10 mx-auto col-lg-2">
          <p>商品</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p>商品名称</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p>价格</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p>数量</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p>删除</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p>合计</p>
        </div>
      </div>
    </div>
  );
}
