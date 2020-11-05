import {useState} from 'react';
import styles from "./product.module.css";

const Product = (props) => {
    const [quantity, setQuantity] = useState(0);
    const [quantityError, setQuantityError] = useState(false);
    const addToCart = () => {
        if(quantity>0){
            props.onAddToCart(props.product.id, quantity);
        }
        else{
            setQuantityError(true);
        }
    }

    return(
        <div class="card h-100 text-center">
        {/* <img src={props.product.image} class="card-img-top" alt={props.product.name} /> */}
            <div class="card-body">
                <h5 class="card-title"> {props.product.name} </h5>
                <p class="card-text"> ${props.product.price} </p>
                <select className={["custom-select", "custom-select-sm", styles.quantity].join(' ')} onChange={(e)=>{setQuantity(parseInt(e.target.value))}}>
                    <option selected>Select Quantity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                { quantityError ? <p class="text-danger">Please select a quantity</p> : null }
                <a href="#" class="btn btn-primary" onClick={addToCart}>Add to cart</a>
            </div>
        </div>
    );

}

export default Product;