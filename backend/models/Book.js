const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  copiesAvailable: {
    type: Number,
    required: [true, 'Number of copies is required'],
    min: 0,
    default: 1
  },
  totalCopies: {
    type: Number,
    required: [true, 'Total copies is required'],
    min: 1,
    default: 1
  },
  description: {
    type: String,
    trim: true
  },
  publishedYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
