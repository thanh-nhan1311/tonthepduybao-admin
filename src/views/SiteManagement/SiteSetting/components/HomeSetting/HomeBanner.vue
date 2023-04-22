<template>
  <div>
    <div class="flex items-center justify-between">
      <h4 class="font-semibold mb-0">1. Banner</h4>
      <image-picker :multiple="true" button-type="link" @change="selectBanner" />
    </div>

    <div v-if="banners.length > 0" class="grid grid-cols-4 gap-4 mt-4">
      <image-deletable
        v-for="(item, index) of banners"
        :key="index"
        :src="item.src"
        @delete="deleteBanner(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, watch } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { useUploadAPI } from '~/api'
import { SITE_SETTING } from '~/modules/constant'

// API
const uploadAPI = useUploadAPI()

// Store
const siteSettingStore = useSiteSettingStore()

// State
const banners = ref([])

// Methods
const selectBanner = async (results) => {
  if (results && results.length > 0) {
    const formData = new FormData()
    formData.append('directory', SITE_SETTING.DIR.BANNER)
    results.forEach((item) => formData.append('files', item.file))

    const res = await uploadAPI.upload(formData)
    if (res && res.data) {
      const value = JSON.stringify([...banners.value.map((item) => item.src), ...res.data])
      siteSettingStore.saveSetting({
        masterKey: SITE_SETTING.MASTER_KEY.HOME,
        key: SITE_SETTING.KEY.BANNER,
        value
      })
    }
  }
}
const deleteBanner = async (index) => {
  await uploadAPI.remove({ path: banners.value[index].src })

  banners.value.splice(index, 1)
  siteSettingStore.saveSetting({
    masterKey: SITE_SETTING.MASTER_KEY.HOME,
    key: SITE_SETTING.KEY.BANNER,
    value: JSON.stringify(banners.value.map((item) => item.src))
  })
}

// Mounted
watch(
  () => siteSettingStore.allSetting,
  (newValue) => {
    const { homeBanners } = newValue

    banners.value =
      homeBanners && homeBanners.value
        ? JSON.parse(homeBanners.value).map((item) => {
            return { src: item, file: null }
          })
        : []
  },
  { deep: true }
)
</script>

<script>
import ImagePicker from '~/components/ImagePicker.vue'
import ImageDeletable from '~/components/ImageDeletable.vue'

export default defineComponent({
  components: {
    ImagePicker,
    ImageDeletable
  }
})
</script>
