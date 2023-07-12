<template>
  <a-modal
    v-model:visible="commonStore.isShowSelectDebtTypeModal"
    centered
    width="auto"
    ok-text="Chỉnh sửa"
    cancel-text="Đóng"
    :footer="false"
    @cancel="commonStore.setShowSelectDebtTypeModal(false)"
  >
    <div class="py-8">
      <h3 class="text-3xl text-center mb-12">Chọn Mục Sản Phẩm Cho Công Nợ</h3>
      <div class="flex justify-center">
        <div
          v-for="(item, index) of debtItems"
          :key="index"
          class="mx-16 py-8 px-16 shadow-md rounded-2xl text-gray-800 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-all"
          @click="routeTo(item.path)"
        >
          <img :src="item.icon" :alt="item.name" class="mx-auto block mb-2 scale-75" />
          <p class="font-semibold text-center">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { MENU } from '~/modules/menu'
import { useCommonStore } from '~/stores/common'

const router = useRouter()

// Store
const commonStore = useCommonStore()

// State
const debtItems = [
  {
    icon: '/img/steel.png',
    name: 'Tôn - Sắt - Thép',
    path: MENU.ADD_DEBT_STEEL.path
  },
  {
    icon: '/img/screw.png',
    name: 'Vật liệu',
    path: MENU.ADD_DEBT_SCREW.path
  }
]

// Methods
const routeTo = (path) => {
  commonStore.setShowSelectDebtTypeModal(false)
  router.push(path)
}
</script>
