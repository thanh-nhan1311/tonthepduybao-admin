<template>
  <a-breadcrumb class="flex mb-4 bg-white px-8 py-4">
    <a-breadcrumb-item class="flex items-center w-auto">
      <router-link :to="MENU.HOME.path" class="flex items-center">
        <Iconify :icon="MENU.HOME.icon" />
        <span class="ml-1">{{ MENU.HOME.name }}</span>
      </router-link>
    </a-breadcrumb-item>

    <a-breadcrumb-item
      v-for="(item, index) of breadcrumbs"
      :key="index"
      class="flex items-center w-auto"
    >
      <router-link v-if="index !== breadcrumbs.length - 1" :to="item.path">
        {{ item.name }}
      </router-link>
      <span v-else>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MENU } from '~/modules/menu'
import { useCommonStore } from '~/stores/common'

const route = useRoute()

// Store
const commonStore = useCommonStore()

// State
const breadcrumbs = computed(() => route.meta.breadcrumbs || commonStore.breadcrumbs)
</script>
