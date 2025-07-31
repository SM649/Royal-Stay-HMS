// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;
