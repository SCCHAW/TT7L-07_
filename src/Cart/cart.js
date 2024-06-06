import React, { useState } from 'react';
import './ShoppingCart.css'; // Import CSS file for styling

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeItemFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => removeItemFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice}</h3>
      <div className="product-buttons">
        <button onClick={() => addItemToCart({ name: 'Product 1', price: 10 })}>Add Product 1</button>
        <button onClick={() => addItemToCart({ name: 'Product 2', price: 20 })}>Add Product 2</button>
        <button onClick={() => addItemToCart({ name: 'Product 3', price: 30 })}>Add Product 3</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
