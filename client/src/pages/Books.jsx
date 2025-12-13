import { useEffect, useState } from 'react';
import api from '../api';

function Books() {
  // State for list of books
  const [books, setBooks] = useState([]);

  // State for new book form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  // State for editing
  const [editingBookId, setEditingBookId] = useState(null);

  // Fetch all books on page load
  useEffect(() => {
    fetchBooks();
  }, []);

  // Get books from backend
  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books');
    }
  };

  // Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      isbn,
      publishedDate,
    };

    try {
      if (editingBookId) {
        // Update book
        await api.put(`/books/${editingBookId}`, bookData);
        setEditingBookId(null);
      } else {
        // Create book
        await api.post('/books', bookData);
      }

      // Reset form
      setTitle('');
      setAuthor('');
      setIsbn('');
      setPublishedDate('');

      // Refresh list
      fetchBooks();
    } catch (error) {
      console.error('Failed to save book');
    }
  };

  // Load book into form for editing
  const handleEdit = (book) => {
    setEditingBookId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setPublishedDate(book.publishedDate?.substring(0, 10));
  };

  // Delete a book
  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Failed to delete book');
    }
  };

  return (
    <div className="page-container">
      <h1>Books</h1>

      {/* Book Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          required
        />

        <button type="submit">
          {editingBookId ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      {/* Book List */}
      <ul>
        {books.map((book) => (
          <li className="book-item">
  <span className="book-text">
    <strong>{book.title}</strong> by {book.author}
    <em> ({book.status}) </em>
  </span>

  <span className="book-actions">
    <button onClick={() => handleEdit(book)}>
      ✏️
    </button>
    <button onClick={() => handleDelete(book._id)}>
      🗑️
    </button>
  </span>
</li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
