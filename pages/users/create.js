import { useState } from 'react';
import { createUser } from '../../lib/api';
import { useRouter } from 'next/router';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({ name, email, password });
      if (response) {
        alert('Account created successfully');
        router.push('/users/login');
      } else {
        setError('Failed to create account');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create account');
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Create Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateAccount;
