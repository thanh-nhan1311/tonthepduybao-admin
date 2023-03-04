<template>
  <a-layout-header class="flex items-center justify-between">
    <router-link to="/" class="flex items-center">
      <a-image src="/img/white-logo.png" :width="100" :preview="false" />
    </router-link>

    <div class="flex items-center">
      <router-link to="/profile" class="flex items-center">
        <a-avatar :size="42">
          <template #icon>
            <AntDesignOutlined />
          </template>
        </a-avatar>
        <span class="text-white ml-2">Lê Kha</span>
      </router-link>

      <button class="text-red-400 ml-8">Đăng xuất</button>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'AppHeader',
  setup() {
    return {
      selectedKeys: ref(['2'])
    }
  }
})
</script>
