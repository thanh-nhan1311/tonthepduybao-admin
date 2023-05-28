<template>
  <section>
    <heading title="Cài đặt chung" />

    <a-tabs v-model:activeKey="activeTab" type="card">
      <a-tab-pane key="home" tab="Trang chủ">
        <home-setting />
      </a-tab-pane>
      <a-tab-pane key="aboutUs" tab="Về chúng tôi">
        <home-about-us />
      </a-tab-pane>
    </a-tabs>
  </section>
</template>

<script setup>
import { defineComponent, onMounted, ref } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'

// Store
const siteSettingStore = useSiteSettingStore()

// State
const activeTab = ref('home')

// Mounted
onMounted(async () => {
  await siteSettingStore.getAllSetting()
})
</script>

<script>
import HomeSetting from './HomeSetting/index.vue'
import HomeAboutUs from './HomeAboutUs/index.vue'

export default defineComponent({
  components: { HomeSetting, HomeAboutUs }
})
</script>
