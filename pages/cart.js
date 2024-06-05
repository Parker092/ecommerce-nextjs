import { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <ul className="space-y-4">
        {cart.map((product, index) => (
          <li key={index} className="border rounded-lg p-4 shadow-md flex justify-between items-center">
            <div>
              {product.name} - ${product.price.toFixed(2)}
            </div>
            <button 
              onClick={() => handleRemoveFromCart(index)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => alert('Proceed to Checkout')}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
