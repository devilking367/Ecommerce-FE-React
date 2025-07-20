import React from 'react';
import { MESSAGES } from '../constants/messages';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function AppHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="bg-white border-b px-6 h-14 flex items-center justify-between">
      <span className="text-lg font-semibold text-gray-800">{MESSAGES.HEADER.TITLE}</span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ml-4"
      >
        Logout
      </button>
    </header>
  );
}