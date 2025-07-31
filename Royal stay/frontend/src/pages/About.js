// src/pages/About.js
import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';

// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faClock, faTabletAlt, faLightbulb, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';

// Import the specific CSS for this page
import '../About.css';

export default function About() {
  return (
    <>
      <HomeNavbar />

      {/* About Hero Section */}
      <section className="about-hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="about-hero-title animate__animated animate__fadeInDown">Discover RoyalStay</h1>
          <p className="about-hero-subtitle animate__animated animate__fadeInUp animate__delay-0.5s">
            Your journey to exceptional comfort and modern hospitality begins here.
          </p>
        </div>
      </section>

      <div className="container mt-5 mb-5">
        <div className="text-center mb-5 section-wrapper">
          <h2 className="section-title">About RoyalStay Hotel</h2>
          <p className="section-subtitle">
            Where comfort meets convenience – RoyalStay offers a modern hotel experience with advanced digital management.
          </p>
        </div>

        {/* Mission & Vision Section with Illustration */}
        <section className="row g-5 align-items-center py-5 about-mission-vision">
          <div className="col-md-6 order-md-2 text-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1661938258255-ac0c52834c10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8"
              alt="Mission and Vision Illustration"
              className="img-fluid rounded-3 shadow-lg animate__animated animate__zoomIn"
            />
          </div>
          <div className="col-md-6 order-md-1">
            {/* Changed className here */}
            <h3 className="about-heading mb-3"><FontAwesomeIcon icon={faLightbulb} className="me-2 icon-themed-dark" />Our Mission</h3>
            <p className="about-text">
              Our goal is to provide seamless and luxurious accommodation by combining comfort, service, and technology.
              We strive to offer every guest a personalized and stress-free stay, setting new standards in hospitality.
            </p>
            {/* Changed className here */}
            <h3 className="about-heading mt-4 mb-3"><FontAwesomeIcon icon={faStar} className="me-2 icon-themed-dark" />Our Vision</h3>
            <p className="about-text">
              We envision RoyalStay Hotel as a top choice for travelers and a model of smart hospitality solutions in the region,
              constantly innovating to enhance guest experiences and operational efficiency.
            </p>
          </div>
        </section>

        {/* Key Highlights Section with Icons */}
        <div className="text-center mt-5 mb-5 section-wrapper">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">
                Experience the RoyalStay difference with our commitment to excellence and innovation.
            </p>
        </div>

        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card custom-about-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp">
              <div className="card-body">
                {/* Changed className here */}
                <FontAwesomeIcon icon={faHotel} size="3x" className="icon-large mb-3 icon-themed-dark" />
                <h5 className="card-title">50+ Modern Rooms</h5>
                <p className="card-text">Fully equipped, clean, and tech-enabled rooms for every guest's comfort.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-about-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-0.2s">
              <div className="card-body">
                {/* Changed className here */}
                <FontAwesomeIcon icon={faClock} size="3x" className="icon-large mb-3 icon-themed-dark" />
                <h5 className="card-title">24/7 Booking System</h5>
                <p className="card-text">Instant bookings, confirmations, and availability tracking – anytime, anywhere.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-about-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-0.4s">
              <div className="card-body">
                {/* Changed className here */}
                <FontAwesomeIcon icon={faTabletAlt} size="3x" className="icon-large mb-3 icon-themed-dark" />
                <h5 className="card-title">Smart Admin Panel</h5>
                <p className="card-text">Manage rooms, handle bookings, and view analytics easily in one centralized place.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team/Values Section (Optional, can expand here) */}
        <section className="row g-5 align-items-center py-5 about-values-team">
          <div className="col-md-6 text-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1661936487321-9db456b6813d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
              alt="Our Values Illustration"
              className="img-fluid rounded-3 shadow-lg animate__animated animate__zoomIn animate__delay-0.3s"
            />
          </div>
          <div className="col-md-6">
            {/* Changed className here */}
            <h3 className="about-heading mb-3"><FontAwesomeIcon icon={faUsers} className="me-2 icon-themed-dark" />Our Values</h3>
            <p className="about-text">
              At RoyalStay, we uphold values of integrity, guest satisfaction, innovation, and continuous improvement.
              Our dedicated team is committed to making your stay memorable and comfortable.
            </p>
            <p className="about-text">
              We believe in fostering a culture of excellence and personalized service that sets us apart.
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}