import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { bookApi } from '../api/bookApi';
import BookCard from '../components/BookCard';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, categoryFilter, pagination.currentPage]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 12,
        ...(searchTerm && { search: searchTerm }),
        ...(categoryFilter && { category: categoryFilter })
      };
      
      const data = await bookApi.getAllBooks(params);
      setBooks(data.books || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        total: data.total || 0
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = () => {
    setEditingBook(null);
    reset();
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    reset(book);
    setShowModal(true);
  };

  const handleDeleteBook = async (book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await bookApi.deleteBook(book._id);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Failed to delete book');
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingBook) {
        await bookApi.updateBook(editingBook._id, data);
        toast.success('Book updated successfully');
      } else {
        await bookApi.createBook(data);
        toast.success('Book created successfully');
      }
      setShowModal(false);
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error(editingBook ? 'Failed to update book' : 'Failed to create book');
    }
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const categories = [...new Set(books.map(book => book.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Books</h1>
        <button onClick={handleAddBook} className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Book</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            Total: {pagination.total} books
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
                userRole="admin"
              />
            ))}
          </div>

          {books.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No books found</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center space-x-2">
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
        </>
      )}

      {/* Add/Edit Book Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingBook ? 'Edit Book' : 'Add New Book'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className="input-field"
                    placeholder="Enter book title"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                  </label>
                  <input
                    {...register('author', { required: 'Author is required' })}
                    className="input-field"
                    placeholder="Enter author name"
                  />
                  {errors.author && (
                    <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <input
                    {...register('category', { required: 'Category is required' })}
                    className="input-field"
                    placeholder="Enter category"
                  />
                  {errors.category && (
                    <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN *
                  </label>
                  <input
                    {...register('isbn', { required: 'ISBN is required' })}
                    className="input-field"
                    placeholder="Enter ISBN"
                  />
                  {errors.isbn && (
                    <p className="text-red-600 text-sm mt-1">{errors.isbn.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Copies *
                    </label>
                    <input
                      {...register('totalCopies', {
                        required: 'Total copies is required',
                        min: { value: 1, message: 'Must be at least 1' }
                      })}
                      type="number"
                      className="input-field"
                      placeholder="1"
                    />
                    {errors.totalCopies && (
                      <p className="text-red-600 text-sm mt-1">{errors.totalCopies.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Copies *
                    </label>
                    <input
                      {...register('copiesAvailable', {
                        required: 'Available copies is required',
                        min: { value: 0, message: 'Cannot be negative' }
                      })}
                      type="number"
                      className="input-field"
                      placeholder="1"
                    />
                    {errors.copiesAvailable && (
                      <p className="text-red-600 text-sm mt-1">{errors.copiesAvailable.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published Year
                  </label>
                  <input
                    {...register('publishedYear', {
                      min: { value: 1000, message: 'Invalid year' },
                      max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
                    })}
                    type="number"
                    className="input-field"
                    placeholder="2023"
                  />
                  {errors.publishedYear && (
                    <p className="text-red-600 text-sm mt-1">{errors.publishedYear.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    className="input-field"
                    rows="3"
                    placeholder="Enter book description"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingBook ? 'Update Book' : 'Add Book'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
