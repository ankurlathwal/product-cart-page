const applyDiscountPromo = (promo, totalPrice, cartProducts) => {
    // check minimum cost and quantity eligibility
    if(totalPrice<promo.minCost){
        return false;
    }
    // check if promo is applied to all products of specific to a product
    if(promo.eligibleProducts.findIndex((e)=>e==='all')<0)
    {
        let exists = true;
        // it's not for all, then check if that specific product(s) exists in cart
        promo.eligibleProducts.forEach((product)=>{
            if(cartProducts.findIndex((e)=>e.id===product)<0){
                exists = false;
            }
        })
        if(!exists){
            return false;
        }
        
    }

    // apply discount promo
    let newTotalPrice = totalPrice;
    if(promo.unit === 'percent'){
        newTotalPrice -= (totalPrice*promo.value)/100;
    }
    else if(promo.unit === 'flat'){
        newTotalPrice -= promo.value;
    }
    return newTotalPrice;   
}

const applyReductionPromo = (promo, totalPrice, cartProducts, allProducts) => {
    if(totalPrice<promo.minCost){
        return false;
    }
    let exists = true;
    // check if products exists and has minimum qunatity
    promo.eligibleProducts.forEach((product)=>{
        
        let cartProduct = cartProducts.find((e)=>e.id===product);
        if(!cartProduct || cartProduct.quantity<promo.minQuantity){
            exists = false
        }
    })
    if(!exists){
        return false;
    }

    // apply reduction to each eligible product in cart
    let newProducts = allProducts;
    promo.eligibleProducts.forEach((eligibleProduct)=>{
        const index = newProducts.findIndex((e)=>e.id===eligibleProduct);
        if(index>-1){
            if(promo.unit==='reducedPrice'){
                newProducts[index].reducedPrice = promo.value;
            }
            else if(promo.type==='flat'){
                newProducts[index].reducedPrice = newProducts[index].price - promo.value;
            }
            else if(promo.type==='percent'){
                newProducts[index].reducedPrice = (newProducts[index].price) - (newProducts[index].price*promo.value)/100;
            }
            
        }
    })
    return newProducts;

}

//export {applyDiscountPromo, applyReductionPromo}

module.exports.applyDiscountPromo = applyDiscountPromo;
module.exports.applyReductionPromo = applyReductionPromo;