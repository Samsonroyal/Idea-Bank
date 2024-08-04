// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://idea-bank.onrender.com/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      setError('Failed to fetch user data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async (query) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://idea-bank.onrender.com/api/auth/search?query=${query}`);
      setUsers(res.data);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, users, isLoading, error, searchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
