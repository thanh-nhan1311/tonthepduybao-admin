<template>
  <main v-if="isAuth">
    <a-layout style="min-height: 100vh">
      <app-header />

      <a-layout>
        <app-sidebar />

        <a-layout class="app-container custom-scroll overflow-y-scroll relative p-8">
          <app-breadcrumb />
          <a-layout-content class="p-10 bg-white h-auto min-h-[unset] mb-14">
            <router-view />
          </a-layout-content>

          <AppLoading />
        </a-layout>
      </a-layout>
    </a-layout>

    <select-debt-type-modal />
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
<style lang="scss">
.app-container {
  max-height: calc(100vh - 64px);
}
</style>
