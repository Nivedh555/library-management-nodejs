import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Shield className="mx-auto h-24 w-24 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-500">
            This page requires specific permissions that your account doesn't have.
            Please contact an administrator if you believe this is an error.
          </p>
          
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go to Dashboard</span>
            </Link>
            
            <Link
              to="/login"
              className="btn-secondary"
            >
              Login with Different Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
