import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // adjust if backend port is different
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getProducts() {
    return api.get('/products');
  },
  getProduct(id) {
    return api.get(`/products/${id}`);
  },
  createProduct(data) {
    return api.post('/products', data);
  },
  updateProduct(id, data) {
    return api.put(`/products/${id}`, data);
  },
  deleteProduct(id) {
    return api.delete(`/products/${id}`);
  }
};
