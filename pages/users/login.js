import { useState } from 'react';
import { loginUser } from '../../lib/api';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log('Login response:', response); // Log the response for debugging

      if (response.isAuthenticated) {
        console.log('Login successful, redirecting to profile'); // Log for successful login
        // Store user information in local storage
        localStorage.setItem('user', JSON.stringify(response.user));
        router.push('/users/profile'); // Redirigir a la ruta correcta
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err); // Log the error for debugging
      setError('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
