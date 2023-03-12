<template>
  <a-layout-sider style="background: #fff">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in Object.values(MENU)">
        <a-menu-item v-if="!item.subMenu" :key="item.id">
          <div class="flex items-center">
            <Iconify :icon="item.icon" width="24px" />
            <router-link :to="item.path" class="ml-2">{{ item.name }}</router-link>
          </div>
        </a-menu-item>

        <a-sub-menu v-else :key="item.id + 1">
          <template #title>
            <div class="flex items-center">
              <Iconify :icon="item.icon" width="24px" />
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
import { MENU } from '~/modules/menu'

export default defineComponent({
  setup() {
    const selectedKeys = ref(['1'])
    const openKeys = ref(['sub1'])

    return {
      MENU,
      selectedKeys,
      openKeys
    }
  }
})
</script>
