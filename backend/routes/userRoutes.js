const express = require('express');
const { body } = require('express-validator');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['admin']), getAllUsers);
router.get('/stats', authMiddleware, roleMiddleware(['admin']), getUserStats);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserById);

router.put('/:id', [
  authMiddleware,
  roleMiddleware(['admin']),
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('role').optional().isIn(['admin', 'user']).withMessage('Role must be admin or user')
], updateUser);

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

module.exports = router;
