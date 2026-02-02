<script setup>
import { useToast } from '../composables/useToast'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'bg-green-50 border-green-500 text-green-800',
  error: 'bg-red-50 border-red-500 text-red-800',
  info: 'bg-blue-50 border-blue-500 text-blue-800',
}

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[320px] max-w-md',
          colors[toast.type],
        ]"
      >
        <component
          :is="icons[toast.type]"
          :class="['w-5 h-5', iconColors[toast.type]]"
        />
        <span class="flex-1 text-sm font-medium">{{ toast.message }}</span>
        <button
          @click="removeToast(toast.id)"
          class="p-1 hover:bg-black/10 rounded"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
