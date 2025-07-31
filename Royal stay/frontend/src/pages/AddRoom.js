// src/pages/AddRoom.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// Import the specific CSS for this page
import '../AddRoom.css'; // <-- ADD THIS LINE

function AddRoom() {
  const [newRoom, setNewRoom] = useState({
    room_number: '',
    type: '',
    price: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewRoom({ ...newRoom, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const roomData = {
      ...newRoom,
      price: parseFloat(newRoom.price),
      availability: true,
    };

    try {
      const res = await fetch('http://localhost:5000/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData),
      });

      const data = await res.json();
      setMessage(data.message);
      setMessageType(res.ok ? 'success' : 'danger');

      // Clear the form only on success
      if (res.ok) {
        setNewRoom({ room_number: '', type: '', price: '', image: '' });
      }

    } catch (error) {
      console.error("Error adding room:", error);
      setMessage('Failed to add room. Please try again.');
      setMessageType('danger');
    }
  };

  return (
    // Added admin-dashboard-layout for consistent overall structure
    <div className="admin-dashboard-layout d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        {/* Added admin-main-content and add-room-content-wrapper for styling consistency */}
        <div className="admin-main-content flex-grow-1 add-room-content-wrapper">
          <div className="add-room-page"> {/* Container for specific page content */}
            <h2 className="section-title2">Add New Room</h2> {/* Re-using section-title */}
            <p className="section-subtitle mb-4">Fill out the form below to add a new room to the hotel inventory.</p>

            {message && (
              <div className={`alert alert-${messageType} alert-dismissible fade show room-alert`} role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setMessage('')} aria-label="Close"></button>
              </div>
            )}

            <div className="add-room-form-card shadow-sm rounded-3 p-4"> {/* Card for the form */}
              <form onSubmit={handleAddRoom}>
                <div className="mb-3">
                  <label htmlFor="room_number" className="form-label">Room Number</label>
                  <input
                    id="room_number"
                    name="room_number"
                    className="form-control"
                    placeholder="e.g., 101, 205"
                    value={newRoom.room_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="room_type" className="form-label">Room Type</label>
                  <select
                    id="room_type"
                    name="type"
                    className="form-select" // Changed to form-select for consistency
                    value={newRoom.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Room Type</option>
                    <option value="Standard Single">Standard Single</option>
                    <option value="VIP Single">VIP Single</option>
                    <option value="Standard Duplex">Standard Duplex</option>
                    <option value="VIP Duplex">VIP Duplex</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="room_price" className="form-label">Room Price ($)</label>
                  <input
                    id="room_price"
                    name="price"
                    type="number"
                    className="form-control"
                    placeholder="e.g., 150.00"
                    value={newRoom.price}
                    onChange={handleChange}
                    required
                    step="0.01" // Allow decimal prices
                    min="0" // Ensure positive price
                  />
                </div>

                <div className="mb-4"> {/* Increased margin for image input */}
                  <label htmlFor="room_image" className="form-label">Room Image</label>
                  <input
                    id="room_image"
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageUpload}
                  />
                  {newRoom.image && (
                    <div className="image-preview mt-3 text-center">
                      <img src={newRoom.image} alt="Room Preview" className="img-thumbnail" style={{ maxWidth: '200px', maxHeight: '150px' }} />
                      <p className="text-muted mt-2">Image Preview</p>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary add-room-submit-btn">Add Room</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;