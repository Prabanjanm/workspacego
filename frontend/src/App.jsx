import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import EndSession from './pages/EndSession';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple mock login function
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log('User logged in');
  };

  // Simple mock logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out, session cleared');
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/end-session"
            element={<EndSession onLogout={handleLogout} />}
          />

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
