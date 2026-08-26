<template>
  <div class="card form-card mx-auto">
    <h2>{{ isEdit ? 'Edit Product' : 'Create New Product' }}</h2>
    
    <div v-if="error" class="error-msg mb-4">
      {{ error }}
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Product Name *</label>
        <input 
          type="text" 
          id="name" 
          v-model="product.name" 
          class="form-control" 
          required 
          placeholder="e.g. Wireless Headphones"
        />
      </div>

      <div class="form-group">
        <label for="price">Price *</label>
        <div class="price-input flex items-center">
          <span class="currency-symbol">$</span>
          <input 
            type="number" 
            id="price" 
            v-model="product.price" 
            class="form-control" 
            required 
            min="0" 
            step="0.01" 
            placeholder="0.00"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          v-model="product.description" 
          class="form-control" 
          placeholder="Detailed description of the product..."
        ></textarea>
      </div>

      <div class="form-actions flex items-center justify-between mt-4">
        <router-link to="/" class="btn btn-secondary">Cancel</router-link>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ProductForm',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      product: {
        name: '',
        price: '',
        description: ''
      },
      loading: false,
      error: null
    }
  },
  computed: {
    isEdit() {
      return !!this.id;
    }
  },
  async mounted() {
    if (this.isEdit) {
      await this.fetchProduct();
    }
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
    async submitForm() {
      this.loading = true;
      this.error = null;
      try {
        if (this.isEdit) {
          await api.updateProduct(this.id, this.product);
        } else {
          await api.createProduct(this.product);
        }
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        this.error = 'Failed to save product. Please ensure all fields are valid.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.form-card {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 2rem;
  color: var(--primary-color);
}

.price-input {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
  font-weight: 500;
}

.price-input input {
  padding-left: 2rem;
}

.mt-4 { margin-top: 2rem; }
.mb-4 { margin-bottom: 1rem; }
.error-msg {
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--danger-color);
  color: var(--danger-color);
  border-radius: 8px;
}
</style>
