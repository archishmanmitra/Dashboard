// Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className='bg-black min-h-screen min-w-screen flex justify-center items-center text-white'>
        <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;