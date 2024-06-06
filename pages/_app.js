import Link from 'next/link';
import '../styles/globals.css';
import useAuth from '../lib/useAuth';

function MyApp({ Component, pageProps }) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/" className="text-white hover:text-gray-400">Home</Link>
            {isAuthenticated ? (
              <>
                <Link href="/products" className="text-white hover:text-gray-400">Products</Link>
                <Link href="/cart" className="text-white hover:text-gray-400">Cart</Link>
                <Link href="/users/profile" className="text-white hover:text-gray-400">Profile</Link>
                <button onClick={logout} className="text-white hover:text-gray-400">Logout</button>
              </>
            ) : (
              <>
                <Link href="/users/login" className="text-white hover:text-gray-400">Login</Link>
                <Link href="/users/create" className="text-white hover:text-gray-400">Create Account</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
