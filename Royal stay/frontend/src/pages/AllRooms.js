// src/pages/AllRooms.js
import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faTimesCircle, faToggleOn, faToggleOff, faTrashAlt,
  faSearch, faSortNumericUp, faSortNumericDown, faDollarSign, faFilter,
  faEdit, faEye, faSpinner, faPlusSquare
} from '@fortawesome/free-solid-svg-icons';

// Import the specific CSS for this page
import '../AllRooms.css';

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all'); // 'all', 'available', 'booked'
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/rooms');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      setMessage("Failed to load rooms. Please try again.");
      setMessageType('danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const toggleAvailability = async (room_number) => {
    setMessage(''); // Clear previous messages
    try {
      const res = await fetch('http://localhost:5000/rooms/toggle', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_number }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to toggle availability.');
      }
      setMessage(data.message);
      setMessageType('success');
      fetchRooms(); // Re-fetch rooms to update state
    } catch (error) {
      console.error("Error toggling availability:", error);
      setMessage(error.message || 'An error occurred while toggling availability.');
      setMessageType('danger');
    }
  };

  const deleteRoom = async (room_number) => {
    if (!window.confirm(`Are you sure you want to delete room ${room_number}?`)) {
      return;
    }
    setMessage(''); // Clear previous messages
    try {
      const res = await fetch(`http://localhost:5000/rooms/${room_number}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete room.');
      }
      setMessage(data.message);
      setMessageType('success');
      fetchRooms(); // Re-fetch rooms
    } catch (error) {
      console.error("Error deleting room:", error);
      setMessage(error.message || 'An error occurred while deleting the room.');
      setMessageType('danger');
    }
  };

  // Memoized and sorted/filtered rooms for display
  const filteredAndSortedRooms = useMemo(() => {
    let sortableRooms = [...rooms];

    // 1. Filter by search term
    if (searchTerm) {
      sortableRooms = sortableRooms.filter(room =>
        room.room_number.toString().includes(searchTerm) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by availability
    if (filterAvailability !== 'all') {
      const isAvailable = filterAvailability === 'available';
      sortableRooms = sortableRooms.filter(room => room.availability === isAvailable);
    }

    // 3. Sort
    if (sortConfig.key) {
      sortableRooms.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableRooms;
  }, [rooms, searchTerm, filterAvailability, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? faSortNumericUp : faSortNumericDown;
  };

  return (
    <div className="admin-dashboard-layout d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        {/* Removed 'p-4' from here. Padding will now be controlled entirely by .rooms-content-wrapper CSS */}
        <div className="admin-main-content flex-grow-1 rooms-content-wrapper">
          <div className="all-rooms-page">
            <h2 className="section-title2 mb-4">All Hotel Rooms</h2>
            <p className="section-subtitle mb-4">Manage and monitor all rooms in the RoyalStay Hotel.</p>

            {message && (
              <div className={`alert alert-${messageType} alert-dismissible fade show room-alert`} role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setMessage('')} aria-label="Close"></button>
              </div>
            )}

            <div className="room-controls-card shadow-sm rounded-3 p-4 mb-4">
                <div className="row g-3 align-items-center">
                    <div className="col-md-5">
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Room No. or Type"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faFilter} /></span>
                            <select
                                className="form-select"
                                value={filterAvailability}
                                onChange={(e) => setFilterAvailability(e.target.value)}
                            >
                                <option value="all">All Availability</option>
                                <option value="available">Available</option>
                                <option value="booked">Booked</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <Link to="/admin/add-room" className="btn btn-primary add-room-btn">
                            <FontAwesomeIcon icon={faPlusSquare} className="me-2" />
                            Add New Room
                        </Link>
                    </div>
                </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primary" />
                <p className="mt-3">Loading rooms...</p>
              </div>
            ) : filteredAndSortedRooms.length === 0 ? (
              <div className="text-center py-5 no-rooms-found">
                <p className="lead">No rooms found matching your criteria. Try adjusting your search or filters.</p>
                <Link to="/admin/add-room" className="btn btn-outline-primary mt-3">Add First Room</Link>
              </div>
            ) : (
              <div className="table-responsive room-table-responsive shadow-sm rounded-3">
                <table className="table custom-room-table align-middle caption-top">
                    <caption>List of all hotel rooms</caption>
                  <thead>
                    <tr>
                      <th onClick={() => requestSort('room_number')}>
                        Room No. <FontAwesomeIcon icon={getSortIcon('room_number')} />
                      </th>
                      <th onClick={() => requestSort('type')}>
                        Type <FontAwesomeIcon icon={getSortIcon('type')} />
                      </th>
                      <th onClick={() => requestSort('price')}>
                        Price <FontAwesomeIcon icon={faDollarSign} /> <FontAwesomeIcon icon={getSortIcon('price')} />
                      </th>
                      <th>Image</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedRooms.map((room, index) => (
                      <tr key={room.room_number || index}> {/* Use room_number as key if unique */}
                        <td><span className="room-no-badge">{room.room_number}</span></td>
                        <td><span className="room-type-text">{room.type}</span></td>
                        <td><span className="room-price-text">${room.price}</span></td>
                        <td>
                          {room.image ? (
                            <img src={room.image} alt={`Room ${room.room_number}`} className="room-thumbnail" />
                          ) : (
                            <span className="text-muted">No Image</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge availability-badge ${room.availability ? 'badge-available' : 'badge-booked'}`}>
                            <FontAwesomeIcon icon={room.availability ? faCheckCircle : faTimesCircle} className="me-1" />
                            {room.availability ? 'Available' : 'Booked'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            <button
                              className={`btn btn-sm action-btn ${room.availability ? 'btn-toggle-booked' : 'btn-toggle-available'} me-2`}
                              onClick={() => toggleAvailability(room.room_number)}
                              title={room.availability ? 'Mark as Booked' : 'Mark as Available'}
                            >
                              <FontAwesomeIcon icon={room.availability ? faToggleOn : faToggleOff} />
                            </button>
                            {/* You can add an Edit button if you implement edit functionality */}
                            {/* <Link to={`/admin/edit-room/${room.room_number}`} className="btn btn-sm btn-info action-btn me-2" title="Edit Room">
                                <FontAwesomeIcon icon={faEdit} />
                            </Link> */}
                            <button
                              className="btn btn-sm btn-danger action-btn"
                              onClick={() => deleteRoom(room.room_number)}
                              title="Delete Room"
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

export default AllRooms;