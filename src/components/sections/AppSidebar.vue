<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in Object.values(MENU)">
        <a-menu-item v-if="!item.subMenu" :key="item.id">
          <router-link :to="item.path" class="flex items-center">
            <Iconify :icon="item.icon" />
            <span class="ml-2">{{ item.name }}</span>
          </router-link>
        </a-menu-item>

        <a-sub-menu v-else :key="item.id + 1">
          <template #title>
            <div class="flex items-center">
              <Iconify :icon="item.icon" />
              <span class="ml-2">{{ item.name }}</span>
            </div>
          </template>

          <a-menu-item v-for="subItem in Object.values(item.subMenu)" :key="subItem.id">
            <router-link :to="subItem.path" class="flex items-center">
              {{ subItem.name }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { MENU } from '@/modules/menu'

export default defineComponent({
  setup() {
    return {
      MENU,
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      openKeys: ref(['sub1'])
    }
  }
})
</script>
