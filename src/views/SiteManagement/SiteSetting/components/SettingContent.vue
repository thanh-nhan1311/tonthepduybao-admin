<template>
  <div>
    <div class="flex items-center justify-between">
      <h4 class="font-semibold">{{ title }}</h4>
      <a-button type="link" class="w-24" @click="save">
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
    <a-textarea v-else v-model:value="content" :rows="3" />
  </div>
</template>

<script setup>
import { defineComponent, defineProps, ref, watch } from 'vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'

// Props
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
  settingMasterKey: {
    type: String,
    required: true
  },
  settingKey: {
    type: String,
    required: false,
    default: ''
  },
  editor: {
    type: Boolean,
    required: false,
    default: true
  }
})

// Store
const siteSettingStore = useSiteSettingStore()

// State
const content = ref(props.value)

// Methods
const save = async () => {
  await siteSettingStore.saveSetting({
    masterKey: props.settingMasterKey,
    key: props.settingKey || null,
    value: content.value
  })
}

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
