<template>
  <section class="h-full flex justify-center pt-48">
    <div>
      <h3 class="text-3xl text-center mb-12">Thêm Công Nợ</h3>
      <div class="flex justify-center">
        <router-link
          v-for="(item, index) of debtItems"
          :key="index"
          :to="item.path"
          class="mx-16 py-16 px-24 shadow-md rounded-2xl text-gray-800 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-all"
        >
          <img :src="item.icon" :alt="item.name" class="mx-auto block mb-4" />
          <p class="font-semibold text-center">{{ item.name }}</p>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MENU } from '~/modules/menu'

const debtItems = [
  {
    icon: '/img/steel.png',
    name: 'Tôn - Sắt - Thép',
    path: MENU.DEBT.subMenu.ADD_DEBT_STEEL.path
  },
  {
    icon: '/img/screw.png',
    name: 'Sản Phẩm Khác',
    path: MENU.DEBT.subMenu.ADD_DEBT_SCREW.path
  }
]
</script>
