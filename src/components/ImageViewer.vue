<template>
  <img v-if="scope === 'image'" :src="imageSrc" />
  <a-avatar v-if="scope === 'avatar'" :size="avatarSize" :src="imageSrc">
    <template #icon>
      <Iconify icon="carbon:user-avatar-filled" class="text-white" :width="`${avatarSize}px`" />
    </template>
  </a-avatar>
</template>

<script setup>
import { computed } from 'vue'
import { FALLBACK_IMAGE } from '~/modules/constant'
import { S3_URL } from '~/modules/http'

const props = defineProps({
  hasPrefix: {
    type: Boolean,
    required: false,
    default: false
  },
  scope: {
    type: String,
    required: false,
    default: 'image' // avatar, image
  },
  src: {
    type: String,
    required: false,
    default: FALLBACK_IMAGE
  },
  avatarSize: {
    type: Number,
    required: false,
    default: 160
  }
})

const imageSrc = computed(() => {
  let prefix = props.hasPrefix ? S3_URL : ''
  return props.src ? `${prefix}${props.src}` : null
})
</script>
