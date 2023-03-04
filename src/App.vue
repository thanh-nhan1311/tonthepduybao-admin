<template>
  <a-layout v-if="isAuth" style="min-height: 100vh">
    <app-header />

    <a-layout>
      <app-sidebar />

      <a-layout style="padding: 0 24px 24px">
        <app-breadcrumb />
        <a-layout-content><router-view /></a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>

  <router-view v-else />
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from '@/components/sections/AppHeader.vue'
import AppSidebar from '@/components/sections/AppSidebar.vue'
import AppBreadcrumb from '@/components/sections/AppBreadcrumb.vue'
import { useAuthStore } from './stores/auth'

export default defineComponent({
  components: {
    AppHeader,
    AppSidebar,
    AppBreadcrumb
  },
  setup() {
    const authStore = useAuthStore()
    const isAuth = authStore.checkAuth()

    console.log(isAuth)

    return { isAuth }
  }
})
</script>
