<template>
  <section>
    <heading title="Danh sách đối tác">
      <div class="flex items-center">
        <a-input
          ref="refUsername"
          v-model:value="search"
          placeholder="Tìm kiếm đối tác"
          class="mr-4 w-[400px]"
          @keypress.enter="sitePartnerStore.searchPartner(search)"
        >
          <template #prefix>
            <Iconify icon="ic:outline-search" @click="sitePartnerStore.searchPartner(search)" />
          </template>
        </a-input>

        <a-button type="primary" @click="openModal">Thêm đối tác</a-button>
      </div>
    </heading>

    <a-table :columns="SITE_PARTNER_TABLE_COLUMNS" :data-source="sitePartnerStore.allPartner">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'name'">
          <div class="flex items-center">
            <a-image
              :width="48"
              :src="S3_URL + record.logo"
              :fallback="FALLBACK_IMAGE"
              :preview="false"
            />
            <span class="ml-2">{{ record.name }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record)"> Chỉnh sửa </a-button>
            <a-popconfirm
              title="Bạn có chắc muốn xoá đối tác này không?"
              ok-text="Có"
              cancel-text="Không"
              @confirm="deletePartner(record.id)"
            >
              <a-button type="text" danger class="ml-4"> Xoá </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <upsert-site-partner-modal v-if="isShowModal" :partner="selectedPartner" @close="closeModal" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { SITE_PARTNER_TABLE_COLUMNS } from '~/modules/table'
import { FALLBACK_IMAGE } from '~/modules/constant'
import { useSitePartnerStore } from '~/stores/siteManagement/sitePartner'
import { S3_URL } from '~/modules/http'

// Store
const sitePartnerStore = useSitePartnerStore()

// State
const search = ref('')
const isShowModal = ref(false)
const selectedPartner = ref(null)

// Methods
const openModal = (partner) => {
  selectedPartner.value = partner
  isShowModal.value = true
}
const closeModal = () => {
  selectedPartner.value = null
  isShowModal.value = false
}
const deletePartner = async (id) => {
  await sitePartnerStore.deletePartner(id)
  await sitePartnerStore.searchPartner(search.value)
}

// Hooks
onMounted(() => {
  sitePartnerStore.searchPartner(search.value)
})
</script>
