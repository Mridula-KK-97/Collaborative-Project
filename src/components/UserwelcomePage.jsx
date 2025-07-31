"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { FaUtensils } from 'react-icons/fa';


const UserwelcomePage = () => {
    const router = useRouter();

    const handleContinue = () => {
        router.push('/menu'); 
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-50 p-4">
      <div className="text-center">
        <div className="flex flex-col items-center mb-4">
          <div className="text-red-600 text-4xl mb-2">
            <FaUtensils />
          </div>
          <h1 className="text-3xl font-bold text-red-700">Restaurant</h1>
          <p className="text-xl text-red-500">Welcomes You</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Scan QR Code to order
          </h2>
          <p className="text-gray-500 mb-4">your favourite dishes !!</p>
          <img
            src="/qrImage.png"
            alt="QR CODE"
            className="mx-auto w-40 h-40 bg-green-100 rounded-xl p-4 mb-4"
          />
          <button
            onClick={handleContinue}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <FaUtensils />
            Continue to Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserwelcomePage