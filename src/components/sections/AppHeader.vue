<template>
  <a-layout-header class="flex items-center justify-between px-6">
    <router-link to="/" class="flex items-center">
      <a-image src="/img/white-logo.png" :width="100" :preview="false" />
    </router-link>

    <a-popover placement="bottom">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <template #title>
        <span>Title</span>
      </template>
      <a-button>Bottom</a-button>
    </a-popover>
  </a-layout-header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
</script>
