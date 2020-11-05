import logo from './logo.svg';
import './App.css';
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      productsInCart: [],
      productAdded: false,
      showCart: false
    }
    this.updateProductsInCart = this.updateProductsInCart.bind(this);
    this.dismissAddedToCart = this.dismissAddedToCart.bind(this);
    this.viewCart = this.viewCart.bind(this);
    this.viewProducts = this.viewProducts.bind(this);
    this.updateCart = this.updateCart.bind(this);
  }
  
  updateProductsInCart (id, quantity) {
    let productsInCart = [...this.state.productsInCart];
    if (productsInCart.length) {
      const index = productsInCart.findIndex((e) => e.id === id);
      if (index === -1) {
        productsInCart.push({
          "id": id,
          "quantity": quantity
        })
      }
      else {
        productsInCart[index].quantity += quantity;
      }
      
    }
    else{
      productsInCart.push({
        "id": id,
        "quantity": quantity
      })
    }
    this.setState({
      productsInCart: productsInCart,
      productAdded: true
    })
    
    
    // console.log("Products: ");
    // console.log(this.state.productsInCart);
  }

  dismissAddedToCart(){
    this.setState({
      productAdded: false
    })
  }

  viewCart(){
    this.setState({
      showCart: true
    })
  }

  viewProducts(){
    this.setState({
      showCart: false
    })
  }

  getTotalProductsInCart(){
    let count = 0;
    this.state.productsInCart.forEach((product)=>{
      count += product.quantity;
    })
    return count;
  }

  updateCart(updatedCart){  
    this.setState({
      productsInCart: [...updatedCart]
    })
  }

  render() {
    if(!this.state.showCart){
      return(
        <div className="App">
          <div className="container">
            <div className="text-right view-cart-btn">
              <button type="button" class="btn btn-primary" onClick={this.viewCart}>
                View Cart { this.state.productsInCart.length>0 ? <span class="badge badge-light">{this.getTotalProductsInCart()}</span> : null}
              </button>
            </div>
            <ProductList updateProducts={this.updateProductsInCart} data={productsData}></ProductList>
            {this.state.productAdded ?
              <div class="alert alert-warning alert-dismissible fade show view-cart-alert" role="alert">
              Product added to card! <a href="#" class="alert-link" onClick={this.viewCart}>View Cart</a>
              <button type="button" onClick={this.dismissAddedToCart} class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              : null}
          </div>
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <div className="container">
            <Cart cartProducts={this.state.productsInCart} 
                  products={productsData} 
                  promoCodes={promoCodesData}
                  updateCart={this.updateCart} 
                  showProducts={this.viewProducts}></Cart>
          </div>  
        </div>
        
      );
    }
  }
  
}

export default App;

const productsData = [
  {
    "id": "wf",
    "name": "Workflow",
    "price": 199.99
  },
  {
      "id": "docgen",
      "name": "Document Generation",
      "price": 9.99
  },
  {
      "id": "form",
      "name": "Form",
      "price": 99.99
  }
]

const promoCodesData = [
  {
    "code": "RRD4D32",
    "type": "discount", // discount or reduction in a single item price
    "unit": "percent", // flat (e.g. $300) or percent (e.g. 15%)
    "value": 10,
    "minCost": 1000,
    "eligibleProducts": [
      "all"
    ]
  },
  {
    "code": "44F4T11",
    "type": "discount", // discount or reduction in a single item price
    "unit": "percent", // flat (e.g. $300) or percent (e.g. 15%)
    "value": 15,
    "minCost": 1500,
    "minQuantity": 0,
    "eligibleProducts": [
      "all"
    ]
  },
  {
    "code": "FF9543D1",
    "type": "reduction", // discount or reduction in a single item price
    "unit": "reducedPrice", // flat (e.g. $300), percent (e.g. 15%) or reduced price
    "value": 8.99,
    "minCost": 0,
    "minQuantity": 10,
    "eligibleProducts": [
      "docgen"
    ]
  },
  {
    "code": "YYGWKJD",
    "type": "reduction", // discount or reduction in a single item price
    "unit": "reducedPrice", // flat (e.g. $300), percent (e.g. 15%) or reduced price
    "value": 89.99,
    "minCost": 0,
    "minQuantity": 1,
    "eligibleProducts": [
      "form"
    ]
  }
]