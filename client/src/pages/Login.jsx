import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });

      // Save token
      localStorage.setItem('token', response.data.token);

      // Update login state
      setIsLoggedIn(true);

      setMessage('Login successful');

      // Redirect to Books page
      navigate('/books');
    } catch (error) {
      setMessage('Invalid login');
    }
  };

  return (
    <div className="page-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
