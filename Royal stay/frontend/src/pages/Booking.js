import React, { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';

export default function Booking() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Form inputs
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [days, setDays] = useState(1);
  const [message, setMessage] = useState('');

  // Fetch available rooms from backend
  const fetchAvailableRooms = async () => {
    try {
      const res = await fetch('http://localhost:5000/rooms');
      const data = await res.json();
      const available = data.filter(room => room.availability === true);
      setRooms(available);
    } catch (err) {
      console.error('Failed to fetch rooms', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  // Handle booking form submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !phone || !cnic || !days) {
      setMessage("Please fill all fields.");
      return;
    }

    const bookingData = {
      room_number: selectedRoom.room_number,
      user: customerName,
      phone,
      cnic,
      days
    };

    try {
      const res = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();
      setMessage(data.message || 'Booking request sent. Your Booking will be confirmed soon through given contact details.');
      setShowModal(false);
      fetchAvailableRooms();
    } catch (err) {
      console.error('Booking error:', err);
      setMessage('Something went wrong!');
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Book Your Stay</h2>

        {message && <div className="alert alert-info">{message}</div>}

        {loading ? (
          <p className="text-center">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="text-danger text-center">No rooms available.</p>
        ) : (
          <div className="row">
            {rooms.map((room, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow-sm h-100">
                  {room.image && (
                    <img src={room.image} className="card-img-top" style={{ height: 200, objectFit: 'cover' }} />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5>Room #{room.room_number}</h5>
                    <p>Type: {room.type}</p>
                    <p>Price: Rs. {room.price} / night</p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowModal(true);
                      }}
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Modal */}
      {showModal && selectedRoom && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Room #{selectedRoom.room_number}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleBookingSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Customer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CNIC Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Days of Stay</label>
                    <input
                      type="number"
                      min={1}
                      className="form-control"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Submit Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
