<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col font-sans">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        <router-link to="/" class="flex items-center space-x-2">
          <span class="font-bold sm:inline-block text-xl">Inventory</span>
        </router-link>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <router-link to="/" class="transition-colors hover:text-foreground/80 text-foreground/60">
            Dashboard
          </router-link>
          <router-link to="/create">
            <Button size="sm">
              + New Product
            </Button>
          </router-link>
        </nav>
      </div>
    </header>

    <main class="flex-1 container mx-auto px-4 md:px-8 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import Button from './components/ui/button/Button.vue';
</script>

<style>
/* Base transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
