const express = require('express');
const { body } = require('express-validator');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookStats
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/stats', authMiddleware, roleMiddleware(['admin']), getBookStats);
router.get('/:id', getBookById);

router.post('/', [
  authMiddleware,
  roleMiddleware(['admin']),
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('author').trim().isLength({ min: 1 }).withMessage('Author is required'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
  body('isbn').trim().isLength({ min: 1 }).withMessage('ISBN is required'),
  body('copiesAvailable').optional().isInt({ min: 0 }).withMessage('Copies available must be a non-negative integer'),
  body('totalCopies').optional().isInt({ min: 1 }).withMessage('Total copies must be at least 1'),
  body('publishedYear').optional().isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Invalid published year')
], createBook);

router.put('/:id', [
  authMiddleware,
  roleMiddleware(['admin']),
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('author').optional().trim().isLength({ min: 1 }).withMessage('Author cannot be empty'),
  body('category').optional().trim().isLength({ min: 1 }).withMessage('Category cannot be empty'),
  body('isbn').optional().trim().isLength({ min: 1 }).withMessage('ISBN cannot be empty'),
  body('copiesAvailable').optional().isInt({ min: 0 }).withMessage('Copies available must be a non-negative integer'),
  body('totalCopies').optional().isInt({ min: 1 }).withMessage('Total copies must be at least 1'),
  body('publishedYear').optional().isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Invalid published year')
], updateBook);

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteBook);

module.exports = router;
