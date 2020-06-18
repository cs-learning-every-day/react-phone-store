import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";
import SearchBar from "./SearchBar";

export default class ProductList extends Component {
  render() {
    return (
      <>
        <div className="py-5">
          <div className="container">
            <Title name="我们的" title="产品" />
            <ProductConsumer>
            {
              (value)=>{
                return <SearchBar setFilterData={value.setFilterData}/>
              }
            }
            </ProductConsumer>
            
            <div className="row">
              <ProductConsumer>
                {(value) => {                  
                  return value.products.map((product) => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </>
    );
  }
}
