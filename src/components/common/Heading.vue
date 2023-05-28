<template>
  <div class="flex justify-between items-center mb-4">
    <h2 v-if="title" class="text-3xl font-bold">{{ title }}</h2>

    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  }
})
</script>
