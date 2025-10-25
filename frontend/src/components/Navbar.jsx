import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const publicPages = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const isPublicPage = publicPages.some(page => location.pathname === page.path);

  return (
    <nav className="bg-white shadow-lg border-b fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') : '/home'} className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-teal-600" />
              <div>
                <span className="text-xl font-bold text-gray-900 block">
                  LibraTech Solutions
                </span>
                <span className="text-xs text-gray-600 hidden sm:block">
                  Digital Library Management
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {!user && (
              <>
                {publicPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === page.path
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                  >
                    {page.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  Login
                </Link>
              </>
            )}

            {user && (
              <>
                <div className="flex items-center space-x-2 text-gray-700 ml-4">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors px-3 py-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-teal-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!user && (
              <>
                {publicPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === page.path
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                  >
                    {page.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                >
                  Login
                </Link>
              </>
            )}

            {user && (
              <>
                <div className="px-3 py-2 text-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded-full inline-block mt-2">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
