<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="container flex items-center justify-between">
        <router-link to="/" class="logo">
          <h2>📦 Nexus Inventory</h2>
        </router-link>
        <nav>
          <router-link to="/" class="nav-link">Dashboard</router-link>
          <router-link to="/create" class="nav-link btn btn-primary ml-4">
            + New Product
          </router-link>
        </nav>
      </div>
    </header>

    <main class="container app-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.app-header {
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo h2 {
  margin: 0;
  color: var(--text-main);
  font-weight: 700;
  letter-spacing: -0.5px;
}

.nav-link {
  color: var(--text-muted);
  font-weight: 500;
  margin-left: 1.5rem;
}

.nav-link.router-link-active {
  color: var(--text-main);
}

.nav-link.btn {
  color: white; /* preserve btn text color */
}

.app-main {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.ml-4 { margin-left: 1rem; }

/* Transitions */
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
