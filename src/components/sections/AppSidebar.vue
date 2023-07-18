<template>
  <a-layout-sider v-model:collapsed="collapsed" style="background: #fff" width="240" collapsible>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in menuItems">
        <a-menu-item
          v-if="!hasSubMenu(item.subMenu)"
          :key="item.id"
          :class="['flex justify-center items-center', collapsed ? 'px-0' : 'px-8']"
          @click="routeTo(item.path)"
        >
          <Iconify :icon="item.icon" width="20px" />
          <span :class="['ml-2 text-lg', collapsed && 'tooltip']">{{ item.name }}</span>
        </a-menu-item>

        <a-sub-menu v-else :key="item.id + 1" :class="!collapsed && 'collapsed-close'">
          <template #title>
            <div class="flex items-center">
              <Iconify :icon="item.icon" width="20px" />
              <span v-if="!collapsed" class="ml-2 text-lg">{{ item.name }}</span>
            </div>
          </template>

          <a-menu-item
            v-for="subItem in Object.values(item.subMenu).filter((item) => !item.implicit)"
            :key="subItem.id"
          >
            <router-link :to="subItem.path" class="flex items-center text-lg">
              {{ subItem.name }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MENU } from '~/modules/menu'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()

// Store
const authStore = useAuthStore()

// State
const selectedKeys = ref(['1'])
const openKeys = ref(['sub1'])
const collapsed = ref(true)
const menuItems = computed(() =>
  Object.values(MENU).filter(
    (item) => !item.implicit && item.permission.includes(authStore.currentUserRole.id)
  )
)

// Methods
const routeTo = (path) => router.push(path)
const hasSubMenu = (subMenu) => {
  const subMenuItems = subMenu ? Object.values(subMenu).filter((item) => !item.implicit) : []
  return subMenu && subMenuItems.length !== 0
}
</script>
