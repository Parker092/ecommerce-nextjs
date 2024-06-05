// pages/orders/index.js
import { useEffect, useState } from 'react';
import { getAllOrders } from '../../lib/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
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

export default Orders;
