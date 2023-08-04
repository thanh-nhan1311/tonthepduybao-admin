<template>
  <a-modal v-model:visible="visible" centered width="auto" :footer="false" @cancel="emits('close')">
    <div class="py-8 px-24">
      <h3 class="text-3xl text-center mb-12">
        {{ isCreateFromFile ? 'Thêm công nợ từ file' : 'Chọn cách thêm công nợ' }}
      </h3>
      <div v-if="!isCreateFromFile" class="grid grid-cols-2 gap-x-20 justify-center">
        <div
          class="flex flex-col items-center w-[200px] pt-16 pb-12 bg-slate-200 hover:bg-slate-300 cursor-pointer transition-all rounded-lg"
          @click="router.push(MENU.ADD_DEBT.path)"
        >
          <Iconify icon="lucide:pen-square" width="72px" />
          <span class="mt-4 font-medium">Trên hệ thống</span>
        </div>

        <div
          class="flex flex-col items-center w-[200px] pt-16 pb-12 bg-slate-200 hover:bg-slate-300 cursor-pointer transition-all rounded-lg"
          @click="isCreateFromFile = true"
        >
          <Iconify icon="material-symbols:upload-file" width="72px" />
          <span class="mt-4 font-medium">Từ file</span>
        </div>
      </div>

      <div v-else class="max-w-[640px] min-w-[50vw]">
        <a-divider orientation="left" class="mt-0 mb-4" orientation-margin="20px">
          <span class="text-xl font-medium">Tạo file mẫu</span>
        </a-divider>
        <div>
          <div class="grid grid-cols-8 gap-x-8">
            <a-select
              v-model:value="type"
              :options="Object.values(TYPE)"
              placeholder="Chọn danh mục"
              max-tag-count="responsive"
              class="col-span-2"
              :filter-option="customFilter"
              @change="changeType()"
            />
            <a-select
              v-model:value="propertyIds"
              :options="propertyStore.propertyOptions"
              placeholder="Chọn thuộc tính"
              max-tag-count="responsive"
              class="col-span-4"
              mode="multiple"
              :filter-option="customFilter"
              @change="validateDownloadTemplate"
            />
            <a-button
              type="primary"
              ghost
              size="medium"
              class="col-span-2 w-full"
              @click="downloadTemplateDebt"
            >
              Tạo mẫu công nợ
            </a-button>
          </div>
          <p v-if="templateError" class="text-red-500 text-xl mt-1">{{ templateError }}</p>
        </div>

        <a-divider orientation="left" class="mt-8 mb-4" orientation-margin="20px">
          <span class="text-xl font-medium">Tải file công nợ lên</span>
        </a-divider>

        <div class="flex">
          <label
            for="debtFile"
            class="w-1/5 flex justify-center items-center border border-dashed rounded-lg min-h-[64px] cursor-pointer"
          >
            <input id="debtFile" ref="fileRef" type="file" hidden @change="uploadDebt" />
            <Iconify icon="octicon:plus-16" width="32px" />
          </label>

          <ul v-if="errors && errors.length !== 0" class="w-4/5">
            <li v-for="(item, index) of errors" :key="index" class="text-red-500">{{ item }}</li>
          </ul>
        </div>

        <div class="w-full flex justify-center mt-8">
          <a-button type="default" size="medium" class="px-16" @click="cancel"> Huỷ bỏ </a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from '~/composables'
import { MSG, TYPE, TYPE_KEY } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { customFilter, downloadFromResponse } from '~/modules/utils'
import { useDebtStore } from '~/stores/debt'
import { usePropertyStore } from '~/stores/property'

const router = useRouter()
const emits = defineEmits(['close', 'callback'])

// Store
const mc = useMessage()
const debtStore = useDebtStore()
const propertyStore = usePropertyStore()

// State
const fileRef = ref()
const visible = ref(true)
const isCreateFromFile = ref(false)
const templateError = ref('')
const type = ref(TYPE_KEY.IRON)
const propertyIds = ref([])
const errors = ref([])

// Methods
const validateDownloadTemplate = () => {
  if (!propertyIds.value || propertyIds.value.length === 0) {
    templateError.value = 'Thuộc tính là các trường bắt buộc.'
    return false
  }

  templateError.value = ''
  return true
}
const changeType = async () => {
  await propertyStore.getAll({ type: type.value })
}
const downloadTemplateDebt = async () => {
  const isValidate = validateDownloadTemplate()
  if (isValidate) {
    try {
      const { headers, data } = await debtStore.downloadTemplate({
        type: type.value,
        propertyIds: propertyIds.value.join(',')
      })
      downloadFromResponse(headers, data)

      mc.success(MSG.DOWNLOAD_SUCCESS)
    } catch (error) {
      mc.error(MSG.DOWNLOAD_FAILED)
    }
  }
}
const uploadDebt = async (event) => {
  const files = event.target.files
  if (!files || files.length === 0) {
    mc.error('Vui lòng chọn file.')
  } else {
    try {
      const formData = new FormData()
      formData.append('file', files[0])
      const { data } = await debtStore.createFromFile(formData)
      errors.value = data

      if (!errors.value || errors.value.length === 0) {
        mc.success(MSG.SAVE_SUCCESS)
        emits('callback')
        emits('close')
      }
    } catch (error) {
      mc.error(MSG.SAVE_FAILED)
    }
  }

  if (fileRef.value) fileRef.value.value = ''
}
const cancel = () => {
  type.value = TYPE_KEY.IRON
  propertyIds.value = []
  isCreateFromFile.value = false
  if (fileRef.value) fileRef.value.value = ''
}

// Hooks
onMounted(async () => {
  await changeType()
})
</script>
