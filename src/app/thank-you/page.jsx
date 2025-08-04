'use client';

import React from 'react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. Our team will serve you shortly.
        </p>
        <Link href="/menu">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition">
            🍽️ Order More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
