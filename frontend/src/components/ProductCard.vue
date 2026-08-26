<template>
  <Card class="flex flex-col h-full hover:shadow-lg transition-all duration-300 group">
    <CardHeader>
      <CardTitle class="text-xl text-primary group-hover:text-blue-500 transition-colors">
        {{ product.name }}
      </CardTitle>
    </CardHeader>
    <CardContent class="flex-1">
      <p class="text-muted-foreground text-sm line-clamp-3 mb-4">
        {{ product.description || 'No description available.' }}
      </p>
      <div class="text-2xl font-bold tracking-tight">
        ${{ formatPrice(product.price) }}
      </div>
    </CardContent>
    <CardFooter class="flex justify-between items-center gap-2 pt-4 border-t border-border/50">
      <div class="flex space-x-2">
        <router-link :to="`/product/${product.id}`">
          <Button variant="secondary" size="sm">View</Button>
        </router-link>
        <router-link :to="`/edit/${product.id}`">
          <Button variant="outline" size="sm">Edit</Button>
        </router-link>
      </div>
      <Button variant="destructive" size="sm" @click="$emit('delete', product.id)">
        Delete
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup>
import { computed } from 'vue';
import Card from './ui/card/Card.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardContent from './ui/card/CardContent.vue';
import CardFooter from './ui/card/CardFooter.vue';
import Button from './ui/button/Button.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['delete']);

const formatPrice = (val) => {
  const num = Number(val);
  return isNaN(num) ? '0.00' : num.toFixed(2);
};
</script>
