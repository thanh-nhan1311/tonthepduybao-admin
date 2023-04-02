<template>
  <section>
    <a-row class="flex justify-end items-center mb-4">
      <a-col :span="16">
        <h2 class="text-2xl">Danh sách đối tác</h2>
      </a-col>
      <a-col :span="8" class="flex items-center">
        <a-input
          ref="refUsername"
          v-model:value="search"
          placeholder="Tìm kiếm đối tác"
          class="mr-4 w-full"
          @keypress.enter="sitePartnerStore.searchPartner(search)"
        >
          <template #prefix>
            <search-outlined @click="sitePartnerStore.searchPartner(search)" />
          </template>
        </a-input>

        <a-button type="primary" @click="openModal">Thêm đối tác</a-button>
      </a-col>
    </a-row>

    <a-table :columns="SITE_PARTNER_TABLE_COLUMNS" :data-source="sitePartnerStore.allPartner">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'name'">
          <div class="flex items-center">
            <a-image :width="100" :height="100" :src="record.logo" />
            <span class="ml-2">{{ record.name }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record.id)"> Chỉnh sửa </a-button>
            <a-button type="text" danger class="ml-4" @click="deletePartner(record.id)">
              Xoá
            </a-button>
          </div>
        </template>
      </template>
    </a-table>

    <upsert-site-partner-modal
      :is-show-modal="isShowModal"
      :partner="selectedPartner"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import UpsertSitePartnerModal from '~/components/modal/UpsertSitePartnerModal.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { SITE_PARTNER_TABLE_COLUMNS } from '~/modules/table'
import { useSitePartnerStore } from '~/stores/siteManagement/sitePartner'

// Store
const sitePartnerStore = useSitePartnerStore()

// State
const search = ref('')
const isShowModal = ref(false)
const selectedPartner = ref(null)

// Methods
const openModal = (id = null) => {
  if (id) {
    const findPartner = sitePartnerStore.allPartner.find((item) => item.id == id)
    if (findPartner) selectedPartner.value = findPartner
  }

  isShowModal.value = true
}
const closeModal = () => {
  selectedPartner.value = null
  isShowModal.value = false
}
const deletePartner = async (id) => {
  await sitePartnerStore.deletePartner(id)
  await sitePartnerStore.searchPartner('')
}

// Hooks
onMounted(() => {
  sitePartnerStore.searchPartner(search.value)
})
</script>

<script>
export default defineComponent({
  components: {
    SearchOutlined,
    UpsertSitePartnerModal
  }
})
</script>
