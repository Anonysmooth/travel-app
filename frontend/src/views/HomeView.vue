<script setup>
import { Plane } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Plane class="text-primary-600" :size="48" />
        <h1 class="text-4xl font-bold text-gray-900">Travel App</h1>
      </div>
      <p class="text-lg text-gray-600">Organisez vos voyages facilement</p>
    </div>
  </div>
</template>
