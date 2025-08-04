"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ email: '', password: '' });

  const router = useRouter();

  const handleInputChange = (e) => {
  const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  console.log('Submitting login:', userData);

  try {
    const res = await axios.post('/api/auth/login', {
      username: userData.email.toLowerCase(),
      password: userData.password,
    });
    console.log('Login response:', res.data);

    if (!res.data.email) {
      alert('Login failed: invalid response');
      setIsLoading(false);
      return;
    }

    localStorage.setItem('user', JSON.stringify({
      email: res.data.email,
      role: res.data.role,
      name: res.data.name,
    }));

    console.log('Redirecting to dashboard...');
  
    window.location.href = '/admin/dashboard'; 


  } catch (err) {
  if (err.response) {
    console.error('Backend error:', err.response.data);
    alert(`Login failed: ${err.response.data.error || 'Unknown error'}`);
  } else {
    console.error('Unexpected error:', err.message);
    alert('Login failed: Network or client-side issue');
  }
}
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSubmit}  className="bg-black shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>
        <h5 className="text-l text-center text-white">Sign in to manage your restaurant</h5>
        
        Email Address
        <input
          type="text"
          placeholder="Email"
          value={userData.email}
          name="email"
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-blue-700 focus:ring-2 focus:ring-black text-white"
        />

        Password
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          name="password"
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-blue-700 focus:ring-2 focus:ring-black text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-lg focus:ring-4 focus:ring-blue-700"
          disabled={isLoading} 
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
