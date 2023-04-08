import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../../ReviewItem/ReviewItem';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    
    const [cart, setCart] = useState(savedCart);

    // console.log(savedCart, cart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(pd => pd.id !== id);
        // to handle the changing status of cart
        setCart(remaining);

        // to actually remove from database or in this case from localStorage, we are using 'removeFromDb' function created in 'fakebDb' utility component.
        removeFromDb(id);
    }
    
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key = {product.id}
                        product = {product}

                        handleRemoveFromCart = {handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;