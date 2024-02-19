<template>
  <section class="list-debt">
    <heading :title="MENU.PRODUCT.name">
      <div class="flex items-center">
        <a-input-search
          v-model:value="filter.search"
          placeholder="Tìm kiếm sản phẩm ..."
          class="mr-4 w-[400px]"
          @keypress.enter="init(currentPage)"
        />

        <a-button
          type="primary"
          class="flex items-center"
          @click="router.push(MENU.CREATE_PRODUCT.path)"
        >
          <Iconify icon="mdi:plus-circle" width="16px" />
          <span class="ml-2">Thêm sản phẩm</span>
        </a-button>

        <a-button
          v-if="selectedDebt.length !== 0"
          type="primary"
          class="flex items-center ml-4"
          @click="downloadDebt(selectedDebt)"
        >
          <Iconify icon="mdi:file-excel" />
          <span class="ml-2">Tải xuống</span>
        </a-button>
      </div>
    </heading>

    <div
      v-if="isFiltering"
      class="mt-8 mb-4 flex border border-solid border-neutral-200 rounded-md justify-between p-4"
    >
      <div>
        <p class="mb-1">Tiêu chí tìm kiếm:</p>
        <div class="mb-0 pl-8">
          <p v-if="filter.search" class="mb-1">
            Nội dung: <span class="font-semibold">{{ filter.search }}</span>
          </p>

          <div v-if="filter.type && filter.type.length !== 0" class="flex items-center">
            <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
            <span class="mr-2">Phân loại:</span>
            <span class="font-semibold">{{ selectedType }}</span>
          </div>

          <div v-if="filter.branchId && filter.branchId.length !== 0" class="flex items-center">
            <div class="flex items-center">
              <Iconify icon="mdi:account" class="mr-2" />
              <span class="mr-2">Nhà cung cấp:</span>
              <span class="font-semibold">{{ selectedBranch }}</span>
            </div>
          </div>
        </div>
      </div>

      <a-button v-if="isFiltering" type="primary" class="flex items-center" @click="reset">
        <Iconify icon="tabler:zoom-reset" width="16px" />
        <span class="ml-2">Làm mới</span>
      </a-button>
    </div>

    <p class="text-red-500 font-semibold mb-2 mt-4">
      Tổng số: {{ productStore.allProduct.totalItems }} sản phẩm
    </p>

    <a-table
      :row-key="(record) => record.id"
      :columns="LIST_PRODUCT_TABLE_COLUMNS"
      :scroll="{ x: 'max-content' }"
      :row-selection="rowSelection"
      :pagination="{
        current: currentPage,
        total: productStore.allProduct.totalItems,
        pageSize: productStore.allProduct.pageSize,
        onChange: init
      }"
      :data-source="products"
      row-class-name="cursor-pointer"
    >
      <template #headerCell="{ title, column }">
        <template v-if="column.key === 'branch'">
          <div class="flex items-center">
            <a-popover
              trigger="click"
              placement="bottom"
              overlay-class-name="list-debt-customer-popover"
            >
              <template #content>
                <a-checkbox-group
                  v-if="branchStore.branchOptions.length !== 0"
                  v-model:value="filter.branchId"
                  :options="branchStore.branchOptions"
                  class="flex flex-col"
                  @change="init(currentPage)"
                />
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>

        <template v-if="column.key === 'type'">
          <div class="flex items-center">
            <a-popover
              trigger="click"
              placement="bottom"
              overlay-class-name="list-debt-customer-popover"
            >
              <template #content>
                <div class="px-4 py-2">
                  <a-checkbox-group
                    v-model:value="filter.type"
                    :options="Object.values(TYPE)"
                    class="flex flex-col"
                    @change="init(currentPage)"
                  />
                </div>
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span class="font-bold">{{ record.id }}</span>
        </template>
        <template v-else-if="column.key === 'branch'">
          <span>{{ record.branch.name }}</span>
        </template>
        <template v-else-if="column.key === 'type'">
          <span>{{ TYPE[record.type].label }}</span>
        </template>
        <template v-else-if="column.key === 'lastModified'">
          <div class="mb-1 flex items-center">
            <Iconify icon="mdi:account" />
            <span class="ml-2">{{ record.updatedBy }}</span>
          </div>
          <div class="mb-0 text-base text-gray-600 italic flex items-center">
            <Iconify icon="mdi:clock-time-four" width="13px" />
            <span class="ml-2">{{ moment.mFormat(record.updatedAt) }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="flex items-center">
            <a-button type="link" @click="router.push(MENU.PRODUCT_DETAIL.path + record.id)">
              <Iconify icon="mdi:eye" width="24px" />
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { cloneDeep } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { MSG, PAGING, TYPE } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { LIST_PRODUCT_TABLE_COLUMNS } from '~/modules/table'
import { downloadFromResponse } from '~/modules/utils'
import { useBranchStore } from '~/stores/branch'
import { useProductStore } from '~/stores/product'

const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const productStore = useProductStore()
const branchStore = useBranchStore()

// State
const initialFilter = {
  search: '',
  type: [],
  branchId: []
}
const filter = ref(cloneDeep(initialFilter))
const currentPage = ref(PAGING.DEFAULT_PAGE)
const selectedDebt = ref([])

const rowSelection = ref({
  key: 'id',
  onChange: (selectedRowKeys) => {
    selectedDebt.value = selectedRowKeys
  }
})

const products = computed(() => (productStore.allProduct ? productStore.allProduct.data : []))
const selectedBranch = computed(() =>
  branchStore.allBranch
    .filter((item) => filter.value.branchId.includes(item.id))
    .map((item) => item.name)
    .join(', ')
)
const selectedType = computed(() =>
  Object.values(TYPE)
    .filter((item) => filter.value.type.includes(item.id))
    .map((item) => item.name)
    .join(', ')
)
const isFiltering = computed(() => {
  const { search, branchId, type } = filter.value

  return search || branchId.length !== 0 || type.length !== 0
})

// Methods
const init = async (page = PAGING.DEFAULT_PAGE, pageSize = PAGING.DEFAULT_PAGE_SIZE) => {
  currentPage.value = page

  const { search, branchId, type } = filter.value
  await productStore.getAll({
    search,
    branchId: branchId.join(','),
    type: type.join(','),
    page,
    pageSize
  })
}
const downloadDebt = async (ids) => {
  try {
    const { headers, data } = await productStore.download({ ids: ids.join(',') })
    downloadFromResponse(headers, data)

    mc.success(MSG.DOWNLOAD_SUCCESS)
  } catch (error) {
    mc.error(MSG.DOWNLOAD_FAILED)
  }
}

const reset = () => {
  filter.value = cloneDeep(initialFilter)

  init()
}

onMounted(async () => {
  await init(currentPage.value)
  await branchStore.getAll()
})
</script>

<style lang="scss">
@import './style.scss';
</style>
