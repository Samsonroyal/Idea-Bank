// UserSearch.js
import React, { useState } from 'react';
import { useUser } from '../utils/UserContext';
import Navbar from './Navbar';

function UserSearch() {
  const [query, setQuery] = useState('');
  const { users, isLoading, error, searchUsers } = useUser();

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchUsers(query);
  };

  return (
    <div >
      <Navbar />
      <div className="bg-gray-100 min-h-screen pt-20">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
        <div className="bg-blue-500 p-4">
          <h1 className="text-2xl font-bold text-white">Search Users</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email"
                required
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <img src={user.avatar || 'https://via.placeholder.com/50'} alt={user.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">No users found</p>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UserSearch;
