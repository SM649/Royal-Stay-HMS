// src/components/Navbar.js (This is the Admin Navbar)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assuming you use FontAwesome
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Assuming logout icon

export default function Navbar({ hideAuthButtons }) { // Prop is correctly accepted
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login'); // Use navigate for cleaner routing
  };

  // Check if admin is logged in (for displaying logout button on other pages)
  // This check is relevant *only if* hideAuthButtons is false.
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  return (
    <nav className="custom-navbar">
      <div className="container d-flex align-items-center">

        <Link className="navbar-brand text-white fw-bold fs-4 mb-0 admin-navbar-brand-centered" to="/admin/dashboard">
          RoyalStay Admin Panel
        </Link>

        {/* CONDITIONAL RENDERING: Only show the Logout button if hideAuthButtons is NOT true */}
        {/* AND if the admin is actually logged in (for pages other than login/register) */}
        {!hideAuthButtons && isAdminLoggedIn && (
          <button
            className="btn btn-outline-light ms-auto custom-logout-btn"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
          </button>
        )}
      </div>
    </nav>
  );
}