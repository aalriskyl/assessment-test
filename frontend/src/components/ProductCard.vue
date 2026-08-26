<template>
  <div class="card product-card">
    <div class="card-body">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-desc">{{ truncatedDescription }}</p>
      
      <div class="product-footer flex items-center justify-between">
        <span class="price">${{ formatPrice(product.price) }}</span>
        
        <div class="actions flex gap-2">
          <router-link :to="`/product/${product.id}`" class="btn btn-secondary btn-sm">
            View
          </router-link>
          <router-link :to="`/edit/${product.id}`" class="btn btn-secondary btn-sm">
            Edit
          </router-link>
          <button @click="$emit('delete', product.id)" class="btn btn-danger btn-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    truncatedDescription() {
      if (!this.product.description) return 'No description available.';
      return this.product.description.length > 80 
        ? this.product.description.substring(0, 80) + '...'
        : this.product.description;
    }
  },
  methods: {
    formatPrice(val) {
      const num = Number(val);
      return isNaN(num) ? '0.00' : num.toFixed(2);
    }
  }
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-title {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.product-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  flex: 1;
  margin-bottom: 1.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}
</style>
