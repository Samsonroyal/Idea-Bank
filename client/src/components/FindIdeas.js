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

function FindIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [userIdeas, setUserIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdeas();
    fetchUserIdeas();
  }, []);

  const fetchIdeas = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/api/ideas');
      setIdeas(res.data);
    } catch (err) {
      setError('Failed to fetch ideas. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserIdeas = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/api/ideas/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserIdeas(res.data);
    } catch (err) {
      setError('Failed to fetch your ideas. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
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

  const filteredIdeas = ideas.filter(idea =>
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar />
      <div className="max-w-4xl mx-auto">

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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-yellow-500 p-4">
            <h2 className="text-xl font-bold text-white">Search Ideas</h2>
          </div>
          <div className="p-6">
            <input
              type="text"
              placeholder="Search ideas..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredIdeas.length > 0 ? (
              <ul className="space-y-4">
                {filteredIdeas.map(idea => (
                  <li key={idea._id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 mb-2">{idea.description}</p>
                    <p className="text-sm text-gray-500">Submitted by: {idea.user.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No matching ideas found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default FindIdeas;
