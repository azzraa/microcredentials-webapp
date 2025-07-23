import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import CredentialDashboard from './pages/CredentialDashboard';
import LoginForm from './pages/LoginForm';
import CreateCredentialForm from './components/CreateCredentialForm';
import UserApplyForm from './components/UserApplyForm';
import { EvaluatorDashboard } from './components/EvaluatorDashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);

useEffect(() => {
  console.log('Token:', token);
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded role:', decoded.role);
      if (decoded.role && ['creator', 'user', 'evaluator'].includes(decoded.role)) {
        setRole(decoded.role);
      } else {
        setRole(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('JWT Decode error:', error);
      setRole(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  } else {
    setRole(null);
  }
}, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/credentials" element={<CredentialDashboard />} />

        <Route
          path="/login"
          element={!token ? <LoginForm onLogin={setToken} /> : <Navigate to={`/${role}`} replace />}
        />

        <Route
          path="/creator"
          element={token && role === 'creator' ? <CreateCredentialForm onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/user"
          element={token && role === 'user' ? <UserApplyForm onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/evaluator"
          element={token && role === 'evaluator' ? <EvaluatorDashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all: redirect unknown routes to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
