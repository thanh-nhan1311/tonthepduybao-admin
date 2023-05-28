<template>
  <div class="relative" :style="{ width: `${width || 'atuo'}` }">
    <a-image :src="src" class="shadow-md w-full h-full" :fallback="FALLBACK_IMAGE" />

    <span
      class="absolute -top-4 -right-4 text-5xl bg-white rounded-full text-red-500 z-10 cursor-pointer"
      @click="emits('delete')"
    >
      <close-circle-filled />
    </span>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import { FALLBACK_IMAGE } from '~/modules/constant'

defineProps({
  src: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: false,
    default: null
  }
})

const emits = defineEmits(['delete'])
</script>

<script>
import { CloseCircleFilled } from '@ant-design/icons-vue'

export default defineComponent({
  components: { CloseCircleFilled }
})
</script>
