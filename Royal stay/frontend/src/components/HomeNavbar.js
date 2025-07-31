// src/components/HomeNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // REMOVE THIS LINE

export default function HomeNavbar() {
  return (
    <nav className="custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Link className="navbar-brand text-white fw-bold fs-4" to="/">
          RoyalStay
        </Link>

        {/* Hamburger Menu Icon (for mobile) */}
        <input type="checkbox" id="nav-toggle" className="d-none" />
        <label htmlFor="nav-toggle" className="menu-icon">&#9776;</label>

        {/* Navigation Links */}
        {/* Removed absolute positioning for better responsiveness control */}
        <div className="nav-links-wrapper d-none d-md-flex justify-content-center flex-grow-1">
        <ul className="nav-links d-flex mb-0 gap-4">
          <li><Link className="nav-link" to="/booking">Booking</Link></li>
          <li><Link className="nav-link" to="/about">About Us</Link></li>
          <li><Link className="nav-link" to="/contact">Contact Us</Link></li>
        </ul> </div>
      </div>
    </nav>
  );
}