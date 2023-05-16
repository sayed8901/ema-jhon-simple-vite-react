import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {

    // if cart data is in database, you have to use async await

    // anyway, as we are not storing data in real database right now, we are are not using async await at this moment..

    const storedCart = getShoppingCart();

    
    const ids = Object.keys(storedCart);
    console.log(ids);

    const loadedProducts = await fetch('http://localhost:5000/productsbyIds', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
    }, 
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();

    console.log('Products by ID:', products);


    const savedCart = [];


    // function to find out the currently clicked item to add later on with the existing shoppingCart
    // checking if the item is exists in the existing shoppingCart or not
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd._id === id);
        // if exists, updating the quanity
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }
    }

    // console.log(products, storedCart, savedCart);
    
    return savedCart;
}

export default cartProductsLoader;