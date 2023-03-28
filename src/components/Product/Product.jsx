import React from "react";
import "./Product.css";

const Product = (props) => {
  console.log(props.product);
  const { img, name, price, ratings, seller, quantity } = props.product;
  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <h4>Price: $ {price}</h4>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} star</p>
      </div>
      <button className="btn-cart">Add to Cart</button>
    </div>
  );
};

export default Product;
