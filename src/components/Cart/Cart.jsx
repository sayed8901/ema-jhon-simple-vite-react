import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    // const cart = props.cart; // opt 1
    // const {cart} = props; // opt 2

    console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;

    for (const product of cart){

        // option 2.1: // যদি product এর quantity না থাকে মানে 0 হয়, তবে by default একে manually 1 করে দেওয়া..
        // if(product.quantity === 0){
        //     product.quantity = 1
        // }

        // option 2.2: // or can use shortcut if statement:
        // product.quantity = product.quantity || 1;


        quantity = quantity + product.quantity;

        totalPrice = (totalPrice + product.price) * product.quantity;
        totalShipping = (totalShipping + product.shipping) * product.quantity;
    }

    const tax = totalPrice * 10/100;
    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
        </div>
    );
};

export default Cart;