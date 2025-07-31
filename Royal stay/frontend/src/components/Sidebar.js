// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHotel, // For All Rooms
  faPlusSquare, // For Add Room
  faClipboardList, // For Bookings
  faChartBar, // For Analytics
  faUsersCog // For Admin Panel title
} from '@fortawesome/free-solid-svg-icons';

// Import the specific CSS for this page
import '../AdminSidebar.css'; // This will be created in the next step

export default function Sidebar() {
    const location = useLocation(); // Hook to get current path

    return (
        // Use a custom class for the sidebar container
        <div className="admin-sidebar-container d-flex flex-column p-3">
            <h5 className="sidebar-title mb-4">
                <FontAwesomeIcon icon={faUsersCog} className="me-2" />
                Admin Panel
            </h5>
            <ul className="nav flex-column sidebar-nav-list">
                <li className="nav-item">
                    {/* Add active class based on current path */}
                    <Link
                        className={`nav-link sidebar-nav-link ${location.pathname === '/admin/rooms' ? 'active' : ''}`}
                        to="/admin/rooms"
                    >
                        <FontAwesomeIcon icon={faHotel} className="me-2" />
                        All Rooms
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link sidebar-nav-link ${location.pathname === '/admin/add-room' ? 'active' : ''}`}
                        to="/admin/add-room"
                    >
                        <FontAwesomeIcon icon={faPlusSquare} className="me-2" />
                        Add Room
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link sidebar-nav-link ${location.pathname === '/admin/bookings' ? 'active' : ''}`}
                        to="/admin/bookings"
                    >
                        <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                        Bookings
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link sidebar-nav-link ${location.pathname === '/admin/analytics' ? 'active' : ''}`}
                        to="/admin/analytics"
                    >
                        <FontAwesomeIcon icon={faChartBar} className="me-2" />
                        Analytics
                    </Link>
                </li>
            </ul>
        </div>
    );
}