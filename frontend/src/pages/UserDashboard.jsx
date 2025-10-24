import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { borrowApi } from '../api/borrowApi';
import { useAuth } from '../context/AuthContext';
import { BookMarked, Clock, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const [borrows, setBorrows] = useState([]);
  const [stats, setStats] = useState({
    activeBorrows: 0,
    overdueBorrows: 0,
    totalBorrows: 0,
    totalFines: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [borrowsData, activeBorrowsData] = await Promise.all([
        borrowApi.getUserBorrows({ limit: 5 }),
        borrowApi.getUserBorrows({ status: 'borrowed' })
      ]);

      setBorrows(borrowsData.borrows || []);
      
      const allBorrows = borrowsData.borrows || [];
      const activeBorrows = allBorrows.filter(b => b.status === 'borrowed' || b.status === 'overdue');
      const overdueBorrows = allBorrows.filter(b => b.status === 'overdue');
      const totalFines = allBorrows.reduce((sum, b) => sum + (b.fine || 0), 0);

      setStats({
        activeBorrows: activeBorrows.length,
        overdueBorrows: overdueBorrows.length,
        totalBorrows: allBorrows.length,
        totalFines
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle, link }) => (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {link && (
          <Link to={link} className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View All →
          </Link>
        )}
      </div>
    </div>
  );

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'borrowed':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Here's your library activity overview</p>
        </div>
        <Link to="/user/browse-books" className="btn-primary">
          Browse Books
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Currently Borrowed"
          value={stats.activeBorrows}
          icon={BookMarked}
          color="bg-blue-500"
          subtitle="Active borrows"
          link="/user/borrowed-books"
        />
        <StatCard
          title="Overdue Books"
          value={stats.overdueBorrows}
          icon={AlertTriangle}
          color="bg-red-500"
          subtitle={stats.overdueBorrows > 0 ? "Return ASAP" : "All good!"}
        />
        <StatCard
          title="Total Borrowed"
          value={stats.totalBorrows}
          icon={TrendingUp}
          color="bg-green-500"
          subtitle="All time"
          link="/user/history"
        />
        <StatCard
          title="Total Fines"
          value={`$${stats.totalFines}`}
          icon={Clock}
          color="bg-yellow-500"
          subtitle={stats.totalFines > 0 ? "Outstanding" : "No fines"}
        />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/user/browse-books"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <BookMarked className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Browse Books</h4>
                <p className="text-sm text-gray-600">Find your next read</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/user/borrowed-books"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">My Books</h4>
                <p className="text-sm text-gray-600">Manage borrowed books</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/user/history"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">History</h4>
                <p className="text-sm text-gray-600">View borrowing history</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <Link to="/user/history" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View All →
          </Link>
        </div>
        
        {borrows.length > 0 ? (
          <div className="space-y-4">
            {borrows.slice(0, 5).map((borrow) => (
              <div key={borrow._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BookMarked className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{borrow.bookId?.title || 'Unknown Book'}</h4>
                    <p className="text-sm text-gray-600">{borrow.bookId?.author || 'Unknown Author'}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}
                      </span>
                      {borrow.status !== 'returned' && (
                        <span className="text-xs text-gray-500">
                          Due: {new Date(borrow.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(borrow.status)}`}>
                    {borrow.status}
                  </span>
                  {borrow.status !== 'returned' && (
                    <div className="text-right">
                      {getDaysUntilDue(borrow.dueDate) > 0 ? (
                        <span className="text-sm text-green-600">
                          {getDaysUntilDue(borrow.dueDate)} days left
                        </span>
                      ) : (
                        <span className="text-sm text-red-600">
                          {Math.abs(getDaysUntilDue(borrow.dueDate))} days overdue
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookMarked className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No borrowing activity yet</p>
            <Link to="/user/browse-books" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Browse books to get started →
            </Link>
          </div>
        )}
      </div>

      {/* Overdue Alert */}
      {stats.overdueBorrows > 0 && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">
                You have {stats.overdueBorrows} overdue book{stats.overdueBorrows > 1 ? 's' : ''}
              </h3>
              <p className="text-red-700">
                Please return them as soon as possible to avoid additional fines.
              </p>
              <Link
                to="/user/borrowed-books"
                className="inline-block mt-2 text-red-600 hover:text-red-800 font-medium"
              >
                View overdue books →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
