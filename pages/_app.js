import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="/" className="text-white hover:text-gray-400">Home</Link>
            <Link href="/products" className="text-white hover:text-gray-400">Products</Link>
            <Link href="/cart" className="text-white hover:text-gray-400">Cart</Link>
            <Link href="/users/login" className="text-white hover:text-gray-400">Login</Link>
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