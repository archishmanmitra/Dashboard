import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/logout`, {
      method: 'POST',
      credentials: 'include'
      // Include cookies
    });
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className='flex ml-2 gap-2'>
      <Icon icon="mdi:logout" width="24" height="24" />
      Logout
      </button>
  );
};

export default Logout;