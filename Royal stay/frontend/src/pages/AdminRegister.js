// src/pages/AdminRegister.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 // Make sure this CSS is linked for styling
import Navbar from '../components/Navbar'; // Import Navbar
import '../AdminLogin.css';

function AdminRegister() {
  const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState(''); // State for messages
  const [messageType, setMessageType] = useState('danger'); // Type of message (success/danger)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (credentials.password !== credentials.confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('danger');
      return;
    }

    try {
      const { username, password } = credentials; // Destructure to exclude confirmPassword for API
      const res = await fetch('http://localhost:5000/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 201) { // 201 Created for successful registration
        setMessage(data.message || 'Registration successful! You can now log in.');
        setMessageType('success');
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
        setMessageType('danger');
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage('An error occurred during registration. Please try again.');
      setMessageType('danger');
    }
  };

  return (
    // Use the same overall admin-dashboard-layout for consistent Navbar positioning
    <div className="admin-dashboard-layout d-flex flex-column min-vh-100">
      {/* Navbar is now at the top level of the layout, and we pass the prop to hide auth buttons */}
      <Navbar hideAuthButtons={true} /> {/* <-- IMPORTANT: PASS THIS PROP */}

      {/* This div replaces the sidebar part for the register page and centers the content */}
      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
        <div className="admin-register-card shadow-lg rounded-3 p-4">
          <h2 className="section-title text-center mb-4">Admin Register</h2>
          <p className="section-subtitle text-center mb-4">Create a new RoyalStay Admin account</p>

          {message && (
            <div className={`alert alert-${messageType} alert-dismissible fade show register-alert`} role="alert">
              {message}
              <button type="button" className="btn-close" onClick={() => setMessage('')} aria-label="Close"></button>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="registerUsername" className="form-label">Username</label>
              <input
                id="registerUsername"
                name="username"
                className="form-control"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label">Password</label>
              <input
                id="registerPassword"
                name="password"
                type="password"
                className="form-control"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 login-submit-btn">Register</button>
          </form>

          <div className="text-center mt-4">
            <p>Already have an account? <Link to="/admin/login" className="register-link">Login Here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;