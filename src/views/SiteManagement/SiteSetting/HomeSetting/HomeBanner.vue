<template>
  <div>
    <div class="flex items-center justify-between">
      <h4 class="font-semibold mb-0">1. Banner</h4>
      <image-picker :multiple="true" button-type="link" @change="selectBanner" />
    </div>

    <div v-if="banners.length > 0" class="grid grid-cols-4 gap-x-8 mt-4">
      <image-deletable
        v-for="(item, index) of banners"
        :key="index"
        :src="S3_URL + item.value"
        @delete="deleteBanner(item.id, item.value)"
      />
    </div>
    <p v-else class="italic mb-0">Chưa có banners!</p>
  </div>
</template>

<script setup>
import { computed, defineComponent } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { SITE_SETTING } from '~/modules/constant'

// Store
const siteSettingStore = useSiteSettingStore()
const uploadStore = useUploadStore()

// State
const banners = computed(() => {
  if (!siteSettingStore.allSetting) return []
  const { homeBanners } = siteSettingStore.allSetting
  return homeBanners || []
})

// Methods
const selectBanner = async (results) => {
  if (results && results.length > 0) {
    const formData = new FormData()
    formData.append('directory', SITE_SETTING.DIR.BANNER)
    results.forEach((item) => formData.append('files', item.file))

    const endpoints = await uploadStore.upload(formData, false)
    const payload = endpoints.map((item) => ({
      masterKey: SITE_SETTING.MASTER_KEY.HOME,
      key: SITE_SETTING.KEY.BANNER,
      value: item.replace(S3_URL, '')
    }))
    await siteSettingStore.saveSetting({ settings: payload }, async () => {
      for (let i = 0; i < endpoints.length; i++) {
        await uploadStore.delete({ path: endpoints[i] }, false)
      }
    })
  }
}
const deleteBanner = async (id, path) => {
  await uploadStore.delete({ path }, false)
  await siteSettingStore.deleteSetting(id)
}
</script>

<script>
import ImagePicker from '~/components/ImagePicker.vue'
import ImageDeletable from '~/components/ImageDeletable.vue'
import { useUploadStore } from '~/stores/upload'
import { S3_URL } from '~/modules/http'

export default defineComponent({
  components: {
    ImagePicker,
    ImageDeletable
  }
})
</script>
