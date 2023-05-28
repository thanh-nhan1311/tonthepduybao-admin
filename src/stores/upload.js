import { defineStore } from 'pinia'
import { useMessage } from '../composables'
import { useUploadAPI } from '../api'
import { MSG } from '../modules/constant'

const mc = useMessage()
const uploadAPI = useUploadAPI()

export const useUploadStore = defineStore('uploadStore', {
  actions: {
    async upload(formData, showMsg = true) {
      try {
        const { data } = await uploadAPI.upload(formData)
        if (showMsg) mc.success(MSG.DELETE_UPLOAD_SUCCESS)
        return data
      } catch (error) {
        if (showMsg) mc.error(MSG.UPLOAD_FAILED)
      }
    },

    async delete(payload, showMsg = true) {
      try {
        await uploadAPI.remove(payload)
        if (showMsg) mc.success(MSG.DELETE_UPLOAD_SUCCESS)
      } catch (error) {
        if (showMsg) mc.error(MSG.DELETE_UPLOAD_FAILED)
      }
    }
  }
})
