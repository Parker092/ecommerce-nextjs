// pages/users/profile.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllOrders } from '../../lib/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Get user information from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      // Fetch user orders
      const fetchOrders = async () => {
        const ordersData = await getAllOrders();
        // Filter orders by user ID
        const userOrders = ordersData.filter(order => order.userId === storedUser.id);
        setOrders(userOrders);
      };
      fetchOrders();
    } else {
      router.push('/users/login'); // Redirect to login if user is not found
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id}, Total: {order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
