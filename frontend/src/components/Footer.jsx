import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-semibold">Library Management System</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Library Management System. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Built with React & Node.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
