<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="40vw"
    title="Thêm thuộc tính"
    ok-text="Lưu"
    cancel-text="Đóng"
    @ok="submit"
    @cancel="emits('close')"
  >
    <a-form
      ref="formRef"
      v-bind="{
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }"
      :model="formState"
      @finish="formSubmit"
    >
      <a-form-item
        has-feedback
        label="Tên thuộc tính"
        name="name"
        :rules="[{ required: true, validator: defEmptyPropertyName, trigger: 'change' }]"
      >
        <template #label>sdfsdf</template>
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-row :gutter="10" class="flex items-center mb-4">
        <a-col :span="6"><h4 class="mb-0">Danh sách giá trị</h4></a-col>
        <a-col :span="18" class="flex justify-end">
          <a-button type="primary" ghost @click="addProperty">Thêm</a-button>
        </a-col>
      </a-row>

      <a-form-item
        v-for="(item, index) of formState.properties"
        :key="index"
        has-feedback
        :label="`Thuộc tính ${index + 1}`"
        :name="['properties', index, 'name']"
        :rules="[{ required: true, validator: defEmptyPropertyDetailName, trigger: 'change' }]"
      >
        <div class="flex items-center">
          <a-input v-model="item.name" />
          <a-button type="link" danger @click="removeProperty(index)">
            <Iconify icon="mdi:close-circle" class="text-2xl" />
          </a-button>
        </div>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnSubmitRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'
import { defEmptyPropertyName, defEmptyPropertyDetailName } from '~/modules/formRule'
import { cloneDeep } from 'lodash'

// Emits
const emits = defineEmits(['close'])

// State
const visible = true
const initialFormState = {
  id: null,
  name: null,
  properties: [{ id: null, name: '' }]
}
let btnSubmitRef = ref()
let formRef = ref()
const formState = ref(cloneDeep(initialFormState))

// Methods
const formSubmit = () => {
  const { id, name, logoFile } = formState.value

  const formData = new FormData()
  if (id) formData.append('id', id)
  formData.append('category', name)
  formData.append('image', logoFile)

  reset()
  emits('close')
}
const submit = () => btnSubmitRef.value.$el.click()
const reset = () => {
  formState.value = cloneDeep(initialFormState)
  formRef.value.resetFields()
}
const addProperty = () => {
  formState.value.properties.push({ id: null, name: '' })
}
const removeProperty = (index) => {
  formState.value.properties.splice(index, 1)
}
</script>
