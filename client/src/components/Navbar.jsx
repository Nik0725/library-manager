import { Link, useNavigate } from 'react-router-dom';

/* Navbar component */
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav>
      <ul className="nav-left">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
      </ul>

      <ul className="nav-right">
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
