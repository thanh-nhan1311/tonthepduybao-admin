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
        has-feedback
        label="Danh mục"
        name="type"
        :rules="[{ required: true, validator: defEmptyCategory, trigger: 'change' }]"
      >
        <a-select v-model:value="formState.type" :options="Object.values(TYPE)" :tabindex="0" />
      </a-form-item>

      <div class="max-h-[400px] overflow-y-auto custom-scroll">
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
      </div>

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
import {
  defEmptyCategory,
  defEmptyPropertyName,
  defEmptyPropertyDetailName
} from '~/modules/formRule'
import { cloneDeep, isNil } from 'lodash'
import { MSG, PROP_DEF, TYPE, TYPE_KEY } from '~/modules/constant'
import { usePropertyStore } from '~/stores/property'
import { useMessage } from '~/composables'

const emits = defineEmits(['close', 'callback'])
const props = defineProps({
  property: PROP_DEF.OBJECT
})
const propertyProp = toRef(props, 'property')

// Store
const mc = useMessage()
const propertyStore = usePropertyStore()

// State
const visible = ref(true)
const isEdit = ref(false)
const initialFormState = {
  id: null,
  name: null,
  type: TYPE_KEY.IRON,
  properties: []
}
let btnSubmitRef = ref()
let formRef = ref()
const formState = ref(cloneDeep(initialFormState))

// Methods
const formSubmit = async () => {
  const { id, name, type, properties } = formState.value

  if (isEdit.value) {
    try {
      await propertyStore.update({
        id,
        name,
        type,
        properties: properties.map((item) => ({
          id: item.id,
          name: item.name,
          deleted: item.deleted
        }))
      })

      mc.success(MSG.UPDATE_SUCCESS)
    } catch (error) {
      mc.error(MSG.UPDATE_FAILED)
    }
  } else {
    try {
      await propertyStore.create({
        name,
        type,
        properties: properties.map((item) => item.name)
      })

      mc.success(MSG.SAVE_SUCCESS)
    } catch (error) {
      mc.error(MSG.SAVE_FAILED)
    }
  }

  reset()
  emits('callback')
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
      type: propertyProp.value.type,
      name: propertyProp.value.name,
      properties: propertyProp.value.items.map((item) => ({ ...item, deleted: false }))
    }
  } else reset()
})
</script>
