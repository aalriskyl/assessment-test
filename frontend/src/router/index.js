import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import ProductForm from '../views/ProductForm.vue';
import ProductDetail from '../views/ProductDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList
  },
  {
    path: '/create',
    name: 'CreateProduct',
    component: ProductForm
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: ProductForm,
    props: true
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
