import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Features from '../pages/Features';
import Services from '../pages/Services';
import Gallery from '../pages/Gallery';
import Careers from '../pages/Careers';
import Contact from '../pages/Contact';

// Auth Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Unauthorized from '../pages/Unauthorized';

// Admin Pages
import AdminDashboard from '../pages/AdminDashboard';
import ManageBooks from '../pages/ManageBooks';
import ManageUsers from '../pages/ManageUsers';
import IssuedBooks from '../pages/IssuedBooks';

// User Pages
import UserDashboard from '../pages/UserDashboard';
import BrowseBooks from '../pages/BrowseBooks';
import BorrowedBooks from '../pages/BorrowedBooks';
import BorrowHistory from '../pages/BorrowHistory';

// Components
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} replace />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/books"
        element={
          <PrivateRoute requiredRole="admin">
            <ManageBooks />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute requiredRole="admin">
            <ManageUsers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/issued-books"
        element={
          <PrivateRoute requiredRole="admin">
            <IssuedBooks />
          </PrivateRoute>
        }
      />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={
          <PrivateRoute requiredRole="user">
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/browse-books"
        element={
          <PrivateRoute requiredRole="user">
            <BrowseBooks />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/borrowed-books"
        element={
          <PrivateRoute requiredRole="user">
            <BorrowedBooks />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/history"
        element={
          <PrivateRoute requiredRole="user">
            <BorrowHistory />
          </PrivateRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? (user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/home'} replace />} />
    </Routes>
  );
};

export default AppRoutes;
