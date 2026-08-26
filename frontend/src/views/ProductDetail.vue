<template>
  <div class="max-w-3xl mx-auto py-6">
    <div class="mb-6">
      <router-link to="/" class="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
        <span>&larr;</span> Back to Dashboard
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20 text-muted-foreground">
      <div class="animate-pulse flex items-center gap-2">
        <div class="h-4 w-4 bg-primary rounded-full"></div>
        <p>Loading product details...</p>
      </div>
    </div>

    <div v-else-if="error" class="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-sm font-medium">
      {{ error }}
    </div>

    <Card v-else-if="product" class="shadow-lg border-2">
      <CardHeader class="pb-4">
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <CardTitle class="text-3xl font-extrabold tracking-tight mb-2">
              {{ product.name }}
            </CardTitle>
            <div class="flex items-center text-sm text-muted-foreground gap-4">
              <span>Added: {{ formatDate(product.created_at) }}</span>
              <span v-if="product.updated_at && product.updated_at !== product.created_at" class="border-l pl-4 border-border/50">
                Updated: {{ formatDate(product.updated_at) }}
              </span>
            </div>
          </div>
          <div class="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-xl shadow-sm whitespace-nowrap self-start">
            ${{ formatPrice(product.price) }}
          </div>
        </div>
      </CardHeader>
      
      <CardContent class="pt-6 border-t bg-muted/10">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Description
        </h3>
        <p v-if="product.description" class="leading-relaxed whitespace-pre-wrap">
          {{ product.description }}
        </p>
        <p v-else class="text-muted-foreground italic">
          No description provided for this product.
        </p>
      </CardContent>

      <CardFooter class="border-t bg-background px-6 py-4 flex flex-wrap gap-4">
        <router-link :to="`/edit/${product.id}`">
          <Button variant="default">Edit Product</Button>
        </router-link>
        <Button @click="handleDelete" variant="destructive">
          Delete Product
        </Button>
      </CardFooter>
    </Card>

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import Card from '../components/ui/card/Card.vue';
import CardHeader from '../components/ui/card/CardHeader.vue';
import CardTitle from '../components/ui/card/CardTitle.vue';
import CardContent from '../components/ui/card/CardContent.vue';
import CardFooter from '../components/ui/card/CardFooter.vue';
import Button from '../components/ui/button/Button.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const router = useRouter();
const product = ref(null);
const loading = ref(true);
const error = ref(null);
const deleteDialog = ref({ isOpen: false, loading: false });

const fetchProduct = async () => {
  loading.value = true;
  try {
    const response = await api.getProduct(props.id);
    product.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to load product details.';
  } finally {
    loading.value = false;
  }
};

const handleDelete = () => {
  deleteDialog.value = { isOpen: true, loading: false };
};

const executeDelete = async () => {
  deleteDialog.value.loading = true;
  try {
    await api.deleteProduct(props.id);
    router.push('/');
  } catch (err) {
    console.error(err);
    alert('Failed to delete product.');
  } finally {
    deleteDialog.value.loading = false;
  }
};

const formatPrice = (val) => {
  const num = Number(val);
  return isNaN(num) ? '0.00' : num.toFixed(2);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date);
};

onMounted(() => {
  fetchProduct();
});
</script>
