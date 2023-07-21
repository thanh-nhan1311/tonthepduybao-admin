<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="40vw"
    :title="`${isEdit ? 'Sửa' : 'Thêm'} thuộc tính`"
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
        <a-input v-model:value="formState.name" :tabindex="0" />
      </a-form-item>

      <a-form-item
        v-for="(item, index) of formState.properties.filter((item) => !item.deleted)"
        :key="index"
        :label="`Giá trị ${index + 1}`"
        :name="['properties', index, 'name']"
        :rules="[{ required: true, validator: defEmptyPropertyDetailName, trigger: 'change' }]"
      >
        <div class="flex items-center">
          <a-input v-model:value="item.name" :tabindex="index + 1" />
          <a-button
            v-if="!item.used"
            type="link"
            danger
            class="flex items-center"
            @click="deletePropertyDetail(item.id, index)"
          >
            <Iconify icon="mdi:trash-can" width="20px" />
          </a-button>
        </div>
      </a-form-item>
      <a-form-item class="" :wrapper-col="{ span: 8, offset: 6 }">
        <a-button
          type="dashed"
          block
          class="flex items-center justify-center"
          @click="addPropertyDetail"
        >
          <Iconify icon="ic:round-plus" width="24px" />
          Thêm giá trị thuộc tính
        </a-button>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnSubmitRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { onMounted, ref, toRef } from 'vue'
import { defEmptyPropertyName, defEmptyPropertyDetailName } from '~/modules/formRule'
import { cloneDeep, isNil } from 'lodash'
import { PROP_DEF } from '~/modules/constant'
import { usePropertyStore } from '~/stores/property'

const emits = defineEmits(['close'])
const props = defineProps({
  property: PROP_DEF.OBJECT
})
const propertyProp = toRef(props, 'property')

// Store
const propertyStore = usePropertyStore()

// State
const visible = ref(true)
const isEdit = ref(false)
const initialFormState = {
  id: null,
  name: null,
  properties: []
}
let btnSubmitRef = ref()
let formRef = ref()
const formState = ref(cloneDeep(initialFormState))

// Methods
const formSubmit = async () => {
  const { id, name, properties } = formState.value
  if (isEdit.value) {
    await propertyStore.update({
      id,
      name,
      properties: properties.map((item) => ({
        id: item.id,
        name: item.name,
        deleted: item.deleted
      }))
    })
  } else {
    await propertyStore.create({
      name,
      properties: properties.map((item) => item.name)
    })
  }

  reset()
  emits('close')
}
const submit = () => btnSubmitRef.value.$el.click()
const reset = () => {
  formState.value = cloneDeep(initialFormState)
  formRef.value.resetFields()
}
const addPropertyDetail = () => {
  formState.value.properties.push({
    id: null,
    name: '',
    used: false,
    deleted: false
  })
}
const deletePropertyDetail = (id, index) => {
  if (!isNil(id)) {
    formState.value.properties = formState.value.properties.map((item) => {
      if (item.id === id) return { ...item, deleted: true }
      return item
    })
  } else {
    formState.value.properties.splice(index, 1)
  }
}

// Hooks
onMounted(() => {
  isEdit.value = !isNil(propertyProp.value)
  if (isEdit.value) {
    formState.value = {
      id: propertyProp.value.id,
      name: propertyProp.value.name,
      properties: propertyProp.value.items.map((item) => ({ ...item, deleted: false }))
    }
  } else reset()
})
</script>
