// src/pages/AdminLogin.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../AdminLogin.css';
import Navbar from '../components/Navbar'; // Import Navbar

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        setMessage(data.message || 'Login successful!');
        setMessageType('success');
        setTimeout(() => {
          navigate('/admin/rooms');
        }, 1500);
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
        setMessageType('danger');
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage('An error occurred during login. Please try again.');
      setMessageType('danger');
    }
  };

  return (
    // Use the same overall admin-dashboard-layout
    <div className="admin-dashboard-layout d-flex flex-column min-vh-100">
      {/* Navbar is now at the top level of the layout */}
      <Navbar hideAuthButtons={true} />

      {/* This div replaces the sidebar part for the login page, allowing the main content to be flex */}
      <div className="d-flex flex-grow-1">
        {/* No Sidebar for login page, but we keep a flex container */}
        {/* This div will act as the main content area for the login card, applying centering */}
        <div className="admin-main-content flex-grow-1 login-content-area d-flex align-items-center justify-content-center"> {/* NEW CLASSES HERE */}
          <div className="admin-login-card shadow-lg rounded-3 p-4">
            <h2 className="section-title text-center mb-4">Admin Login</h2>
            <p className="section-subtitle text-center mb-4">Access your RoyalStay Admin Dashboard</p>

            {message && (
              <div className={`alert alert-${messageType} alert-dismissible fade show login-alert`} role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setMessage('')} aria-label="Close"></button>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  id="username"
                  name="username"
                  className="form-control"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 login-submit-btn">Login</button>
            </form>

            <div className="text-center mt-4">
              <p>Don't have an account? <Link to="/admin/register" className="register-link">Register Here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;