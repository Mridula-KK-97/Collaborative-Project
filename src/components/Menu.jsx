// File: src/components/UserMenu.jsx

'use client';

import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const UserMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/menu/get');
        if (!res.ok) throw new Error('Failed to fetch');
        const items = await res.json();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu:', error.message);
      }
    };

    fetchItems();
  }, []);

  const addToCart = (item) => {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingCartItem = currentCart.find(i => i.id === item.id);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      currentCart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }

    try {
      localStorage.setItem('cart', JSON.stringify(currentCart));
      alert(`${item.name} added to cart!`);
    } catch (e) {
      alert("Cart storage limit exceeded. Please remove some items or refresh.");
      console.error("Storage Error:", e);
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ||
      (categoryFilter === 'veg' && item.veg) ||
      (categoryFilter === 'non-veg' && !item.veg) ||
      (categoryFilter === 'drinks' && item.category === 'drinks');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-6 bg-yellow-50">
      <div className="relative mb-6">
        <h1 className="text-3xl font-bold text-red-700 text-center">📋 Menu</h1>
        <Link href="/cart">
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            🛒 Go to Cart
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:max-w-xl">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 shadow"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-2">
          {['all', 'veg', 'non-veg', 'drinks'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full font-medium border transition ${
                categoryFilter === cat
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-red-500 border-red-300'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg p-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="rounded-lg w-full h-40 object-cover mb-3"
            />
            <h2 className="text-xl font-semibold text-red-600">{item.name}</h2>
            <p className="text-gray-500 text-sm mb-2">{item.description}</p>
            <p className="text-sm font-medium mb-2">
              <span className="text-gray-700">Availability: </span>
              <span className={item.available ? 'text-green-600' : 'text-red-500'}>
                {item.available ? 'Available' : 'Out of Stock'}
              </span>
            </p>
            <p className="font-bold text-green-600 mb-2">₹{item.price}</p>
            <button
              onClick={() => {
                if (item.available) {
                  addToCart(item);
                } else {
                  alert(`${item.name} is out of stock.`);
                }
              }}
              className={`px-4 py-2 rounded transition text-white ${
                item.available ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!item.available}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
