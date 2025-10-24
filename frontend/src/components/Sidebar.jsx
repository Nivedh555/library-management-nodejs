import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BookMarked,
  Search,
  History,
  Settings,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/books', icon: BookOpen, label: 'Manage Books' },
    { to: '/admin/users', icon: Users, label: 'Manage Users' },
    { to: '/admin/issued-books', icon: BookMarked, label: 'Issued Books' },
  ];

  const userLinks = [
    { to: '/user/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/user/browse-books', icon: Search, label: 'Browse Books' },
    { to: '/user/borrowed-books', icon: BookMarked, label: 'My Books' },
    { to: '/user/history', icon: History, label: 'History' },
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-16 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
