<template>
  <a-layout style="min-height: 100vh">
    <app-header />

    <a-layout>
      <app-sidebar />

      <a-layout style="padding: 0 24px 24px">
        <app-breadcrumb />
        <a-layout-content> Content </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from '@/components/sections/AppHeader.vue'
import AppSidebar from '@/components/sections/AppSidebar.vue'
import AppBreadcrumb from '@/components/sections/AppBreadcrumb.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppSidebar,
    AppBreadcrumb
  }
})
</script>
