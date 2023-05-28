<template>
  <section>
    <home-banner />

    <editor
      title="2. Về chúng tôi"
      class="mt-8"
      :value="homeSetting.aboutUs ? homeSetting.aboutUs.value : ''"
      :editor="false"
      @save="(content) => saveContent(homeSetting.aboutUs, content, SITE_SETTING.KEY.ABOUT_US)"
    />

    <home-product-category />

    <editor
      title="4. Đối tác"
      class="mt-8"
      :editor="false"
      :value="homeSetting.partner ? homeSetting.partner.value : ''"
      @save="(content) => saveContent(homeSetting.partner, content, SITE_SETTING.KEY.PARTNER)"
    />

    <editor
      title="5. Liên hệ"
      class="mt-8"
      :editor="false"
      :value="homeSetting.contactUs ? homeSetting.contactUs.value : ''"
      @save="(content) => saveContent(homeSetting.contactUs, content, SITE_SETTING.KEY.CONTACT_US)"
    />
  </section>
</template>

<script setup>
import { computed, defineComponent } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { SITE_SETTING } from '~/modules/constant'

// Store
const siteSettingStore = useSiteSettingStore()

// State
const homeSetting = computed(() => {
  if (!siteSettingStore.allSetting)
    return {
      aboutUs: null,
      partner: null,
      contactUs: null
    }

  const allSetting = siteSettingStore.allSetting
  return {
    aboutUs: allSetting.homeAboutUs || null,
    partner: allSetting.homePartner || null,
    contactUs: allSetting.homeContactUs || null
  }
})

// Methods
const saveContent = async (setting, content, key) => {
  await siteSettingStore.saveSetting({
    settings: [
      {
        id: setting ? setting.id : null,
        masterKey: SITE_SETTING.MASTER_KEY.HOME,
        key,
        value: content
      }
    ]
  })
}
</script>

<script>
import HomeBanner from './HomeBanner.vue'
import Editor from '@/components/common/Editor.vue'
import HomeProductCategory from './HomeProductCategory.vue'

export default defineComponent({
  components: {
    Editor,
    HomeBanner,
    HomeProductCategory
  }
})
</script>
