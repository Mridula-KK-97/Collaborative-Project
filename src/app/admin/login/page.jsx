"use client"; 
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const[userData,setuserData] = useState({username:'',password:''})

  const router = useRouter()

  const handleInputChange = (e)=>{
    const {name,value} = e.target
    setuserData(prev => ({...prev,[name]:value}))
  }

  const buttonClick =  () =>{
    setIsLoading(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');

  try {
    const response = await axios.post('/api/auth/login',userData)
    setMessage(response.data.message); 
    console.log(response.data);
    router.push('/admin/dashboard')
  } catch (error) {
    console.error('Login failed:', error);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
       <h2 className="text-3xl font-bold text-center text-gray-800">Admin Login</h2>
       <h5 className="text-l  text-center text-gray-800">Sign in to manage your restaurant</h5>
        Email Address<input type="text" placeholder="Username" value={userData.username} name='username' onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-green-700 focus:ring-2 focus:ring-black"/>
        Password <input type="password" placeholder="Password" value={userData.password} name='password' onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-green-700 focus:ring-2 focus:ring-black"/>
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg focus:ring-4 focus:ring-green-700" onClick={buttonClick} value={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

