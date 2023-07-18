<template>
  <a-layout-header class="flex items-center justify-between px-6">
    <router-link to="/" class="flex items-center">
      <a-image src="/img/white-logo.png" :width="100" :preview="false" />
    </router-link>

    <a-popover placement="bottomRight">
      <template #content>
        <ul class="min-w-[160px] list-none px-4 py-2 m-0">
          <li class="mb-4">
            <router-link :to="MENU.PROFILE.path" class="text-slate-900">Tài khoản</router-link>
          </li>
          <li class="text-red-500 cursor-pointer" @click="authStore.logout()">Đăng xuất</li>
        </ul>
      </template>

      <div class="flex items-center cursor-pointer">
        <image-viewer
          scope="avatar"
          :avatar-size="40"
          :has-prefix="true"
          :src="currentUser.avatar"
        />
        <span class="text-white ml-4 mr-8 cursor-pointer font-medium">
          {{ currentUser.fullName }}
        </span>
      </div>
    </a-popover>
  </a-layout-header>
</template>

<script setup>
import { computed } from 'vue'
import { MENU } from '~/modules/menu'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const currentUser = computed(() => authStore.currentUser)
</script>
