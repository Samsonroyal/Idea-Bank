import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-16 p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Idea Bank</h1>
        <p className="text-lg mb-8">A place where your brilliant ideas can be stored, shared, and developed. Join us and transform your ideas into reality!</p>
        <div className="space-x-4">
          <Link to="/login" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded">Sign In</Link>
          <Link to="/register" className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;