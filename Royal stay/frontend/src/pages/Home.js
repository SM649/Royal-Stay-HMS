import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <>
      <HomeNavbar />

      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center">
        <div className="container text-center">
          <h1 className="hero-title">Welcome to RoyalStay Hotel</h1>
          <p className="hero-subtitle">
            Your trusted solution for managing rooms, bookings, and performance.
          </p>
          <Link to="/booking" className="btn primary-btn mt-3">
            Explore Rooms
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Choose RoyalStay?</h2>
            <p className="section-subtitle">Everything you need to run a smart hotel experience</p>
          </div>

          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card custom-card">
                <div className="card-body">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3176/3176298.png"
                    alt="Room"
                    width="70"
                    
                  />
                  <h5 className="card-title">Room Management</h5>
                  <p className="card-text">Add, edit, and manage hotel rooms with real-time updates.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card custom-card">
                <div className="card-body">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                    alt="Booking"
                    width="70"
                    
                  />
                  <h5 className="card-title">Booking Requests</h5>
                  <p className="card-text">Easily confirm or decline booking requests via the dashboard.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card custom-card">
                <div className="card-body">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                    alt="Analytics"
                    width="70"
                    
                  />
                  <h5 className="card-title">Analytics Dashboard</h5>
                  <p className="card-text">Track rooms, bookings, and availability all in one place.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center">
        <div className="container">
          <h3 className="cta-title">Ready to Get Started?</h3>
          <p className="cta-subtitle">Learn about Us or explore room listings now.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/about" className="btn dark-btn">
              More About Us
            </Link>
            <Link to="/booking" className="btn outline-dark-btn">
              View Rooms
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
