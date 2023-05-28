<template>
  <a-breadcrumb class="flex mb-4 bg-white px-8 py-4">
    <a-breadcrumb-item class="flex items-center w-auto">
      <router-link :to="MENU.HOME.path" class="flex items-center">
        <Iconify :icon="MENU.HOME.icon" />
        <span class="ml-1">{{ MENU.HOME.name }}</span>
      </router-link>
    </a-breadcrumb-item>

    <a-breadcrumb-item
      v-for="(item, index) of breadcrumb"
      :key="index"
      class="flex items-center w-auto"
    >
      <span>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MENU } from '~/modules/menu'

const route = useRoute()

// State
const breadcrumb = ref([])

// Method
const findBreadcrumb = (fullPath) => {
  breadcrumb.value = []

  if (fullPath === MENU.HOME.path) return

  for (const menu of Object.values(MENU)) {
    const { path, subMenu } = menu

    if (!path && subMenu) {
      const subMenuItem = Object.values(subMenu).find((subItem) => subItem.path === fullPath)
      if (subMenuItem) {
        breadcrumb.value.push(menu)
        breadcrumb.value.push(subMenuItem)
        break
      }
    } else if (path === fullPath) {
      breadcrumb.value.push(menu)
      break
    }
  }
}

// Hook
watch(
  () => route.fullPath,
  (fullPath) => findBreadcrumb(fullPath),
  { immediate: true }
)

onMounted(() => {
  findBreadcrumb(route.fullPath)
})
</script>
