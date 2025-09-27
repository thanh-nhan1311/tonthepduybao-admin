<template>
  <QuillEditor
    v-model="content"
    content-type="html"
    :theme="theme"
    :toolbar="toolbar"
    :modules="modules"
  />
</template>
<script setup>
import { computed, defineComponent } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

QuillEditor.props.globalOptions.default = () => {
  return { debug: 'error' }
}

// Emits
const emits = defineEmits(['change'])

// Props
const props = defineProps({
  content: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: false,
    default: 'snow'
  },
  toolbar: {
    type: String,
    required: false,
    default: 'essential'
  }
})

const content = computed({
  get: () => props.content,
  set: (value) => emits('change', value)
})

// Variables
const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file) => {
      //return new Promise((resolve, reject) => {
      return new Promise((resolve) => {
        const formData = new FormData()
        formData.append('image', file)

        resolve('')
      })
    }
  }
}
</script>

<script>
export default defineComponent({
  components: {
    QuillEditor
  }
})
</script>
