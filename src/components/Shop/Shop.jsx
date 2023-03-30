import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    }, []);


  // to get saved data from localStorage
  useEffect( () => {
    const storedCart = getShoppingCart();

    console.log(storedCart);
    console.log('products', products);

    // নতুন '‍addedProduct' কে একটি empty array তে রাখতে..
    const savedCart = [];

    // step 1: get id of stored data in localStorage
    for(const id in storedCart){
      // console.log(id);

      // step 2: get the 'product' from 'products' by using id
      const addedProduct = products.find(product => product.id === id)
      
      // যেহেতু, প্রথমবার useEffect load নেওয়ার সময় 'addedProduct' empty array থাকে তাই, এখানে if condition দিয়ে বলে দেওয়া হয়েছে যে, যদি শুধুমাত্র 'addedProduct' এ কোন data থাকে মানে যদি এটি emplty array না হয়, তবেই নিচের কাজগুলো হবে মানে quantity পাবে এবং quantity করতে পারবে।
      if(addedProduct){
        // step 3.1: get quantity of the product saved in localStorage
        const quantity = storedCart[id];
        // console.log(id, quantity);

        // step 3.2: set quantity for "addedProduct"
        addedProduct.quantity = quantity;
        console.log('added product:', addedProduct);

        // step 4: add the 'addedProduct' to the 'savedCart'
        savedCart.push(addedProduct);
        // console.log(savedCart);
      }
      // step 5: set the cart
      setCart(savedCart)
    }
    /* useEffect যেহেতু synchronous না, এক্ষেত্রে তার dependency set করে দিলে ঐ sequence এ সে কাজ করে effect দিতে পারে।
    এখানে, products এর data পাওয়ার ভিত্তিতে useEffect পুনরায় load হবে */
  } , [products])


  const [cart, setCart] = useState([])

  /*   product card এর মধ্যে button এ handleAddToCart add করতে..

  আমরা জানি যে, react state এর পরিবর্তনে বা onClick এর ক্ষেত্রে data সবসময় unidirectional মানে উপর থেকে নিচের effect বা পরিবর্তন ঘটাতে পারে
  অর্থ্যাৎ, যেমন, কোন 1টি button এ click করলে সচরাচর উক্ত component এর মধ্যে কোন একটা পরিবর্তন ঘটানো যায়।

  তবে, কখনও যদি এমন প্রয়োজন হয় যে, 1টি button এ click করলে তার effect তার উপরের অর্থ্যাৎ parent কোন component এ effect ঘটাবে, এমন প্রয়োজন হলে..
  সেক্ষেত্রে, onClick-টি -ই সরাসরি parent component এ তৈরি করে তাকে props ব্যবহার করে child component এ পাঠিয়ে দিয়ে তারপর ব্যবহার করলে.
  এভাবে উক্ত onClick এর দ্বারা parent এর পরিবর্তন ঘটানো সম্ভব হবে।    */

  const handleAddToCart = (product) => {
    // console.log(product);

    let newCart = [];
    // option 1: আগের 'cart' এর সাথে নতুন 'product' -কে add করে নতুনভাবে 'newCart' set করতে..
    // (option 2.1 এবং 2.2 Cart.jsx এ আছে, এখানে মানে Shop.jsx এর option 1 active থাকলে পরের Cart.jsx এর option 2.1 বা 2.2 আর দরকার হবে না)

    // const newCart = [...cart, product];

    // option 2: নতুনভাবে 'newCart' set করার আগে product এর quantity (Cart.jsx এর বদলে) এখানেই check করে ফেলা..

    
    const exists = cart.find(pd => pd.id === product.id);
    
    // if product doesn't exists in the cart, then set quantity = 1 
    // (প্রথমবার নির্দিষ্ট কোন product cart এ add করার ক্ষেত্রে)
    if(!exists){
      product.quantity = 1;
      newCart = [...cart, product];
    }
    
    // if exists, update quantity every time by adding 1
    else{
      exists.quantity = exists.quantity + 1;

      // কোন existing product পরে বারবার cart এ add করতে..
      // এক্ষেত্রে, cart.find করে যেটা ‍already cart এ add করা আছে তা বাদে বাকিটা মানে remaining product বের করে 
      const remaining = cart.filter(pd => pd.id !== product.id);

      // newCart এ প্রথমে remaining product add করে তার সাথে already cart এ existing product -কে add করা..
      newCart = [...remaining, exists];
    }

    setCart(newCart);

    // to save data on localStorage
    addToDb(product.id)
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
