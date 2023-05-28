<template>
  <div>
    <div class="flex items-center justify-between">
      <h4 class="font-semibold">{{ title }}</h4>
      <a-button type="link" @click="emits('save', content)">
        <SaveFilled />
        <span>Lưu</span>
      </a-button>
    </div>

    <text-editor
      v-if="editor"
      :content="content"
      toolbar="full"
      @change="(val) => (content = val)"
    />
    <a-textarea v-else v-model:value="content" :rows="5" />
  </div>
</template>

<script setup>
import { defineComponent, ref, watch } from 'vue'

const emits = defineEmits(['save'])
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    type: String,
    required: true
  },
  editor: {
    type: Boolean,
    required: false,
    default: true
  }
})

// State
const content = ref(props.value)

// Watch
watch(
  () => props.value,
  (newValue) => {
    content.value = newValue
  },
  { deep: true }
)
</script>

<script>
import TextEditor from '~/components/TextEditor.vue'
import { SaveFilled } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    SaveFilled,
    TextEditor
  }
})
</script>
