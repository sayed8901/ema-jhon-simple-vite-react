import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoffee , faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";

const Product = (props) => {
  // console.log(props.product);
  const { img, name, price, ratings, seller, quantity } = props.product;

  const handleAddToCart = props.handleAddToCart;

  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <h4>Price: $ {price}</h4>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} stars</p>
      </div>

      <button onClick={() => handleAddToCart(props.product)} className="btn-cart">
        Add to Cart
        <FontAwesomeIcon icon={faShoppingCart} />
        </button>
    </div>
  );
};

export default Product;
