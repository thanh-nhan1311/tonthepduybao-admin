<template>
  <section v-if="product" class="product-detail">
    <heading :title="`Sản phẩm: ${product.name}`">
      <div class="flex items-center">
        <a-button
          type="primary"
          danger
          class="flex items-center px-8"
          @click="isShowConfirm = true"
        >
          <Iconify icon="mdi:trash-can" />
          <span class="ml-2">Xoá</span>
        </a-button>

        <a-button
          type="primary"
          class="flex items-center px-8 ml-4"
          @click="router.push(MENU.EDIT_PRODUCT.path + product.id)"
        >
          <Iconify icon="mdi:pencil-box-outline" />
          <span class="ml-2">Sửa</span>
        </a-button>
      </div>
    </heading>

    <div class="grid grid-cols-12 gap-x-8 mt-8">
      <div
        class="grid grid-cols-2 gap-8 col-span-8 border border-solid border-gray-200 rounded-md p-4"
      >
        <div>
          <div class="flex items-center mb-2">
            <Iconify icon="mdi:calendar" class="mr-2" />
            <span class="mr-2">Ngày tạo:</span>
            <span class="font-semibold">{{ moment.dFormat(product.date) }}</span>
          </div>

          <div class="flex items-center mb-2">
            <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
            <span class="mr-2">Phân loại:</span>
            <span class="font-semibold">{{ TYPE[product.type].label }}</span>
          </div>

          <div class="flex items-center">
            <Iconify icon="mdi:store-marker-outline" class="mr-2" />
            <span class="mr-2">Chi nhánh:</span>
            <span class="font-semibold">{{ product.branch.name }}</span>
          </div>
        </div>

        <div class="font-medium">
          <div class="flex mb-2">
            <div class="flex">
              <Iconify icon="mdi:calendar" class="mr-2 mt-2" />
              <span class="mr-2">Chỉnh sửa gần đây:</span>
            </div>
            <div class="font-semibold italic">
              {{ moment.mFormat(product.updatedAt) }} <br />
              bởi {{ product.updatedBy }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end col-span-4">
        <table class="summary-table w-full h-full">
          <tbody>
            <tr>
              <td class="font-medium">Số lượng</td>
              <td>{{ product.quantity }}</td>
            </tr>
            <tr>
              <td class="font-medium">Thuộc tính</td>
              <td>{{ product.properties.map(item => item.name).join(', ') }}</td>
            </tr>
            <tr v-if="product.type === TYPE_KEY.CORRUGATED">
              <td class="font-medium">Khổ/quy cách (mm)</td>
              <td>{{ product.size }}</td>
            </tr>
            <tr v-if="product.type === TYPE_KEY.CORRUGATED">
              <td class="font-medium">Diện tích (m2)</td>
              <td>{{ product.sizeCalculator }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <a-modal
      :visible="isShowConfirm"
      @update:visible="isShowConfirm = $event"
      ok-text="Có"
      cancel-text="Không"
      :centered="true"
      :ok-button-props="{
        type: 'primary',
        danger: true,
        class: 'px-10'
      }"
      @ok="deleteProduct"
    >
      <div class="flex items-center">
        <Iconify icon="ph:warning-fill" class="text-red-500 mr-4" width="20px" />
        <span>Bạn có chắc muốn xoá sản phẩm này không?</span>
      </div>
    </a-modal>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { MSG, NOT_FOUND_PATH, TYPE, TYPE_KEY } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { useCommonStore } from '~/stores/common'
import { useProductStore } from '~/stores/product'

const route = useRoute()
const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const productStore = useProductStore()
const commonStore = useCommonStore()

// State
const isShowConfirm = ref(false)

const product = computed(() => productStore.product)

const deleteProduct = async () => {
  try {
    await productStore.del(product.value.id)
    isShowConfirm.value = false

    mc.success(MSG.DELETE_SUCCESS)
    router.push(MENU.PRODUCT.path)
  } catch (error) {
    if (import.meta.env && import.meta.env.MODE === 'development') console.log(error)
    mc.error(MSG.DELETE_FAILED)
  }
}

// Hooks
onMounted(async () => {
  const { id } = route.params
  if (!id) router.push(NOT_FOUND_PATH)

  try {
    await productStore.get(id)

    commonStore.setBreadcrumbs([
      MENU.PRODUCT,
      { name: product.value.name, path: MENU.PRODUCT_DETAIL.path + product.value.id }
    ])
  } catch (error) {
    router.push(MENU.PRODUCT.path)
  }
})

onUnmounted(() => {
  commonStore.setBreadcrumbs([])
})
</script>

<style lang="scss">
@import './style.scss';
</style>
