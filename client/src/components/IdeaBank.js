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
    try {
      const res = await axios.get('/api/ideas');
      setIdeas(res.data);
    } catch (err) {
      setError('Failed to fetch ideas. Please try again.');
      console.error(err);
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
      await axios.post('/api/ideas', { title, description }, {
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-green-500 p-4">
            <h2 className="text-xl font-bold text-white">Your Ideas</h2>
          </div>
          <div className="p-6">
            {userIdeas.length > 0 ? (
              <ul className="space-y-4">
                {userIdeas.map(idea => (
                  <li key={idea._id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{idea.title}</h3>
                    <p className="text-gray-600">{idea.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">You haven't submitted any ideas yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-purple-500 p-4">
            <h2 className="text-xl font-bold text-white">All Ideas</h2>
          </div>
          <div className="p-6">
            {ideas.length > 0 ? (
              <ul className="space-y-4">
                {ideas.map(idea => (
                  <li key={idea._id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 mb-2">{idea.description}</p>
                    <p className="text-sm text-gray-500">Submitted by: {idea.user.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No ideas have been submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdeaBank;