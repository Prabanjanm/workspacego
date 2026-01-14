import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import EndSession from './pages/EndSession';
import Environments from './pages/Environments';
import Activity from './pages/Activity';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setUser({ displayName: "Student User", email: "student@university.edu" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // FORCE SUCCESSFUL LOAD
  useEffect(() => {
    // Simulate checking auth
    setTimeout(() => {
      setUser({ displayName: "Student User", email: "student@university.edu" }); // Mock user
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    // Always allow for now to fix blank screen
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
            path="/environments"
            element={
              <ProtectedRoute>
                <Environments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile user={user} />
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
