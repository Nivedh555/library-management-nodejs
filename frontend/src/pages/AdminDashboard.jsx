import React, { useState, useEffect } from 'react';
import { bookApi } from '../api/bookApi';
import { userApi } from '../api/userApi';
import { borrowApi } from '../api/borrowApi';
import { BookOpen, Users, BookMarked, AlertTriangle, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    books: { totalBooks: 0, totalCopies: 0, availableCopies: 0, borrowedCopies: 0 },
    users: { totalUsers: 0, adminUsers: 0, regularUsers: 0 },
    borrows: { totalBorrows: 0, activeBorrows: 0, overdueBorrows: 0, returnedBorrows: 0, totalFines: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [recentBorrows, setRecentBorrows] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [bookStats, userStats, borrowStats, recentBorrowsData] = await Promise.all([
        bookApi.getBookStats(),
        userApi.getUserStats(),
        borrowApi.getBorrowStats(),
        borrowApi.getAllBorrows({ limit: 5 })
      ]);

      setStats({
        books: bookStats,
        users: userStats,
        borrows: borrowStats
      });
      setRecentBorrows(recentBorrowsData.borrows || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="card">
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
    </div>
  );

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
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={fetchDashboardData}
          className="btn-primary"
        >
          Refresh Data
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={stats.books.totalBooks}
          icon={BookOpen}
          color="bg-blue-500"
          subtitle={`${stats.books.totalCopies} total copies`}
        />
        <StatCard
          title="Total Users"
          value={stats.users.totalUsers}
          icon={Users}
          color="bg-green-500"
          subtitle={`${stats.users.adminUsers} admins, ${stats.users.regularUsers} users`}
        />
        <StatCard
          title="Active Borrows"
          value={stats.borrows.activeBorrows}
          icon={BookMarked}
          color="bg-purple-500"
          subtitle={`${stats.borrows.returnedBorrows} returned`}
        />
        <StatCard
          title="Overdue Books"
          value={stats.borrows.overdueBorrows}
          icon={AlertTriangle}
          color="bg-red-500"
          subtitle={`$${stats.borrows.totalFines} in fines`}
        />
      </div>

      {/* Book Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Availability</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Available Copies</span>
              <span className="font-semibold text-green-600">{stats.books.availableCopies}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Borrowed Copies</span>
              <span className="font-semibold text-red-600">{stats.books.borrowedCopies}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Copies</span>
              <span className="font-semibold text-gray-900">{stats.books.totalCopies}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${stats.books.totalCopies > 0 ? (stats.books.availableCopies / stats.books.totalCopies) * 100 : 0}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Borrowing Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Borrows</span>
              <span className="font-semibold">{stats.borrows.totalBorrows}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Currently Borrowed</span>
              <span className="font-semibold text-blue-600">{stats.borrows.activeBorrows}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overdue</span>
              <span className="font-semibold text-red-600">{stats.borrows.overdueBorrows}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Fines</span>
              <span className="font-semibold text-green-600">${stats.borrows.totalFines}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Borrowing Activity</h3>
        {recentBorrows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBorrows.map((borrow) => (
                  <tr key={borrow._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {borrow.userId?.name || 'Unknown User'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {borrow.bookId?.title || 'Unknown Book'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        borrow.status === 'borrowed' ? 'bg-blue-100 text-blue-800' :
                        borrow.status === 'returned' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {borrow.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent borrowing activity</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
