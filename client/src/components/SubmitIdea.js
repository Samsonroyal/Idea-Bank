import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

function SubmitIdea() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/ideas', { title, description }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to submit idea. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-blue-500 p-4">
            <h1 className="text-2xl font-bold text-white">Idea Bank</h1>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-4">
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Title" 
                  required
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-4">
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Description" 
                  required
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  rows="4"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out"
              >
                {isLoading ? 'Submitting...' : 'Submit Idea'}
              </button>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitIdea;