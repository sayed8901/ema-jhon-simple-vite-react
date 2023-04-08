import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();


    // if cart data is in database, you have to use async await

    // anyway, as we are not storing data in real database right now, we are are not using async await at this moment..

    const storedCart = getShoppingCart();
    
    const savedCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }
    }

    console.log(products, storedCart, savedCart);
    return savedCart;
}

export default cartProductsLoader;