import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { createOrder, createOrderDetails } from '../lib/api';

Modal.setAppElement('#__next');

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const router = useRouter();

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

  const handleCheckout = async () => {
    setModalIsOpen(true);
  };

  const handleConfirmAndPay = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('User not logged in');
        return;
      }

      // Create the order
      const order = {
        userId: user.id,
        total: cart.reduce((sum, product) => sum + product.price, 0),
      };

      const createdOrder = await createOrder(order);
      console.log("Created order:", createdOrder);

      // Create the order details
      const orderDetails = cart.map((item) => ({
        order: { id: createdOrder.id },
        product: { id: item.id },
        quantity: 1,
        price: item.price,
      }));

      console.log("Order details to be created:", orderDetails);

      for (const detail of orderDetails) {
        await createOrderDetails(detail);
      }

      alert('Order created successfully');
      setCart([]);
      localStorage.removeItem('cart');
      setModalIsOpen(false);
      router.push(`/orders/${createdOrder.id}`);
    } catch (error) {
      console.error("Error creating order details:", error);
      alert('Failed to create order. Please try again.');
    }
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
        onClick={handleCheckout}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
      >
        Checkout
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Payment Modal"
        className="bg-white p-4 rounded shadow-md max-w-lg mx-auto mt-4"
      >
        <h2 className="text-xl mb-4">Select Payment Method</h2>
        <div className="mb-4">
          <input
            type="radio"
            name="paymentMethod"
            value="Bank Transfer"
            checked={paymentMethod === 'Bank Transfer'}
            onChange={() => setPaymentMethod('Bank Transfer')}
            className="mr-2"
          />
          Bank Transfer
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="Credit Card"
            checked={paymentMethod === 'Credit Card'}
            onChange={() => setPaymentMethod('Credit Card')}
            className="mr-2"
          />
          Credit Card
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={paymentMethod === 'Cash on Delivery'}
            onChange={() => setPaymentMethod('Cash on Delivery')}
            className="mr-2"
          />
          Cash on Delivery
        </div>
        <button
          onClick={handleConfirmAndPay}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm and Pay
        </button>
        <button
          onClick={() => setModalIsOpen(false)}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Cart;
