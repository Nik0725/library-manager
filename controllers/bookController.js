// bookController.js

//Controller functions for handling CRUD operations on Book model

const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Public (for now)
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, publishedDate, status } = req.body;

    // Check if book already exists
    const existing = await Book.findOne({ isbn });
    if (existing) return res.status(400).json({ message: 'Book with this ISBN already exists' });

    const newBook = new Book({
      title,
      author,
      isbn,
      publishedDate,
      status,
    });

    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Public
const updateBook = async (req, res) => {
  try {
    const { title, author, isbn, publishedDate, status } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    book.publishedDate = publishedDate || book.publishedDate;
    book.status = status || book.status;

    const updated = await book.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Public
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.deleteOne();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
