// src/pages/Contact.js
import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';

// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Import the specific CSS for this page
import '../Contact.css'; // This will be created in the next step

export default function Contact() {
  // You might want to add state for form inputs and a submit handler later
  // For now, we'll focus on the structure and styling.

  return (
    <>
      <HomeNavbar />

      {/* Contact Hero Section */}
      <section className="contact-hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="contact-hero-title animate__animated animate__fadeInDown">Get in Touch</h1>
          <p className="contact-hero-subtitle animate__animated animate__fadeInUp animate__delay-0.5s">
            We're here to assist you with any inquiries or booking needs.
          </p>
        </div>
      </section>

      <div className="container mt-5 mb-5">
        <div className="text-center mb-5 section-wrapper">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">We’re here to assist you. Reach out anytime!</p>
        </div>

        <div className="row g-5 contact-content-row">
          {/* Contact Form */}
          <div className="col-md-6">
            <div className="contact-form-card p-4 p-md-5 rounded-3 shadow-lg h-100">
              <h4 className="form-heading mb-4">Send Us a Message</h4>
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="fullName" placeholder="Enter your name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailAddress" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="emailAddress" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="messageText" className="form-label">Message</label>
                  <textarea className="form-control" id="messageText" rows="4" placeholder="Your message..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary contact-submit-btn w-100">Send Message</button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social Media */}
          <div className="col-md-6">
            <div className="contact-info-card p-4 p-md-5 rounded-3 shadow-lg h-100">
              <h4 className="info-heading mb-4">Contact Details</h4>
              <ul className="list-unstyled contact-details-list">
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 contact-icon" />
                  <strong>Address:</strong> RoyalStay Hotel, Main Street, Islamabad, Pakistan
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} className="me-3 contact-icon" />
                  <strong>Email:</strong> support@royalstay.com
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhone} className="me-3 contact-icon" />
                  <strong>Phone:</strong> +92 300 1234567
                </li>
                <li>
                  <FontAwesomeIcon icon={faClock} className="me-3 contact-icon" />
                  <strong>Hours:</strong> Mon – Sun: 9:00 AM – 9:00 PM
                </li>
              </ul>

              <h5 className="follow-heading mt-4 mb-3">Follow Us</h5>
              <div className="social-icons">
                <a href="#" className="me-3 social-icon-link">
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="social-icon facebook-icon" />
                </a>
                <a href="#" className="me-3 social-icon-link">
                    <FontAwesomeIcon icon={faTwitter} size="2x" className="social-icon twitter-icon" />
                </a>
                <a href="#" className="social-icon-link">
                    <FontAwesomeIcon icon={faInstagram} size="2x" className="social-icon instagram-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Embedding */}
        <div className="row mt-5">
            <div className="col-12">
                <div className="map-container rounded-3 shadow-lg">
                    <h4 className="text-center mb-4 map-heading">Find Us on the Map</h4>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13295.346850448107!2d73.045679!3d33.684422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd0787e9569%3A0x946b5e022b7a9f9!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1678912345678!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="RoyalStay Hotel Location"
                    ></iframe>
                </div>
            </div>
        </div>

      </div>
      <Footer />
    </>
  );
}