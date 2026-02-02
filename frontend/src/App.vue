<script setup>
import { RouterView } from 'vue-router'
import ToastContainer from './components/ToastContainer.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <RouterView />
    <ToastContainer />
  </div>
</template>
