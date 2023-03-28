import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    }, []);


    
    const [cart, setCart] = useState([])

/*   product card এর মধ্যে button এ handleAddToCart add করতে..
উল্লেখ্য যে, react state এর পরিবর্তনে বা onClick এর ক্ষেত্রে data সবসময় unidirectional মানে উপর থেকে নিচের effect বা পরিবর্তন ঘটাতে পারে
অর্থ্যাৎ, যেমন, কোন 1টি button এ click করলে সচরাচর উক্ত component এর মধ্যে কোন একটা পরিবর্তন ঘটানো যায়।

তবে, কখনও যদি এমন প্রয়োজন হয় যে, 1টি button এ click করলে তার effect তার উপরের অর্থ্যাৎ parent কোন component এ effect ঘটাবে, এমন প্রয়োজন হলে..
সেক্ষেত্রে, onClick-টি -ই সরাসরি parent component এ তৈরি করে তাকে props ব্যবহার করে chicd component এ পাঠিয়ে দিয়ে তারপর ব্যবহার করলে.
এক্ষেত্রে উক্ত onClick এর দ্বারা parent এর পরিবর্তন ঘটানো সম্ভব হবে।    */

  const handleAddToCart = (product) => {
    // console.log(product);
    const newCart = [...cart, product];
    setCart(newCart);
  };


  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
              ></Product>
        ))}
      </div>
      <div className="cart-container">
        <h4>Order Summary:</h4>
        <p>Selected Items: {cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;
