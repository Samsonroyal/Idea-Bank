import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="">
      <Navbar />
      <div className="container mt-16 text-center p-8">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          <Card
            title="Submit Idea"
            description="Submit a new idea to the platform."
            onClick={() => handleNavigate('/ideas')}
          />
          <Card
            title="Your Submitted Ideas"
            description="View all the ideas you have submitted."
            onClick={() => handleNavigate('/ideas')}
          />
          <Card
            title="Search Ideas"
            description="Search for ideas submitted by others."
            onClick={() => handleNavigate('/find-ideas')}
          />
          <Card
            title="User Search"
            description="Search for other users on the platform."
            onClick={() => handleNavigate('/user-search')}
          />
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, description, onClick }) => (
  <div
    className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-blue-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    onClick={onClick}
  >
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Dashboard;
