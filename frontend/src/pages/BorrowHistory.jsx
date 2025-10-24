import React, { useState, useEffect } from 'react';
import { borrowApi } from '../api/borrowApi';
import { Calendar, Book, Clock, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';

const BorrowHistory = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [stats, setStats] = useState({
    totalBorrows: 0,
    totalReturned: 0,
    totalFines: 0,
    averageBorrowDays: 0
  });

  useEffect(() => {
    fetchBorrowHistory();
  }, [pagination.currentPage]);

  const fetchBorrowHistory = async () => {
    try {
      setLoading(true);
      const data = await borrowApi.getUserBorrows({
        page: pagination.currentPage,
        limit: 10
      });
      
      setBorrows(data.borrows || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0
      });

      // Calculate stats
      const allBorrows = data.borrows || [];
      const returned = allBorrows.filter(b => b.status === 'returned');
      const totalFines = allBorrows.reduce((sum, b) => sum + (b.fine || 0), 0);
      
      let totalDays = 0;
      returned.forEach(borrow => {
        if (borrow.returnDate) {
          const borrowDate = new Date(borrow.borrowDate);
          const returnDate = new Date(borrow.returnDate);
          const days = Math.ceil((returnDate - borrowDate) / (1000 * 60 * 60 * 24));
          totalDays += days;
        }
      });
      
      setStats({
        totalBorrows: allBorrows.length,
        totalReturned: returned.length,
        totalFines,
        averageBorrowDays: returned.length > 0 ? Math.round(totalDays / returned.length) : 0
      });
    } catch (error) {
      console.error('Error fetching borrow history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'borrowed':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'returned':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
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

  const getBorrowDuration = (borrowDate, returnDate) => {
    if (!returnDate) return 'Ongoing';
    
    const borrow = new Date(borrowDate);
    const returned = new Date(returnDate);
    const days = Math.ceil((returned - borrow) / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? 's' : ''}`;
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
        <h1 className="text-3xl font-bold text-gray-900">Borrowing History</h1>
        <div className="text-sm text-gray-600">
          {pagination.total} total records
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Borrowed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBorrows}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Returned</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReturned}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageBorrowDays}</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Fines</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalFines}</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrow Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fine
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {borrows.map((borrow) => (
                <tr key={borrow._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {borrow.bookId?.title || 'Unknown Book'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {borrow.bookId?.author || 'Unknown Author'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {borrow.bookId?.category || 'Unknown Category'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(borrow.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow.returnDate ? (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {new Date(borrow.returnDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-gray-400">Not returned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getBorrowDuration(borrow.borrowDate, borrow.returnDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(borrow.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(borrow.status)}`}>
                        {borrow.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {borrow.fine > 0 ? (
                      <span className="text-red-600 font-medium">${borrow.fine}</span>
                    ) : (
                      <span className="text-gray-400">$0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {borrows.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No borrowing history</h3>
            <p className="text-gray-500 mb-4">You haven't borrowed any books yet</p>
            <a href="/user/browse-books" className="btn-primary">
              Browse Books
            </a>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let page;
              if (pagination.totalPages <= 5) {
                page = i + 1;
              } else if (pagination.currentPage <= 3) {
                page = i + 1;
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                page = pagination.totalPages - 4 + i;
              } else {
                page = pagination.currentPage - 2 + i;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-md ${
                    page === pagination.currentPage
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Reading Insights */}
      {stats.totalBorrows > 0 && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reading Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Reading Habits</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You've borrowed {stats.totalBorrows} books in total</li>
                <li>• {stats.totalReturned} books returned successfully</li>
                <li>• Average borrowing duration: {stats.averageBorrowDays} days</li>
                {stats.totalFines > 0 && (
                  <li>• Total fines paid: ${stats.totalFines}</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Return books on time to avoid fines</li>
                <li>• You can borrow up to 5 books at once</li>
                <li>• Check due dates regularly</li>
                <li>• Explore different categories</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;
