'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const placeOrder = async () => {
    const table_no = localStorage.getItem('table_no');
    if (!table_no) {
      alert('Table number not found.');
      return;
    }

    const order_id = uuidv4(); // use a UUID for grouping items in one order
    const created_at = new Date().toISOString();

    const orderData = cartItems.map((item) => ({
      order_id,
      table_no,
      item: item.name,
      quantity: item.quantity,
      tot_price: item.quantity * item.price,
      created_at,
      status: 'ordered',
    }));

    const { error } = await supabase.from('orders').insert(orderData);

    if (error) {
      alert('Failed to place order. Try again.');
      console.error(error.message);
    } else {
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      router.push('/thank-you');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-6 bg-yellow-50">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 max-w-3xl mx-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <div>
                  <h2 className="text-xl font-semibold text-red-600">{item.name}</h2>
                  <p className="text-gray-500">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                  <button onClick={() => removeItem(item.id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-6 max-w-3xl mx-auto">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total: ₹{total}</p>
            <button
              onClick={placeOrder}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              ✅ Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
