<template>
  <section>
    <home-banner />

    <setting-content
      v-model:value="aboutUsContent"
      title="2. Về chúng tôi"
      class="mt-8"
      :setting-key="SITE_SETTING.KEY.ABOUT_US"
      :setting-master-key="SITE_SETTING.MASTER_KEY.HOME"
    />

    <div class="mt-8">
      <div class="flex items-center justify-between">
        <h4 class="font-semibold mb-0">3. Danh mục sản phẩm kinh doanh</h4>

        <a-button type="link" @click="isShowModal = true">
          <template #icon>
            <PlusCircleOutlined />
          </template>
          <span>Thêm</span>
        </a-button>
      </div>
    </div>

    <setting-content
      title="4. Đối tác"
      class="mt-8"
      :value="partnerContent"
      :setting-key="SITE_SETTING.KEY.PARTNER"
      :setting-master-key="SITE_SETTING.MASTER_KEY.HOME"
    />

    <setting-content
      title="5. Liên hệ"
      class="mt-8"
      :value="contactUsContent"
      :setting-key="SITE_SETTING.KEY.CONTACT_US"
      :setting-master-key="SITE_SETTING.MASTER_KEY.HOME"
    />

    <upsert-home-category-modal :is-show-modal="isShowModal" @close="isShowModal = false" />
  </section>
</template>

<script setup>
import { defineComponent, ref, watch } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { SITE_SETTING } from '~/modules/constant'

// Store
const siteSettingStore = useSiteSettingStore()

// State
const aboutUsContent = ref('')
const partnerContent = ref('')
const contactUsContent = ref('')
const isShowModal = ref(false)

// Mounted
watch(
  () => siteSettingStore.allSetting,
  (newValue) => {
    const { homeAboutUs, homePartner, homeContactUs } = newValue

    aboutUsContent.value = homeAboutUs ? homeAboutUs.value : ''
    partnerContent.value = homePartner ? homePartner.value : ''
    contactUsContent.value = homeContactUs ? homeContactUs.value : ''
  },
  { deep: true }
)
</script>

<script>
import HomeBanner from './HomeBanner.vue'
import SettingContent from '../SettingContent.vue'
import UpsertHomeCategoryModal from './UpsertHomeCategoryModal.vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    PlusCircleOutlined,
    HomeBanner,
    SettingContent,
    UpsertHomeCategoryModal
  }
})
</script>
