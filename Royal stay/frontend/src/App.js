import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AllRooms from './pages/AllRooms';
import AddRoom from './pages/AddRoom';
import Bookings from './pages/Bookings';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import Booking from './pages/Booking'; // (placeholder page)
import About from './pages/About';     // (placeholder)
import Contact from './pages/Contact'; // (placeholder)
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/rooms" element={<ProtectedRoute><AllRooms /></ProtectedRoute>} />
        <Route path="/admin/add-room" element={<ProtectedRoute><AddRoom /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
