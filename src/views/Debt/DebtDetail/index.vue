<template>
  <section v-if="debt" class="debt-detail">
    <heading :title="`Mã công nợ: [${debt.id}]`">
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
          @click="router.push(MENU.EDIT_DEBT.path + debt.id)"
        >
          <Iconify icon="mdi:pencil-box-outline" />
          <span class="ml-2">Sửa</span>
        </a-button>

        <a-button type="primary" class="flex items-center ml-4" @click="downloadDebt">
          <Iconify icon="mdi:file-excel" />
          <span class="ml-2">Tải xuống</span>
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
            <span class="font-semibold">{{ moment.dFormat(debt.date) }}</span>
          </div>

          <div class="flex items-center mb-2">
            <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
            <span class="mr-2">Phân loại:</span>
            <span class="font-semibold">{{ DEBT_TYPE[debt.type].name }}</span>
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

      <div class="flex justify-end col-span-4">
        <table class="summary-table w-full h-full">
          <tbody>
            <tr>
              <td class="font-medium">Tổng nhập</td>
              <td>{{ formatCurrency(debt.totalPrice) }}</td>
            </tr>
            <tr v-if="debt.type !== DEBT_TYPE_KEY.SCREW">
              <td class="font-medium">Tổng nhập cây/mét</td>
              <td>{{ formatCurrency(debt.totalUnitPrice) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-between mt-8 mb-4">
      <div>
        <b>Danh sách sản phẩm:</b>
        <span class="font-normal ml-2">{{ debtDetails.length }} sản phẩm</span>
      </div>
      <a-input-search v-model:value="search" placeholder="Tìm kiếm ..." class="mr-4 w-[400px]" />
    </div>

    <a-table
      :columns="columns"
      :data-source="debtDetails"
      :scroll="{ x: 'max-content' }"
      :pagination="false"
      :class="['debt-detail__table', `debt-detail__table--${debt.type.toLowerCase()}`]"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'name'">
          <span class="font-medium">{{ record.name }}</span>
        </template>
        <template v-else-if="column.key === 'branch'">{{ record.branch.name }}</template>
        <template v-else-if="column.key === 'properties'">
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
          <span class="font-medium text-red-400">{{ formatCurrency(record.totalPrice) }}</span>
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
import { NOT_FOUND_PATH, DEBT_TYPE, MSG, DEBT_TYPE_KEY } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { DEBT_FULL_TABLE_COLUMNS, DEBT_SCREW_TABLE_COLUMNS } from '~/modules/table'
import { downloadFromResponse, formatCurrency, normalize } from '~/modules/utils'
import { useCommonStore } from '~/stores/common'
import { useDebtStore } from '~/stores/debt'
import { cloneDeep } from 'lodash'

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
const columns = computed(() => {
  const cols =
    debt.value.type === DEBT_TYPE_KEY.SCREW
      ? cloneDeep(DEBT_SCREW_TABLE_COLUMNS)
      : cloneDeep(DEBT_FULL_TABLE_COLUMNS)
  cols.pop()

  return cols
})

// Methods
const downloadDebt = async () => {
  try {
    const { headers, data } = await debtStore.download({ ids: debt.value.id })
    downloadFromResponse(headers, data)

    mc.success(MSG.DOWNLOAD_SUCCESS)
  } catch (error) {
    mc.error(MSG.DOWNLOAD_FAILED)
  }
}
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
      { name: debt.value.id, path: MENU.DEBT_DETAIL.path + debt.value.id }
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
