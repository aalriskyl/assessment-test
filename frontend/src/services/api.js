import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getProducts(search = '') {
    return this.api.get('/products', { params: { search } });
  }

  getProduct(id) {
    return this.api.get(`/products/${id}`);
  }

  createProduct(data) {
    return this.api.post('/products', data);
  }

  updateProduct(id, data) {
    return this.api.put(`/products/${id}`, data);
  }

  deleteProduct(id) {
    return this.api.delete(`/products/${id}`);
  }
}

export default new ApiService();
