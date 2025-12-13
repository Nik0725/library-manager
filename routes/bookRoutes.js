// routes/bookRoutes.js

// Defines routes for handling CRUD operations on books

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// @route   GET /api/books
// @desc    Get all books
router.get('/', getBooks);

// @route   GET /api/books/:id
// @desc    Get a single book by ID
router.get('/:id', getBookById);

// @route   POST /api/books
// @desc    Create a new book
router.post('/', createBook);

// @route   PUT /api/books/:id
// @desc    Update a book
router.put('/:id', updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete a book
router.delete('/:id', deleteBook);

module.exports = router;
