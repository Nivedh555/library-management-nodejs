const Borrow = require('../models/Borrow');
const Book = require('../models/Book');
const User = require('../models/User');

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.copiesAvailable <= 0) {
      return res.status(400).json({ message: 'No copies available' });
    }

    const existingBorrow = await Borrow.findOne({
      userId,
      bookId,
      status: { $in: ['borrowed', 'overdue'] }
    });

    if (existingBorrow) {
      return res.status(400).json({ message: 'You have already borrowed this book' });
    }

    const userActiveBorrows = await Borrow.countDocuments({
      userId,
      status: { $in: ['borrowed', 'overdue'] }
    });

    if (userActiveBorrows >= 5) {
      return res.status(400).json({ message: 'Maximum borrow limit reached (5 books)' });
    }

    const borrow = new Borrow({
      userId,
      bookId
    });

    await borrow.save();

    book.copiesAvailable -= 1;
    await book.save();

    await User.findByIdAndUpdate(userId, {
      $addToSet: { borrowedBooks: bookId }
    });

    const populatedBorrow = await Borrow.findById(borrow._id)
      .populate('bookId')
      .populate('userId', 'name email');

    res.status(201).json({
      message: 'Book borrowed successfully',
      borrow: populatedBorrow
    });
  } catch (error) {
    console.error('Borrow book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const returnBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;

    const borrow = await Borrow.findOne({
      userId,
      bookId,
      status: { $in: ['borrowed', 'overdue'] }
    });

    if (!borrow) {
      return res.status(404).json({ message: 'No active borrow record found' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    borrow.returnDate = new Date();
    borrow.status = 'returned';

    if (new Date() > borrow.dueDate) {
      const daysLate = Math.ceil((new Date() - borrow.dueDate) / (1000 * 60 * 60 * 24));
      borrow.fine = daysLate * 5; // $5 per day fine
    }

    await borrow.save();

    book.copiesAvailable += 1;
    await book.save();

    await User.findByIdAndUpdate(userId, {
      $pull: { borrowedBooks: bookId }
    });

    const populatedBorrow = await Borrow.findById(borrow._id)
      .populate('bookId')
      .populate('userId', 'name email');

    res.json({
      message: 'Book returned successfully',
      borrow: populatedBorrow,
      fine: borrow.fine
    });
  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserBorrows = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (status) {
      query.status = status;
    }

    const borrows = await Borrow.find(query)
      .populate('bookId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Borrow.countDocuments(query);

    res.json({
      borrows,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get user borrows error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllBorrows = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, userId, bookId } = req.query;
    const query = {};

    if (status) query.status = status;
    if (userId) query.userId = userId;
    if (bookId) query.bookId = bookId;

    const borrows = await Borrow.find(query)
      .populate('bookId')
      .populate('userId', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Borrow.countDocuments(query);

    res.json({
      borrows,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all borrows error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBorrowStats = async (req, res) => {
  try {
    const totalBorrows = await Borrow.countDocuments();
    const activeBorrows = await Borrow.countDocuments({ status: { $in: ['borrowed', 'overdue'] } });
    const overdueBorrows = await Borrow.countDocuments({ status: 'overdue' });
    const returnedBorrows = await Borrow.countDocuments({ status: 'returned' });

    const totalFines = await Borrow.aggregate([
      { $match: { fine: { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: '$fine' } } }
    ]);

    res.json({
      totalBorrows,
      activeBorrows,
      overdueBorrows,
      returnedBorrows,
      totalFines: totalFines[0]?.total || 0
    });
  } catch (error) {
    console.error('Get borrow stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOverdueStatus = async (req, res) => {
  try {
    const result = await Borrow.updateMany(
      {
        status: 'borrowed',
        dueDate: { $lt: new Date() }
      },
      { status: 'overdue' }
    );

    res.json({
      message: 'Overdue status updated',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Update overdue status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getUserBorrows,
  getAllBorrows,
  getBorrowStats,
  updateOverdueStatus
};
