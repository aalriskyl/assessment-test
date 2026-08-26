<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" @click="cancel"></div>
        
        <!-- Modal Content -->
        <div class="relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full modal-content">
          <div class="flex flex-col space-y-2 text-center sm:text-left">
            <h2 class="text-lg font-semibold tracking-tight">{{ title }}</h2>
            <p class="text-sm text-muted-foreground">{{ description }}</p>
          </div>
          
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <Button variant="outline" @click="cancel" :disabled="loading">Cancel</Button>
            <Button variant="destructive" @click="confirm" :disabled="loading">
              <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              {{ confirmText }}
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import Button from './ui/button/Button.vue';

defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Are you sure?' },
  description: { type: String, default: 'This action cannot be undone.' },
  confirmText: { type: String, default: 'Confirm' },
  loading: Boolean
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => emit('confirm');
const cancel = () => emit('cancel');
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.2s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}
</style>
