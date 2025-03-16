import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('https://dashboard-lr5c.onrender.com/api/logout', {
      method: 'POST',
      credentials: 'include'
      // Include cookies
    });
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;