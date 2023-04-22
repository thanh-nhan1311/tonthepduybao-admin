<template>
  <section>
    <h2 class="w-full mb-4 text-2xl">Cài đặt chung</h2>

    <a-tabs v-model:activeKey="activeTab" type="card">
      <a-tab-pane key="home" tab="Trang chủ">
        <home-setting />
      </a-tab-pane>
      <a-tab-pane key="aboutUs" tab="Về chúng tôi">
        <setting-content
          :value="aboutUsContent"
          :setting-master-key="SITE_SETTING.MASTER_KEY.ABOUT_US"
        />
      </a-tab-pane>
      <a-tab-pane key="contact" tab="Liên hệ">
        <setting-content
          :value="contactUsContent"
          :setting-master-key="SITE_SETTING.MASTER_KEY.CONTACT_US"
        />
      </a-tab-pane>
    </a-tabs>
  </section>
</template>

<script setup>
import { defineComponent, onMounted, ref } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { SITE_SETTING } from '~/modules/constant'

// Store
const siteSettingStore = useSiteSettingStore()

// State
const activeTab = ref('home')
const aboutUsContent = ref('')
const contactUsContent = ref('')

// Mounted
onMounted(async () => {
  await siteSettingStore.getAllSetting()

  const { aboutUs, contactUs } = siteSettingStore.allSetting
  aboutUsContent.value = aboutUs ? aboutUs.value : ''
  contactUsContent.value = contactUs ? contactUs.value : ''
})
</script>

<script>
import HomeSetting from './components/HomeSetting/index.vue'
import SettingContent from './components/SettingContent.vue'

export default defineComponent({
  components: { HomeSetting, SettingContent }
})
</script>
