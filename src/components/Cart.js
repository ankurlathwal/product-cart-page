import React, {Component} from 'react';
import styles from './cart.module.css';
import {applyDiscountPromo, applyReductionPromo} from '../lib/promos';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: [...this.props.products],
            cartProducts: this.props.cartProducts,
            invalidPromo: false,
            promoCode: '',
            promo: {},
            totalPrice: 0,
            promoApplied: false,
            promoError: false
        }
        this.updatePromoCode = this.updatePromoCode.bind(this);
        this.validatePromo = this.validatePromo.bind(this);
        this.applyPromo = this.applyPromo.bind(this);
        this.setTotalPrice = this.setTotalPrice.bind(this);
    }

    componentDidMount(){
        console.log("Is Promo applied: " + this.state.promoCode);
        this.setTotalPrice()
    }

    setTotalPrice(type){
        let totalPrice = 0;
        this.state.cartProducts.forEach((cartProduct)=>{
            if(type === 'original'){
                totalPrice += cartProduct.quantity * this.getProductPriceById(cartProduct.id, 'original');
            }
            else{
                totalPrice += cartProduct.quantity * this.getProductPriceById(cartProduct.id);
            }
            
        })
        this.setState({
            totalPrice: totalPrice
        })
    }

    setToOriginalPrice(){
        this.setTotalPrice('original');
    }

    getOriginalTotalPrice(){
        let totalPrice = 0;
        this.state.cartProducts.forEach((cartProduct)=>{
            totalPrice += cartProduct.quantity * this.getProductPriceById(cartProduct.id, 'original');
        })
        return totalPrice;
    }

    getProductNameById(id){
        const product = this.state.products.find((product)=>product.id===id);
        return product.name || "";
    }

    getProductPriceById(id, type){
        const product = this.state.products.find((product)=>product.id===id);
        if(type==='original'){
            return product.price;
        }
        else if(type==='reduced'){
            return product.reducedPrice;
        }
        else{
            if(this.state.promoApplied){
                return product.reducedPrice || product.price;
            }
            return product.price;
        }
    }

    getTotalPrice(){
        return this.state.totalPrice;
    }

    removeFromCart(id){
        let cartProducts = [...this.state.cartProducts];
        const index = cartProducts.findIndex((e)=>e.id===id);
        cartProducts.splice(index, 1);
        this.setState({
            cartProducts: cartProducts
        },()=>{
            this.props.updateCart(cartProducts);
            this.setTotalPrice();
        })
        
        // revalidate coupon now since the cart items have changed.
        this.validatePromo();

    }

    validatePromo(){
        this.setState({
            promoError: false
        })
        if(this.state.promoApplied){
            this.setState({
                doublePromo: true,
                promoError: true
            })
        }
        else{
            const index = this.props.promoCodes.findIndex((e)=>e.code===this.state.promoCode);
            if(index===-1){
                this.setState({
                    invalidPromo: true,
                    promoError: true
                })
            }
            else{
                this.setState({
                    promo: this.props.promoCodes[index]
                })
                this.applyPromo();
            }
        }
        
    }

    applyPromo(){
        const promo = this.props.promoCodes.find((e)=>e.code===this.state.promoCode);
        if(promo.type === "discount"){
            let result = applyDiscountPromo(promo, this.getTotalPrice(), this.state.cartProducts);
            if(result===false){
                this.setState({
                    invalidPromo: true,
                    promoError: true
                })
            }
            else{
                this.setState({ 
                    totalPrice: result,
                    promoApplied: true
                })
            }
        }
        else if(promo.type === "reduction"){
            let result = applyReductionPromo(promo, this.getTotalPrice(), this.state.cartProducts, this.state.products);
            if(result===false){
                this.setState({
                    invalidPromo: true,
                    promoError: true
                })
            }
            else{
                this.setState({
                    products: result,
                    promoApplied: true
                },()=>{
                    this.setTotalPrice();
                })
            }

        }
    }

    updatePromoCode(event){
        this.setState({
            promoCode: event.target.value
        })
    }

    
 // needs - promo obj, totalprice, cartProducts, allProducts
    


    render(){
        return(
        <div>
            <h2>Products in cart</h2>
            <ul class="list-group">
            {this.state.cartProducts && this.state.cartProducts.length ? this.state.cartProducts.map((product)=>{
                return(
                    
                    <li key={product.id} class="list-group-item d-flex justify-content-between align-items-center">
                        {this.getProductNameById(product.id)}
                <span class="small">{this.state.promoApplied && this.state.promo.type ==='reduction' ? <del>${this.getProductPriceById(product.id, 'original')} </del>:null}${this.getProductPriceById(product.id)}</span>
                        <span className="small">x {product.quantity}</span>
                        <span> ${product.quantity * this.getProductPriceById(product.id)} </span>
                        <a href="#" class="badge badge-danger" onClick={()=>this.removeFromCart(product.id)}>Remove</a>                        
                        {/* <span class="badge badge-primary badge-pill">{product.quantity}</span> */}
                    </li>
                    
                )
            }): <div>No products in the cart</div>}
            </ul>
                <div className={["row", styles.couponInput].join(' ')}>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className={["input-group"].join(' ')}>
                            <input type="text" value={this.state.promoCode} onChange={this.updatePromoCode} class="form-control" placeholder="Enter Promo Code" aria-label="Promo Code" aria-describedby="coupon-button" />
                            <div class="input-group-append">
                                <button class="btn btn-info" type="button" id="coupon-button" onClick={this.validatePromo}  aria-disabled={this.state.promoApplied}>Apply</button>
                            </div>
                        </div>
                        {this.state.promoApplied ? <p className="text-success">Promo code applied!</p> : null}
                        {this.state.promoError && this.state.invalidPromo ? <p className="text-danger">Invalid promo code</p> : null}
                        {this.state.promoError && this.state.doublePromo ? <p className="text-danger">Only one promo code is allowed</p>: null}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-right">
                        <p className="text-right"><b>Original Price: </b>${this.getOriginalTotalPrice()}</p>
                        <p className="text-right"><b>Promotions: </b>${(this.getOriginalTotalPrice() - this.getTotalPrice()).toFixed(2)}</p>
                        <p className="text-right"><b>Total: </b>${this.getTotalPrice().toFixed(2)}</p>
                    </div>
                </div>
                
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-left">
                    <a role="button" className="btn btn-primary" onClick={this.props.showProducts}>&#8592; Back to products</a>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-right">
                    <a role="button" className="btn btn-success">Go to checkout &#8594;</a>
                </div>
            </div>
        </div>
        )
        
    }
}

export default Cart;