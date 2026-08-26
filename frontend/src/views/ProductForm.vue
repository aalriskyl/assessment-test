<template>
  <div class="max-w-2xl mx-auto py-8">
    <Card class="border shadow-md">
      <CardHeader>
        <CardTitle class="text-2xl">{{ isEdit ? 'Edit Product' : 'Create New Product' }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="error" class="mb-6 p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-sm font-medium">
          {{ error }}
        </div>

        <form @submit.prevent="promptSave" class="space-y-6">
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Name <span class="text-destructive">*</span>
            </label>
            <Input 
              id="name" 
              v-model="product.name" 
              required 
              placeholder="e.g. Wireless Headphones" 
            />
          </div>

          <div class="space-y-2">
            <label for="price" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Price <span class="text-destructive">*</span>
            </label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-muted-foreground">$</span>
              <Input 
                id="price" 
                type="number" 
                v-model="product.price" 
                required 
                min="0" 
                step="0.01" 
                placeholder="0.00" 
                class="pl-7"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="description" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Description
            </label>
            <Textarea 
              id="description" 
              v-model="product.description" 
              placeholder="Detailed description of the product..." 
              class="resize-y"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between border-t bg-muted/20 px-6 py-4">
        <router-link to="/">
          <Button variant="outline" type="button">Cancel</Button>
        </router-link>
        <Button @click="promptSave" :disabled="loading" type="button">
          {{ isEdit ? 'Update Product' : 'Create Product' }}
        </Button>
      </CardFooter>
    </Card>

    <ConfirmDialog 
      :isOpen="saveDialog.isOpen"
      :title="isEdit ? 'Update Product' : 'Create Product'"
      :description="isEdit ? 'Are you sure you want to update this product\'s details?' : 'Are you sure you want to create this new product?'"
      :confirmText="isEdit ? 'Update' : 'Create'"
      :loading="saveDialog.loading"
      @confirm="executeSave"
      @cancel="saveDialog.isOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../services/api';
import Card from '../components/ui/card/Card.vue';
import CardHeader from '../components/ui/card/CardHeader.vue';
import CardTitle from '../components/ui/card/CardTitle.vue';
import CardContent from '../components/ui/card/CardContent.vue';
import CardFooter from '../components/ui/card/CardFooter.vue';
import Button from '../components/ui/button/Button.vue';
import Input from '../components/ui/input/Input.vue';
import Textarea from '../components/ui/textarea/Textarea.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';

const props = defineProps({
  id: {
    type: String,
    default: null
  }
});

const router = useRouter();
const product = ref({ name: '', price: '', description: '' });
const loading = ref(false);
const error = ref(null);
const saveDialog = ref({ isOpen: false, loading: false });

const isEdit = computed(() => !!props.id);

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

const promptSave = () => {
  // basic validation
  if (!product.value.name || !product.value.price) {
    error.value = 'Please fill out all required fields.';
    return;
  }
  error.value = null;
  saveDialog.value = { isOpen: true, loading: false };
};

const executeSave = async () => {
  saveDialog.value.loading = true;
  loading.value = true;
  error.value = null;
  try {
    if (isEdit.value) {
      await api.updateProduct(props.id, product.value);
    } else {
      await api.createProduct(product.value);
    }
    saveDialog.value.isOpen = false;
    router.push('/');
  } catch (err) {
    console.error(err);
    error.value = 'Failed to save product. Please ensure all fields are valid.';
    saveDialog.value.isOpen = false;
  } finally {
    loading.value = false;
    saveDialog.value.loading = false;
  }
};

onMounted(() => {
  if (isEdit.value) fetchProduct();
});
</script>
