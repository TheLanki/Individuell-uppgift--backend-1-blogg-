import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Home from './components/Home';
import Login from './components/Login';
import Posts from './components/Posts';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          {isLoggedIn ? (
            <Route path="/posts" element={<Posts />} />
          ) : (
            <Route path="/posts" element={<PleaseLogIn />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

const PleaseLogIn = () => {
  return (
    <div>
      <h1>Please Log In</h1>
      <p>Please log in to view posts.</p>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default App;
