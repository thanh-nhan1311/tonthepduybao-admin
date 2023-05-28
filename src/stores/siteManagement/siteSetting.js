import { defineStore } from 'pinia'
import { useSiteManagementAPI } from '~/api'
import { useMessage } from '~/composables'
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
    async deleteSetting(payload) {
      try {
        await siteManagementAPI.deleteSetting(payload)
        await this.getAllSetting()
        mc.success(MSG.DELETE_SUCCESS)
      } catch (error) {
        mc.error(MSG.DELETE_FAILED)
      }
    },
    async saveSetting(payload, rollback) {
      try {
        await siteManagementAPI.saveSetting(payload)
        await this.getAllSetting()
        mc.success(MSG.SAVE_SUCCESS)
      } catch (error) {
        mc.error(MSG.SAVE_FAILED)
        if (rollback) await rollback()
      }
    }
  }
})
