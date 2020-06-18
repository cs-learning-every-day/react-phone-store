import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContenxt = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    copyProducts: [],
    detailProduct: detailProduct,
    cart: [],
    history: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts, copyProducts: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];

    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() => {
      return {
        products: tempProducts,
        copyProducts: tempProducts,
        cart: [...this.state.cart, product],
      };
    }, this.addTotals);
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count += 1;
    product.total = product.count * product.price;

    this.setState(() => {
      return { cart: [...tempCart] };
    }, this.addTotals);
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
          copyProducts: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  getTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.05;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };
  addTotals = () => {
    const totals = this.getTotals();

    this.setState(() => {
      return {
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total,
      };
    });
  };

  setFilterData = (key) => {
    if (key === "") {
      this.setState({
        products: [...this.state.copyProducts],
      });
      return null;
    }
    if (key.indexOf("\\") !== -1 || key.indexOf("/") !== -1) return null;
    let tempProducts = [...this.state.products];
    var reg = new RegExp(key, "i");
    const data = tempProducts.filter((product) => {
      return (
        product.title.match(reg) !== null || product.info.match(reg) !== null
      );
    });

    this.setState({
      products: data,
    });
  };

  setHistory = () => {
    const tempHistory = this.state.cart.map((product) => {
      const temp = product;
      temp["date"] = new Date().toLocaleString();
      return temp;
    });
    console.log(tempHistory);

    this.setState(
      {
        history: [...this.state.history, ...tempHistory],
      },
      () => {
        alert("购买成功！");
      }
    );
  };

  render() {
    return (
      <ProductContenxt.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          setFilterData: this.setFilterData,
          setHistory: this.setHistory,
        }}
      >
        {this.props.children}
      </ProductContenxt.Provider>
    );
  }
}

const ProductConsumer = ProductContenxt.Consumer;
export { ProductProvider, ProductConsumer };
