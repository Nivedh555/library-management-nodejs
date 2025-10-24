import React from 'react';
import { Book, User, Calendar, Tag } from 'lucide-react';

const BookCard = ({ book, onBorrow, onReturn, onEdit, onDelete, showActions = true, userRole }) => {
  const isAvailable = book.copiesAvailable > 0;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {book.title}
            </h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              isAvailable 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isAvailable ? 'Available' : 'Not Available'}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm">{book.author}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Tag className="h-4 w-4 mr-2" />
              <span className="text-sm">{book.category}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Book className="h-4 w-4 mr-2" />
              <span className="text-sm">ISBN: {book.isbn}</span>
            </div>
            
            {book.publishedYear && (
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{book.publishedYear}</span>
              </div>
            )}
          </div>

          {book.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {book.description}
            </p>
          )}

          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>Available: {book.copiesAvailable}</span>
            <span>Total: {book.totalCopies}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-4 border-t">
            {userRole === 'admin' ? (
              <>
                <button
                  onClick={() => onEdit && onEdit(book)}
                  className="btn-secondary flex-1 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(book)}
                  className="btn-danger flex-1 text-sm"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                {isAvailable && onBorrow && (
                  <button
                    onClick={() => onBorrow(book._id)}
                    className="btn-primary flex-1 text-sm"
                  >
                    Borrow
                  </button>
                )}
                {onReturn && (
                  <button
                    onClick={() => onReturn(book._id)}
                    className="btn-secondary flex-1 text-sm"
                  >
                    Return
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
