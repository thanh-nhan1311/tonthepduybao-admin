<template>
  <div>
    <a-button v-if="!src" :type="buttonType" @click="selectImage">
      <template #icon>
        <UploadOutlined />
      </template>
      <span>Tải lên</span>
    </a-button>

    <input
      ref="imagePickerRef"
      type="file"
      accept="image/*"
      hidden
      :multiple="multiple"
      @change="pickImage"
    />

    <div v-if="src && src.length > 0">
      <div v-if="multiple">
        <image-deletable
          v-for="(item, index) of src"
          :key="index"
          :src="item"
          :width="width"
          @delete="deleteImage"
        />
      </div>
      <image-deletable v-else :src="src[0]" :width="width" @delete="deleteImage" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, toRef } from 'vue'

// Emit events
const emits = defineEmits(['change'])

// Props
const props = defineProps({
  src: {
    type: Object,
    required: false,
    default: null
  },
  width: {
    type: String,
    required: false,
    default: ''
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
  buttonType: {
    type: String,
    required: false,
    default: 'primary'
  }
})

const multipleProp = toRef(props, 'multiple')

// State
const imagePickerRef = ref()

// Methods
const selectImage = () => {
  imagePickerRef.value.click()
}
const deleteImage = () => {
  emits('change', { src: '', file: null })
}
const pickImage = async () => {
  const files = imagePickerRef.value.files

  if (files && files.length !== 0) {
    if (multipleProp.value) {
      const results = []
      for (let i = 0; i < files.length; i++) {
        const fileResult = await renderImage(files[i])
        results.push(fileResult)
      }
      emits('change', results)
    } else {
      const result = await renderImage(files[0])
      emits('change', result)
    }
  }
}

const renderImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve({ src: reader.result, file })
    reader.readAsDataURL(file)
  })
}
</script>
<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import ImageDeletable from './ImageDeletable.vue'

export default defineComponent({
  components: { UploadOutlined, ImageDeletable }
})
</script>
