<template>
  <section>
    <a-row class="flex justify-end items-center mb-4">
      <a-col :span="16">
        <h2 class="text-2xl">Danh sách liên hệ</h2>
      </a-col>
      <a-col :span="8">
        <a-input
          ref="refUsername"
          v-model:value="siteContactStore.search"
          placeholder="Tìm kiếm liên hệ"
          class="mb-2 w-full"
          @keypress.enter="siteContactStore.searchContact()"
        >
          <template #prefix>
            <search-outlined @click="siteContactStore.searchContact()" />
          </template>
        </a-input>
      </a-col>
    </a-row>

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
            <a-button
              v-if="!record.resolvedFlag"
              type="link"
              @click="siteContactStore.resolveContact(record.id)"
            >
              Đã xử lý
            </a-button>
            <a-button
              type="text"
              danger
              class="ml-4"
              @click="siteContactStore.deleteContact(record.id)"
            >
              Xoá
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script>
import { SearchOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { useSiteContactStore } from '~/stores/siteManagement/siteContact'
import { SITE_CONTACT_TABLE_COLUMNS } from '~/modules/table'

export default defineComponent({
  components: {
    SearchOutlined
  },
  setup() {
    const siteContactStore = useSiteContactStore()

    return {
      siteContactStore,
      SITE_CONTACT_TABLE_COLUMNS
    }
  },

  mounted() {
    this.siteContactStore.searchContact()
  }
})
</script>
