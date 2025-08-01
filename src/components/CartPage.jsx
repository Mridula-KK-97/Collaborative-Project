'use client';

import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage (simulate shared state)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // 🧮 Calculate total
  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  // ❌ Remove from cart
  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h2 className="text-lg font-semibold text-red-600">{item.name}</h2>
                <p className="text-gray-500 text-sm">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6 font-bold text-xl text-green-600">
            Total: ₹{getTotal()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
