<template>
  <main v-if="authStore.isAuth">
    <a-layout style="min-height: 100vh">
      <app-header />

      <a-layout>
        <app-sidebar />

        <a-layout style="padding: 0 24px 24px; position: relative">
          <app-breadcrumb />
          <a-layout-content><router-view /></a-layout-content>

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

<script>
import { defineComponent } from 'vue'
import AppHeader from '@/components/sections/AppHeader.vue'
import AppSidebar from '@/components/sections/AppSidebar.vue'
import AppBreadcrumb from '@/components/sections/AppBreadcrumb.vue'
import AppLoading from '@/components/sections/AppLoading.vue'
import { useAuthStore, useMessageStore } from './stores'

export default defineComponent({
  components: {
    AppHeader,
    AppSidebar,
    AppBreadcrumb,
    AppLoading
  },
  setup() {
    useMessageStore()

    const authStore = useAuthStore()
    return { authStore }
  }
})
</script>
