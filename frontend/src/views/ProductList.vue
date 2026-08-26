<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground mt-2">Manage your inventory and products.</p>
      </div>
      <div class="flex items-center gap-4 flex-1 md:flex-none justify-end w-full md:w-auto">
        <Input 
          v-model="searchQuery"
          placeholder="Search products..." 
          class="max-w-xs w-full"
        />
        <Button @click="fetchProducts" variant="outline" class="gap-2 shrink-0">
          ↻ Refresh
        </Button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20 text-muted-foreground">
      <div class="animate-pulse flex items-center gap-2">
        <div class="h-4 w-4 bg-primary rounded-full"></div>
        <p>Loading products...</p>
      </div>
    </div>
    
    <div v-else-if="error" class="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
      <p class="font-medium flex items-center gap-2">
        <span class="text-xl">⚠️</span> {{ error }}
      </p>
    </div>

    <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
      <h3 class="text-xl font-semibold mb-2">No products found</h3>
      <p class="text-muted-foreground mb-6 max-w-sm">Get started by creating your first product to see it appear here.</p>
      <router-link to="/create">
        <Button>Create Product</Button>
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
        @delete="handleDelete"
      />
    </div>

    <ConfirmDialog 
      :isOpen="deleteDialog.isOpen"
      title="Delete Product"
      description="Are you sure you want to delete this product? This action cannot be undone."
      confirmText="Delete"
      :loading="deleteDialog.loading"
      @confirm="executeDelete"
      @cancel="deleteDialog.isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '../services/api';
import ProductCard from '../components/ProductCard.vue';
import Button from '../components/ui/button/Button.vue';
import Input from '../components/ui/input/Input.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const deleteDialog = ref({ isOpen: false, id: null, loading: false });

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await api.getProducts(searchQuery.value);
    products.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to load products. Please check the backend connection.';
  } finally {
    loading.value = false;
  }
};

let debounceTimeout = null;
watch(searchQuery, () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchProducts();
  }, 500);
});

const handleDelete = (id) => {
  deleteDialog.value = { isOpen: true, id, loading: false };
};

const executeDelete = async () => {
  deleteDialog.value.loading = true;
  try {
    await api.deleteProduct(deleteDialog.value.id);
    products.value = products.value.filter(p => p.id !== deleteDialog.value.id);
    deleteDialog.value.isOpen = false;
  } catch (err) {
    console.error(err);
    alert('Failed to delete product.');
  } finally {
    deleteDialog.value.loading = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
