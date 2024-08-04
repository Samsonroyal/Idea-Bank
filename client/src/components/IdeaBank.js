import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const api = axios.create({
  baseURL: 'https://idea-bank.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

function IdeaBank() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userIdeas, setUserIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdeas();
    fetchUserIdeas();
  }, []);

  const fetchIdeas = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/api/ideas/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIdeas(res.data);
    } catch (err) {
      setError('Failed to fetch ideas. Please try again.');
      console.error(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchUserIdeas = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/ideas/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserIdeas(res.data);
    } catch (err) {
      setError('Failed to fetch your ideas. Please try again.');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      await api.post('/api/ideas', { title, description }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTitle('');
      setDescription('');
      await fetchIdeas();
      await fetchUserIdeas();
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
      <div className="max-w-4xl mx-auto pt-20">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-purple-500 p-4">
            <h2 className="text-xl font-bold text-white">Submit Idea</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Idea'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default IdeaBank;