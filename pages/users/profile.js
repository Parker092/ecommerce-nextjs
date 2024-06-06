import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllOrders, getOrderById, updateUser } from '../../lib/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setNewEmail(storedUser.email);
      // Fetch all orders and filter by user ID
      const fetchOrders = async () => {
        try {
          const ordersData = await getAllOrders();
          const userOrders = ordersData.filter(order => order.user && order.user.id === storedUser.id);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    } else {
      router.push('/users/login');
    }
  }, [router]);

  const handleUpdateProfile = async () => {
    const updatedUser = { ...user, name, email: newEmail, password: newPassword };
    const response = await updateUser(user.id, updatedUser);
    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
      setEditMode(false);
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
  };

  const handleOrderClick = async (orderId) => {
    try {
      const orderDetails = await getOrderById(orderId);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => setEditMode(!editMode)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
        {editMode ? 'Cancel' : 'Edit Profile'}
      </button>
      <button onClick={() => router.push('/cart')} className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 ml-2">
        View Cart
      </button>

      {editMode && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save Changes
            </button>
          </form>
        </div>
      )}

      <h2 className="mt-8 text-xl font-bold">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border rounded-lg p-4 mb-4 shadow-md cursor-pointer" onClick={() => handleOrderClick(order.id)}>
              <p><strong>Order Number:</strong> {order.id}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}

      {selectedOrder && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Order Details</h2>
          <p><strong>Order Number:</strong> {selectedOrder.id}</p>
          <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
          <h3 className="text-lg font-bold">Products:</h3>
          <ul>
            {selectedOrder.orderDetails.map((detail) => (
              <li key={detail.id}>
                <p><strong>Product:</strong> {detail.product.name}</p>
                <p><strong>Quantity:</strong> {detail.quantity}</p>
                <p><strong>Price:</strong> ${detail.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
