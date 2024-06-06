import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, logout };
};

export default useAuth;
