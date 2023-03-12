<template>
  <a-layout-header class="flex items-center justify-between px-6">
    <router-link to="/" class="flex items-center">
      <a-image src="/img/white-logo.png" :width="100" :preview="false" />
    </router-link>

    <div class="flex items-center">
      <router-link to="/profile" class="flex items-center">
        <Iconify icon="carbon:user-avatar-filled-alt" width="50px" height="50px" color="#fff" />
        <span class="text-white ml-2">Lê Kha</span>
      </router-link>

      <a-button type="text" danger class="ml-8" @click="authComposition.logout()">
        Đăng xuất
      </a-button>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useAuth } from '~/compositions'
import { useCommonStore } from '~/stores/common'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const authComposition = useAuth()
    const commonStore = useCommonStore()

    const selectedKeys = ref(['2'])

    return { authComposition, commonStore, selectedKeys }
  }
})
</script>
