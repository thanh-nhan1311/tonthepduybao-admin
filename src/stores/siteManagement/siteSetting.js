import { defineStore } from 'pinia'
import { useSiteManagementAPI } from '~/api'
import { useMessage } from '~/compositions'
import { MSG } from '~/modules/constant'

const mc = useMessage()
const siteManagementAPI = useSiteManagementAPI()

export const useSiteSettingStore = defineStore('siteSetting', {
  state: () => ({
    allSetting: null
  }),

  actions: {
    async getAllSetting() {
      const res = await siteManagementAPI.getAllSetting()
      this.allSetting = res.data
    },
    async saveSetting(payload) {
      try {
        await siteManagementAPI.saveSetting(payload)
        await this.getAllSetting()
        mc.success(MSG.SAVE_SUCCESS)
      } catch (error) {
        mc.success(MSG.SAVE_FAILED)
      }
    }
  }
})
