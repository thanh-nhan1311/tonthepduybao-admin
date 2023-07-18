<template>
  <section v-if="debt" class="debt-detail">
    <heading :title="debt.name">
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
          @click="router.push(MENU.EDIT_DEBT_STEEL.path + debt.id)"
        >
          <Iconify icon="mdi:pencil-box-outline" />
          <span class="ml-2">Sửa</span>
        </a-button>

        <a-button type="primary" class="flex items-center ml-4">
          <Iconify icon="mdi:file-excel" />
          <span class="ml-2">Tải xuống</span>
        </a-button>
      </div>
    </heading>

    <div class="grid grid-cols-12 gap-x-8 mt-8">
      <div
        class="grid grid-cols-2 gap-8 col-span-6 border border-solid border-gray-200 rounded-md p-4"
      >
        <div>
          <div class="flex items-center mb-2">
            <Iconify icon="mdi:calendar" class="mr-2" />
            <span class="mr-2">Ngày tạo:</span>
            <span class="font-semibold">{{ moment.dFormat(debt.date) }}</span>
          </div>

          <div class="flex items-center mb-2">
            <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
            <span class="mr-2">Phân loại:</span>
            <span v-if="DEBT_TYPE.STEEL === debt.type" class="font-semibold">Tôn - Sắt - Thép</span>
            <span v-if="DEBT_TYPE.SCREW === debt.type" class="font-semibold">Vật liệu</span>
          </div>

          <div class="flex items-center">
            <Iconify icon="mdi:account" class="mr-2" />
            <span class="mr-2">Nhà cung cấp:</span>
            <span class="font-semibold">{{ debt.customer.name }}</span>
          </div>
        </div>

        <div class="font-medium">
          <div class="flex mb-2">
            <div class="flex">
              <Iconify icon="mdi:calendar" class="mr-2 mt-2" />
              <span class="mr-2">Chỉnh sửa gần đây:</span>
            </div>
            <div class="font-semibold italic">
              {{ moment.mFormat(debt.updatedAt) }} <br />
              bởi {{ debt.updatedBy }}
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 items-center col-span-6">
        <table class="summary-table h-full">
          <tbody>
            <tr>
              <td>Tổng nhập</td>
              <td>{{ formatCurrency(debt.totalImportPrice) }}</td>
            </tr>
            <tr>
              <td>Tổng xuất</td>
              <td>{{ formatCurrency(debt.totalExportPrice) }}</td>
            </tr>
          </tbody>
        </table>

        <table class="summary-table h-full">
          <tbody>
            <tr>
              <td>Tổng nhập cây/mét</td>
              <td>{{ formatCurrency(debt.totalImportUnitPrice) }}</td>
            </tr>
            <tr>
              <td>Tổng xuất cây/mét</td>
              <td>{{ formatCurrency(debt.totalExportUnitPrice) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-between mt-8 mb-4">
      <div>
        <b>Danh sách sản phẩm nhập vào:</b>
        <span class="font-normal ml-2">{{ debtDetails.length }} sản phẩm</span>
      </div>
      <a-input-search v-model:value="search" placeholder="Tìm kiếm ..." class="mr-4 w-[400px]" />
    </div>

    <a-table
      :columns="DEBT_DETAIL_STEEL_TABLE_COLUMNS"
      :data-source="debtDetails"
      :scroll="{ x: 'max-content' }"
      :pagination="false"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'name'">
          <span class="font-medium">{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'propertyDetails'">
          <div
            v-for="(propDetail, propIndex) of record.propertyDetails"
            :key="propDetail.id"
            :class="['flex items-center', propIndex !== 0 && 'mt-2']"
          >
            <span class="mr-2">{{ propDetail.property.name }}:</span>
            <a-tag class="font-semibold" color="blue">{{ propDetail.name }}</a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'unitPrice'">
          {{ formatCurrency(record.unitPrice) }}
        </template>
        <template v-else-if="column.key === 'totalUnitPrice'">
          <span class="font-medium text-red-400">{{ formatCurrency(record.totalUnitPrice) }}</span>
        </template>
        <template v-else-if="column.key === 'totalPrice'">
          <span class="font-semibold">{{ formatCurrency(record.totalPrice) }}</span>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="isShowConfirm"
      ok-text="Có"
      cancel-text="Không"
      :centered="true"
      :ok-button-props="{
        type: 'primary',
        danger: true,
        class: 'px-10'
      }"
      @ok="deleteDebt"
    >
      <template #title>
        <div class="flex items-center">
          <Iconify icon="ph:warning-fill" class="text-red-500 mr-4" width="20px" />
          <span>Bạn có chắc muốn xoá công nợ này không?</span>
        </div>
      </template>
      <p class="m-2">Lưu ý, khi xoá công nợ, các dữ liệu liên quan sau đây cũng sẽ bị xoá theo:</p>
      <ul class="mb-0">
        <li>Danh sách sản phẩm nhập vào</li>
        <li>Danh sách sản phẩm xuất đi</li>
      </ul>
    </a-modal>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { NOT_FOUND_PATH, DEBT_TYPE, MSG } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { DEBT_DETAIL_STEEL_TABLE_COLUMNS } from '~/modules/table'
import { formatCurrency, normalize } from '~/modules/utils'
import { useCommonStore } from '~/stores/common'
import { useDebtStore } from '~/stores/debt'

const route = useRoute()
const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const debtStore = useDebtStore()
const commonStore = useCommonStore()

// State
const search = ref('')
const isShowConfirm = ref(false)

const debt = computed(() => debtStore.debt)
const debtDetails = computed(() => {
  const searchParam = normalize(search.value.toLowerCase())
  return debt.value.debtDetails.filter((item) =>
    normalize(item.name.toLowerCase()).includes(searchParam)
  )
})

// Methods
const deleteDebt = async () => {
  try {
    await debtStore.delete(debt.value.id)
    isShowConfirm.value = false

    mc.success(MSG.DELETE_SUCCESS)
    router.push(MENU.DEBT.path)
  } catch (error) {
    mc.error(MSG.DELETE_FAILED)
  }
}

// Hooks
onMounted(async () => {
  const { id } = route.params
  if (!id) router.push(NOT_FOUND_PATH)

  try {
    await debtStore.get(id)

    commonStore.setBreadcrumbs([
      MENU.DEBT,
      { name: debt.value.name, path: MENU.DEBT_DETAIL.path + debt.value.id }
    ])
  } catch (error) {
    router.push(MENU.DEBT.path)
  }
})

onUnmounted(() => {
  commonStore.setBreadcrumbs([])
})
</script>

<style lang="scss">
@import './style.scss';
</style>
