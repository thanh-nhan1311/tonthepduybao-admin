<template>
  <section>
    <heading title="Danh sách liên hệ">
      <a-input
        ref="refUsername"
        v-model:value="search"
        placeholder="Tìm kiếm liên hệ"
        class="mb-2 w-[400px]"
        @keypress.enter="siteContactStore.searchContact(search)"
      >
        <template #prefix>
          <Iconify icon="ic:outline-search" @click="siteContactStore.searchContact(search)" />
        </template>
      </a-input>
    </heading>

    <a-table :columns="SITE_CONTACT_TABLE_COLUMNS" :data-source="siteContactStore.allContact">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-if="column.key === 'email'">
          <a :href="`mailto:${record.email}`" target="_blank" rel="noopener noreferrer">
            {{ record.email }}
          </a>
        </template>
        <template v-else-if="column.key === 'resolvedFlag'">
          <span>
            <a-tag :color="record.resolvedFlag ? 'green' : 'blue'">
              {{ record.resolvedFlag ? 'Đã xử lý' : 'Liên hệ mới' }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a :href="`mailto:${record.email}`" target="_blank" rel="noopener noreferrer">
              Tư vấn
            </a>
            <a-button
              v-if="!record.resolvedFlag"
              type="link"
              class="ml-4"
              @click="resolveContact(record.id)"
            >
              Đã xử lý
            </a-button>
            <a-button type="text" danger class="ml-4" @click="deleteContact(record.id)">
              Xoá
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSiteContactStore } from '@/stores/siteManagement/siteContact'
import { SITE_CONTACT_TABLE_COLUMNS } from '~/modules/table'

// Store
const siteContactStore = useSiteContactStore()

// State
const search = ref('')

// Methods
const resolveContact = async (id) => {
  await siteContactStore.resolveContact(id)
  await siteContactStore.searchContact(search.value)
}
const deleteContact = async (id) => {
  await siteContactStore.deleteContact(id)
  await siteContactStore.searchContact(search.value)
}

// Hooks
onMounted(() => {
  siteContactStore.searchContact(search.value)
})
</script>
