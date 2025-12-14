function Home() {
  return (
    <div className="home-container">
      {/* Main title */}
      <h1 className="home-title">Library Manager</h1>

      {/* Short description */}
      <p className="home-subtitle">
        A simple and efficient system for managing library books.
      </p>

      {/* Call-to-action buttons */}
      <div className="home-actions">
        <a href="/books" className="primary-btn">
          View Books
        </a>

        <a href="/login" className="secondary-btn">
          Login
        </a>
      </div>

      {/* Feature highlights */}
      <div className="home-features">
        <div className="feature-card">
          <h3>📚 Book Management</h3>
          <p>Add, update, and remove books from the library system.</p>
        </div>

        <div className="feature-card">
          <h3>🔐 Secure Access</h3>
          <p>User authentication with protected actions.</p>
        </div>

        <div className="feature-card">
          <h3>⚡ Fast & Simple</h3>
          <p>Clean interface built with React and Express.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;


