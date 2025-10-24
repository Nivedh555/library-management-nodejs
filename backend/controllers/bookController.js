const { validationResult } = require('express-validator');
const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, category, isbn, copiesAvailable, totalCopies, description, publishedYear } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }

    const book = new Book({
      title,
      author,
      category,
      isbn,
      copiesAvailable: copiesAvailable || totalCopies || 1,
      totalCopies: totalCopies || 1,
      description,
      publishedYear
    });

    await book.save();

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const { title, author, category, isbn, copiesAvailable, totalCopies, description, publishedYear } = req.body;

    if (isbn && isbn !== book.isbn) {
      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        return res.status(400).json({ message: 'Book with this ISBN already exists' });
      }
    }

    Object.assign(book, {
      title: title || book.title,
      author: author || book.author,
      category: category || book.category,
      isbn: isbn || book.isbn,
      copiesAvailable: copiesAvailable !== undefined ? copiesAvailable : book.copiesAvailable,
      totalCopies: totalCopies !== undefined ? totalCopies : book.totalCopies,
      description: description || book.description,
      publishedYear: publishedYear || book.publishedYear
    });

    await book.save();

    res.json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalCopies = await Book.aggregate([
      { $group: { _id: null, total: { $sum: '$totalCopies' } } }
    ]);
    const availableCopies = await Book.aggregate([
      { $group: { _id: null, total: { $sum: '$copiesAvailable' } } }
    ]);

    res.json({
      totalBooks,
      totalCopies: totalCopies[0]?.total || 0,
      availableCopies: availableCopies[0]?.total || 0,
      borrowedCopies: (totalCopies[0]?.total || 0) - (availableCopies[0]?.total || 0)
    });
  } catch (error) {
    console.error('Get book stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookStats
};
