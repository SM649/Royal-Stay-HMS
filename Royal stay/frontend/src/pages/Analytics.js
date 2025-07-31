// src/pages/Analytics.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCalendarCheck, faBed, faSpinner } from '@fortawesome/free-solid-svg-icons'; // <-- ADD THESE ICONS

// Import the specific CSS for this page
import '../Analytics.css'; // <-- ADD THIS LINE

function Analytics() {
  const [total, setTotal] = useState(0);
  const [booked, setBooked] = useState(0);
  const [available, setAvailable] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchRoomStats = async () => {
      setIsLoading(true); // Start loading
      try {
        const res = await fetch('http://localhost:5000/rooms');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setTotal(data.length);
        setBooked(data.filter(room => room.availability === false).length);
        setAvailable(data.filter(room => room.availability === true).length);
      } catch (error) {
        console.error("Failed to fetch room analytics:", error);
        // You might want to add a message state here for user feedback
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchRoomStats();
  }, []);

  return (
    // Added admin-dashboard-layout for consistent overall structure
    <div className="admin-dashboard-layout d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        {/* Added admin-main-content and analytics-content-wrapper for styling consistency */}
        <div className="admin-main-content flex-grow-1 analytics-content-wrapper">
          <div className="analytics-page"> {/* Container for specific page content */}
            <h2 className="section-title2">Analytics Dashboard</h2> {/* Re-using section-title */}
            <p className="section-subtitle mb-4">Overview of room statistics and availability.</p>

            {isLoading ? (
              <div className="text-center py-5">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primary" />
                <p className="mt-3">Loading analytics...</p>
              </div>
            ) : (
              <div className="row mt-4 g-4"> {/* Added g-4 for consistent gutter spacing */}
                <div className="col-md-4">
                  <div className="analytics-card total-rooms-card shadow-sm rounded-3">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h5 className="card-title">Total Rooms</h5>
                          <p className="card-text display-4 m-0">{total}</p> {/* display-4 for larger number */}
                        </div>
                        <div className="card-icon-wrapper">
                          <FontAwesomeIcon icon={faHotel} className="card-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="analytics-card booked-rooms-card shadow-sm rounded-3">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h5 className="card-title">Booked Rooms</h5>
                          <p className="card-text display-4 m-0">{booked}</p>
                        </div>
                        <div className="card-icon-wrapper">
                          <FontAwesomeIcon icon={faCalendarCheck} className="card-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="analytics-card available-rooms-card shadow-sm rounded-3">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h5 className="card-title">Available Rooms</h5>
                          <p className="card-text display-4 m-0">{available}</p>
                        </div>
                        <div className="card-icon-wrapper">
                          <FontAwesomeIcon icon={faBed} className="card-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;