<template>
  <div>
    <editor
      :value="aboutUs ? aboutUs.value : ''"
      @save="(content) => saveAboutUsContent(content)"
    />
  </div>
</template>

<script setup>
import { computed, defineComponent } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { SITE_SETTING } from '~/modules/constant'

// Store
const siteSettingStore = useSiteSettingStore()

// State
const aboutUs = computed(() => {
  return siteSettingStore.allSetting && siteSettingStore.allSetting.aboutUs
    ? siteSettingStore.allSetting.aboutUs
    : null
})

// Methods
const saveAboutUsContent = async (content) => {
  await siteSettingStore.saveSetting({
    settings: [
      {
        id: aboutUs.value ? aboutUs.value.id : null,
        masterKey: SITE_SETTING.MASTER_KEY.ABOUT_US,
        key: null,
        value: content
      }
    ]
  })
}
</script>

<script>
import Editor from '@/components/common/Editor.vue'

export default defineComponent({
  components: { Editor }
})
</script>
