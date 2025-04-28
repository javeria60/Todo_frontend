import React, { useState, useEffect } from 'react';
import './app.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import Signup from './components/Signup';
import Login from './components/login';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <div className="app_container">
      <h1>Todo App</h1>

      <Routes>
        <Route path="/" element={isLoggedIn ? <TodoApp setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
