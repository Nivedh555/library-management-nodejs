import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { borrowApi } from '../api/borrowApi';
import { Calendar, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';

const BorrowedBooks = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returning, setReturning] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchBorrowedBooks();
  }, [statusFilter]);

  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true);
      const params = {
        limit: 50,
        ...(statusFilter && { status: statusFilter })
      };
      
      const data = await borrowApi.getUserBorrows(params);
      setBorrows(data.borrows || []);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
      toast.error('Failed to fetch borrowed books');
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      setReturning(bookId);
      const result = await borrowApi.returnBook(bookId);
      
      if (result.fine > 0) {
        toast.warning(`Book returned successfully! Fine: $${result.fine}`);
      } else {
        toast.success('Book returned successfully!');
      }
      
      fetchBorrowedBooks();
    } catch (error) {
      console.error('Error returning book:', error);
      toast.error(error.response?.data?.message || 'Failed to return book');
    } finally {
      setReturning(null);
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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

  const getDueDateColor = (dueDate, status) => {
    if (status === 'returned') return 'text-gray-500';
    
    const daysLeft = getDaysUntilDue(dueDate);
    if (daysLeft < 0) return 'text-red-600';
    if (daysLeft <= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const activeBorrows = borrows.filter(b => b.status === 'borrowed' || b.status === 'overdue');
  const overdueBorrows = borrows.filter(b => b.status === 'overdue');
  const totalFines = borrows.reduce((sum, b) => sum + (b.fine || 0), 0);

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
        <h1 className="text-3xl font-bold text-gray-900">My Borrowed Books</h1>
        <div className="text-sm text-gray-600">
          {activeBorrows.length} active borrows
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Borrows</p>
              <p className="text-2xl font-bold text-gray-900">{activeBorrows.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdueBorrows.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Fines</p>
              <p className="text-2xl font-bold text-gray-900">${totalFines}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-auto"
          >
            <option value="">All</option>
            <option value="borrowed">Borrowed</option>
            <option value="overdue">Overdue</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Overdue Alert */}
      {overdueBorrows.length > 0 && !statusFilter && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">
                You have {overdueBorrows.length} overdue book{overdueBorrows.length > 1 ? 's' : ''}
              </h3>
              <p className="text-red-700">
                Please return them as soon as possible to avoid additional fines.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Books List */}
      <div className="space-y-4">
        {borrows.map((borrow) => (
          <div key={borrow._id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 bg-primary-100 rounded-lg flex items-center justify-center">
                    <div className="text-primary-600 font-bold text-lg">
                      {borrow.bookId?.title?.charAt(0) || 'B'}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {borrow.bookId?.title || 'Unknown Book'}
                  </h3>
                  <p className="text-gray-600">{borrow.bookId?.author || 'Unknown Author'}</p>
                  <p className="text-sm text-gray-500">
                    Category: {borrow.bookId?.category || 'Unknown'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Borrowed</p>
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Due Date</p>
                  <div className={`flex items-center text-sm font-medium ${getDueDateColor(borrow.dueDate, borrow.status)}`}>
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(borrow.dueDate).toLocaleDateString()}
                  </div>
                  {borrow.status !== 'returned' && (
                    <p className={`text-xs ${getDueDateColor(borrow.dueDate, borrow.status)}`}>
                      {getDaysUntilDue(borrow.dueDate) > 0
                        ? `${getDaysUntilDue(borrow.dueDate)} days left`
                        : `${Math.abs(getDaysUntilDue(borrow.dueDate))} days overdue`
                      }
                    </p>
                  )}
                </div>

                {borrow.returnDate && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Returned</p>
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(borrow.returnDate).toLocaleDateString()}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="flex items-center justify-center">
                    {getStatusIcon(borrow.status)}
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(borrow.status)}`}>
                      {borrow.status}
                    </span>
                  </div>
                </div>

                {borrow.fine > 0 && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Fine</p>
                    <p className="text-lg font-bold text-red-600">${borrow.fine}</p>
                  </div>
                )}

                {borrow.status !== 'returned' && (
                  <div className="relative">
                    <button
                      onClick={() => handleReturnBook(borrow.bookId._id)}
                      disabled={returning === borrow.bookId._id}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {returning === borrow.bookId._id ? 'Returning...' : 'Return Book'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {borrows.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {statusFilter ? `No ${statusFilter} books found` : 'No borrowed books'}
          </h3>
          <p className="text-gray-500 mb-4">
            {statusFilter ? 'Try changing the filter' : "You haven't borrowed any books yet"}
          </p>
          {!statusFilter && (
            <a href="/user/browse-books" className="btn-primary">
              Browse Books
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
