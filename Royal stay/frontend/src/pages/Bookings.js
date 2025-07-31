// src/pages/Bookings.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faFilter, faCheckCircle, faTrashAlt, faSpinner, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'; // <-- ADD THESE ICONS

// Import the specific CSS for this page
import '../Bookings.css'; // <-- ADD THIS LINE

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchCnic, setSearchCnic] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const fetchBookings = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await fetch('http://localhost:5000/bookings');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setBookings(data);
      setFilteredBookings(data); // initial display
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setMessage('Failed to fetch bookings. Please try again.');
      setMessageType('danger');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter logic runs whenever inputs change
  useEffect(() => {
    let filtered = bookings;

    if (searchCnic.trim() !== '') {
      filtered = filtered.filter(booking =>
        booking.cnic.toLowerCase().includes(searchCnic.toLowerCase()) ||
        booking.user.toLowerCase().includes(searchCnic.toLowerCase()) // Also allow search by user name
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchCnic, statusFilter, bookings]);

  const handleConfirmBooking = async (room_number, user, cnic) => { // Added cnic for clarity/potential future use
    setMessage(''); // Clear previous messages
    try {
      const res = await fetch('http://localhost:5000/bookings/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_number, user, cnic }), // Pass cnic if your backend expects it for confirmation
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to confirm booking.');
      }
      setMessage(data.message);
      setMessageType('success');
      fetchBookings();
    } catch (error) {
      console.error("Error confirming booking:", error);
      setMessage(error.message || 'An error occurred while confirming the booking.');
      setMessageType('danger');
    }
  };

  const handleDeleteBooking = async (room_number, user, cnic) => { // Added cnic
    if (!window.confirm(`Are you sure you want to delete booking for Room ${room_number} by ${user}?`)) {
      return;
    }
    setMessage(''); // Clear previous messages
    try {
      const res = await fetch(`http://localhost:5000/bookings`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_number, user, cnic }), // Pass cnic if your backend expects it for deletion
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete booking.');
      }
      setMessage(data.message);
      setMessageType('success');
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      setMessage(error.message || 'An error occurred while deleting the booking.');
      setMessageType('danger');
    }
  };

  return (
    // Added admin-dashboard-layout for consistent overall structure
    <div className="admin-dashboard-layout d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        {/* Added admin-main-content and bookings-content-wrapper for styling consistency */}
        <div className="admin-main-content flex-grow-1 bookings-content-wrapper">
          <div className="bookings-page"> {/* Container for specific page content */}
            <h2 className="section-title2">All Booking Requests</h2> {/* Re-using section-title */}
            <p className="section-subtitle mb-4">Manage and monitor all room booking requests for RoyalStay Hotel.</p>

            {message && (
              <div className={`alert alert-${messageType} alert-dismissible fade show room-alert`} role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setMessage('')} aria-label="Close"></button>
              </div>
            )}

            {/* Filters Section - styled as a card */}
            <div className="booking-filters-card shadow-sm rounded-3 p-4 mb-4">
                <div className="row g-3 align-items-center">
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by CNIC or User Name..."
                                value={searchCnic}
                                onChange={(e) => setSearchCnic(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faFilter} /></span>
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primary" />
                <p className="mt-3">Loading bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-5 no-bookings-found">
                <p className="lead">No matching booking requests found.</p>
                <p className="text-muted">Adjust your search or filters.</p>
              </div>
            ) : (
              <div className="table-responsive booking-table-responsive shadow-sm rounded-3">
                <table className="table custom-booking-table align-middle caption-top">
                  <caption>List of all booking requests</caption>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>CNIC</th>
                      <th>Phone</th>
                      <th>Room No</th>
                      
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><span className="booking-user-text">{booking.user}</span></td>
                        <td><span className="booking-cnic-text">{booking.cnic}</span></td>
                        <td><span className="booking-phone-text">{booking.phone}</span></td>
                        <td><span className="booking-room-text">{booking.room_number}</span></td>
                        
                        <td>
                          <span className={`badge booking-status-badge badge-${booking.status}`}>
                            <FontAwesomeIcon icon={booking.status === 'confirmed' ? faCheckCircle : faTimesCircle} className="me-1" />
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            {booking.status === 'pending' && (
                              <button
                                className="btn btn-sm btn-confirm-booking action-btn me-2"
                                onClick={() => handleConfirmBooking(booking.room_number, booking.user, booking.cnic)}
                                title="Confirm Booking"
                              >
                                <FontAwesomeIcon icon={faCheckCircle} />
                              </button>
                            )}
                            <button
                              className="btn btn-sm btn-delete-booking action-btn"
                              onClick={() => handleDeleteBooking(booking.room_number, booking.user, booking.cnic)}
                              title="Delete Booking"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;