'use client';

import React, { useState } from 'react';
import { FaStar, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const menuItems = [
  {
    id: 1,
    name: 'Masala Dosa',
    image: '/images/dosa.png',
    price: 60,
    description: 'Crispy dosa with spicy potato filling and chutney.',
    rating: 4.6,
    category: 'veg',
  },
  {
    id: 2,
    name: 'Chicken Biriyani',
    image: '/images/biriyani.jpg',
    price: 150,
    description: 'Spicy and flavorful biryani with raita.',
    rating: 4.5,
    category: 'non-veg',
  },
  {
    id: 3,
    name: 'Veg Pizza',
    image: '/images/pizza.jpg',
    price: 120,
    description: 'Cheesy pizza topped with fresh vegetables.',
    rating: 4.2,
    category: 'veg',
  },
  {
    id: 4,
    name: 'Egg Curry',
    image: '/images/eggcurry.png',
    price: 179,
    description: 'Hard-boiled eggs in rich spiced tomato- onion gravy.',
    rating: '4.6⭐',
    category: 'non-veg',
  },
  {
    id: 5,
    name: 'Dal Tadka',
    image: '/images/tadka.png',
    price: 149,
    description: 'Yellow lentils tempered with cumin, garlic and aromatic spices.',
    rating: 4.4,
    category: 'veg',
  },
  {
    id: 6,
    name: 'Chicken Tikka',
    image: '/images/tikka.jpg',
    price: 330,
    description: 'Marinated chicken pieces grilled to perfection with Indian spices.',
    rating: 4.1,
    category: 'non-veg',
  },
  {
    id: 7,
    name: 'Lemon Juice',
    image: '/images/lemon.png',
    price: 15,
    description: 'Fresh juice with squeeced lemon.',
    rating: 4.4,
    category: 'drinks',
  },
  {
    id: 8,
    name: 'Chocolate Milkshake',
    image: '/images/milkshake.png',
    price: 120,
    description: 'Rich and creamy beverage made with milk and ice cream, blended with chocolate syrup or cocoa powder for a decadent, chocolatey flavor.',
    rating: 4.5,
    category: 'drinks',
  },
  {
    id: 9,
    name: 'Chikoo Shake',
    image: '/images/chikoo.jpg',
    price: 70,
    description: 'Refreshing and healthy shake made with ripened sapota, milk and coconut sugar.',
    rating: 4.5,
    category: 'drinks',
  }
];

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };
  const filteredItems = menuItems.filter((item) => {
  const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
  return matchesSearch && matchesCategory;
});

  return (
    <div className="min-h-screen p-6 bg-yellow-50">
    {/* 📋 Heading + Cart Button */}
    <div className="relative mb-6">
  <h1 className="text-3xl font-bold text-red-700 text-center">📋 Menu</h1>

  <Link href="/cart">
    <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
      🛒 Go to Cart
    </button>
  </Link>
</div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
  {/* 🔍 Search Bar */}
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

  {/* 🍽️ Category Filter Buttons */}
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
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg p-4">
            <img src={item.image} alt={item.name} className="rounded-lg w-full h-40 object-cover mb-3" />
            <h2 className="text-xl font-semibold text-red-600">{item.name}</h2>
            <p className="text-gray-500 text-sm mb-2">{item.description}</p>
            <p className="font-bold text-green-600 mb-3">₹{item.price}</p>
            <div className="flex items-center text-yellow-500 mb-2">
            <FaStar className="mr-1" />
            <span className="text-sm font-medium text-gray-700">{item.rating}</span>
          </div>
            <button
              onClick={() => addToCart(item)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
