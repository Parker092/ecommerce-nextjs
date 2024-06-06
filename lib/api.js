import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Users API
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.patch(`${API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};

// Categories API
export const getAllCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/categories/${id}`);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(`${API_URL}/categories`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`${API_URL}/categories/${id}`);
};

// Orders API
export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/orders/${id}`);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
};

export const deleteOrder = async (id) => {
  await axios.delete(`${API_URL}/orders/${id}`);
};

// OrderDetails API
export const getAllOrderDetails = async () => {
  const response = await axios.get(`${API_URL}/orderdetails`);
  return response.data;
};

export const getOrderDetailsById = async (id) => {
  const response = await axios.get(`${API_URL}/orderdetails/${id}`);
  return response.data;
};

export const createOrderDetails = async (orderDetails) => {
  console.log("Creating order details:", orderDetails);
  const response = await axios.post(`${API_URL}/details`, orderDetails);
  console.log("Order details response:", response.data);
  return response.data;
};

export const deleteOrderDetails = async (id) => {
  await axios.delete(`${API_URL}/orderdetails/${id}`);
};

// Products API
export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/products/${id}`);
};
