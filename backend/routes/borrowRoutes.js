const express = require('express');
const {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
  getBorrowStats,
  updateOverdueStatus
} = require('../controllers/borrowController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/borrow/:bookId', authMiddleware, borrowBook);
router.post('/return/:bookId', authMiddleware, returnBook);
router.get('/my-borrows', authMiddleware, getMyBorrows);
router.get('/all', authMiddleware, roleMiddleware(['admin']), getAllBorrows);
router.get('/stats', authMiddleware, roleMiddleware(['admin']), getBorrowStats);
router.put('/update-overdue', authMiddleware, roleMiddleware(['admin']), updateOverdueStatus);

module.exports = router;
