import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './utils/UserContext'; 
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import IdeaBank from './components/IdeaBank';
import Dashboard from './components/Dashboard';
import SubmitIdea from './components/SubmitIdea';
import FindIdeas from './components/FindIdeas';
import UserSearch from './components/UserSearch';
import YourIdeas from './components/YourIdeas'

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/ideas" element={<IdeaBank />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit-idea" element={<SubmitIdea />} />
      <Route path="/find-ideas" element={<FindIdeas />} />
      <Route path="/your-ideas" element={<YourIdeas />} />
      <Route path="/user-search" element={<UserSearch />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
