import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../utils/UserContext';

function Navbar() {
  const { user } = useUser();

  const handleLogout = () => {
    // Handle logout
    localStorage.removeItem('token');
    window.location.reload(); 
  };

  return (
    <nav className="bg-white bg-opacity-50 backdrop-blur-md fixed w-full z-10 top-0 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/dashboard">Idea Bank</Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : null}
              <div className="flex flex-col items-end">
                <span className="font-semibold">{user.name}</span>
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-gray-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-800 hover:text-gray-600">Login</Link>
              <Link to="/register" className="text-gray-800 hover:text-gray-600">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
