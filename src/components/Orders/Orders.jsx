import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const savedCart = useLoaderData();
    
    const [cart, setCart] = useState(savedCart);

    // console.log(savedCart, cart);


    // function to find out the remaining cart by removing the clicked item
    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(pd => pd.id !== id);
        // to handle the changing status of cart
        setCart(remaining);

        // to actually remove from database or in this case from localStorage, we are using 'removeFromDb' function created in 'fakebDb' utility component.
        removeFromDb(id);
    }


    // function to handle clear cart button
    const handleClearCart = () => {
        setCart([]);

        // clearing the shoppingCart stored on localStorage. it is used from 'fakeDb'
        deleteShoppingCart();
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
                <Cart 
                    cart={cart}
                    handleClearCart = {handleClearCart}
                >
                    {/* 'Proceed checkout' button passed to Cart component */}
                    <Link to={'/checkout'} className="proceed-link">
                        <button className='btn-proceed'>
                            <span>Proceed Checkout</span>
                            <FontAwesomeIcon icon={faCreditCard }/>
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;