// Login.jsx
import { X } from 'lucide-react';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
      // Include cookies
    });

    if (response.ok) {
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#09090b] opacity-80 rounded-lg border border-[var(--color-bodcol)] p-8 relative">
        <button 
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          onClick={() => navigate('/')}
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl text-white mb-2">Login</h2>
            <p className="text-zinc-400">Please login again to continue using the application.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md text-white shadow-2xl placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 shadow-md bg-black border border-zinc-700 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••••"
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-white rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                onClick={() => navigate('/scan')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;