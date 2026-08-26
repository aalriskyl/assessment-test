<template>
  <div class="product-detail-container mx-auto">
    <div class="mb-4">
      <router-link to="/" class="back-link">← Back to Dashboard</router-link>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p>Loading product details...</p>
    </div>

    <div v-else-if="error" class="error-msg card">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="product" class="card detail-card">
      <div class="detail-header flex items-center justify-between mb-4">
        <h1>{{ product.name }}</h1>
        <div class="price-badge">${{ formatPrice(product.price) }}</div>
      </div>
      
      <div class="meta-info mb-4">
        <span class="text-muted">Added on: {{ formatDate(product.created_at) }}</span>
        <span class="text-muted ml-4" v-if="product.updated_at && product.updated_at !== product.created_at">
          Last updated: {{ formatDate(product.updated_at) }}
        </span>
      </div>

      <div class="description-content">
        <h3>Description</h3>
        <p v-if="product.description">{{ product.description }}</p>
        <p v-else class="text-muted italic">No description provided for this product.</p>
      </div>

      <div class="detail-actions mt-4 pt-4 border-top flex gap-4">
        <router-link :to="`/edit/${product.id}`" class="btn btn-primary">Edit Product</router-link>
        <button @click="handleDelete" class="btn btn-danger">Delete Product</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ProductDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null
    }
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      this.loading = true;
      try {
        const response = await api.getProduct(this.id);
        this.product = response.data;
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load product details.';
      } finally {
        this.loading = false;
      }
    },
    async handleDelete() {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await api.deleteProduct(this.id);
          this.$router.push('/');
        } catch (err) {
          console.error(err);
          alert('Failed to delete product.');
        }
      }
    },
    formatPrice(val) {
      const num = Number(val);
      return isNaN(num) ? '0.00' : num.toFixed(2);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(date);
    }
  }
}
</script>

<style scoped>
.product-detail-container {
  max-width: 800px;
}

.back-link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
}
.back-link:hover {
  color: var(--primary-color);
}

.detail-card {
  padding: 2.5rem;
}

.price-badge {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-size: 1.25rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.description-content {
  background-color: rgba(15, 23, 42, 0.4);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-top: 2rem;
}

.description-content h3 {
  color: var(--text-muted);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.description-content p {
  line-height: 1.6;
  white-space: pre-wrap;
}

.border-top {
  border-top: 1px solid var(--border-color);
}

.pt-4 { padding-top: 2rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.ml-4 { margin-left: 1.5rem; }
.italic { font-style: italic; }
</style>
