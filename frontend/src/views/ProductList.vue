<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1>Inventory Dashboard</h1>
      <button @click="fetchProducts" class="btn btn-secondary">
        ↻ Refresh
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p>Loading products...</p>
    </div>
    
    <div v-else-if="error" class="error-msg card">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="products.length === 0" class="empty-state card text-center py-8">
      <h3>No products found</h3>
      <p class="text-muted">Get started by creating a new product.</p>
      <router-link to="/create" class="btn btn-primary mt-4">Create Product</router-link>
    </div>

    <div v-else class="grid">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.getProducts();
        this.products = response.data;
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load products. Please check the backend connection.';
      } finally {
        this.loading = false;
      }
    },
    async handleDelete(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await api.deleteProduct(id);
          this.products = this.products.filter(p => p.id !== id);
        } catch (err) {
          console.error(err);
          alert('Failed to delete product.');
        }
      }
    }
  }
}
</script>

<style scoped>
.mb-4 { margin-bottom: 2rem; }
.mt-4 { margin-top: 1rem; }
.py-8 { padding: 4rem 2rem; }
.text-center { text-align: center; }
.text-muted { color: var(--text-muted); }
.error-msg { border-color: var(--danger-color); color: var(--danger-color); }
</style>
