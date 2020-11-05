import Product from "./Product";

const ProductList = (props) => {

    const pushToCart = (productId, quantity) => {
        props.updateProducts(productId, quantity);
    }

    let products = [];
    if(props.data && props.data.length){
        products = props.data.map((product)=>
            <div key={product.id} className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <Product key={product.id} product={product} onAddToCart={pushToCart}></Product>
            </div>
            )
    }

    return(
        <div className="row">
            {products}
        </div>
    )
}

export default ProductList;

