<template>
  <main v-if="isAuth">
    <a-layout style="min-height: 100vh">
      <app-header />

      <a-layout>
        <app-sidebar />

        <a-layout class="relative p-8">
          <app-breadcrumb />
          <a-layout-content class="p-10"><router-view /></a-layout-content>

          <AppLoading />
        </a-layout>
      </a-layout>
    </a-layout>
  </main>

  <main v-else class="relative">
    <router-view />
    <AppLoading />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isAuth = computed(() => authStore.isAuth)
</script>
