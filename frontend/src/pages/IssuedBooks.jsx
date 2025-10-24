import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { borrowApi } from '../api/borrowApi';
import { Search, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const IssuedBooks = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    fetchBorrows();
  }, [statusFilter, searchTerm, pagination.currentPage]);

  const fetchBorrows = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 10,
        ...(statusFilter && { status: statusFilter })
      };
      
      const data = await borrowApi.getAllBorrows(params);
      
      // Filter by search term on frontend since API doesn't support it
      let filteredBorrows = data.borrows || [];
      if (searchTerm) {
        filteredBorrows = filteredBorrows.filter(borrow =>
          borrow.bookId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          borrow.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          borrow.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setBorrows(filteredBorrows);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0
      });
    } catch (error) {
      console.error('Error fetching borrows:', error);
      toast.error('Failed to fetch borrowed books');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOverdue = async () => {
    try {
      await borrowApi.updateOverdueStatus();
      toast.success('Overdue status updated successfully');
      fetchBorrows();
    } catch (error) {
      console.error('Error updating overdue status:', error);
      toast.error('Failed to update overdue status');
    }
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'borrowed':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'returned':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
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

  const isOverdue = (dueDate, status) => {
    return status !== 'returned' && new Date() > new Date(dueDate);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Issued Books</h1>
        <button
          onClick={handleUpdateOverdue}
          className="btn-primary flex items-center space-x-2"
        >
          <AlertTriangle className="h-5 w-5" />
          <span>Update Overdue</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by book title, user name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="borrowed">Borrowed</option>
            <option value="overdue">Overdue</option>
            <option value="returned">Returned</option>
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            Total: {pagination.total} records
          </div>
        </div>
      </div>

      {/* Borrows Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
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
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {borrow.userId?.name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {borrow.userId?.email || 'Unknown Email'}
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
                      <div className={`flex items-center ${
                        isOverdue(borrow.dueDate, borrow.status) ? 'text-red-600' : ''
                      }`}>
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {new Date(borrow.dueDate).toLocaleDateString()}
                        {isOverdue(borrow.dueDate, borrow.status) && (
                          <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />
                        )}
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
              <p className="text-gray-500">No borrowed books found</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}
            </div>
          )}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Currently Borrowed</p>
              <p className="text-lg font-bold text-gray-900">
                {borrows.filter(b => b.status === 'borrowed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-lg font-bold text-gray-900">
                {borrows.filter(b => b.status === 'overdue').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Returned</p>
              <p className="text-lg font-bold text-gray-900">
                {borrows.filter(b => b.status === 'returned').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">$</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Fines</p>
              <p className="text-lg font-bold text-gray-900">
                ${borrows.reduce((sum, b) => sum + (b.fine || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuedBooks;
