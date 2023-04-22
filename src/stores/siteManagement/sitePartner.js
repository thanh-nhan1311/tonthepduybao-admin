import { defineStore } from 'pinia'
import { useMessage } from '~/compositions'
import { useSiteManagementAPI } from '~/api'
import { MSG } from '~/modules/constant'

const mc = useMessage()
const siteManagementAPI = useSiteManagementAPI()

export const useSitePartnerStore = defineStore('sitePartner', {
  state: () => ({
    allPartner: []
  }),

  actions: {
    async searchPartner(payload) {
      const res = await siteManagementAPI.searchPartner({ search: payload })
      this.allPartner = res.data
    },
    async upsertPartner(payload) {
      try {
        await siteManagementAPI.upsertPartner(payload)
        await this.searchPartner('')

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (err) {
        if (err && err.response && err.response.message) mc.error(err.response.message)
        else mc.error(MSG.UPDATE_FAILED)
      }
    },
    async deletePartner(id) {
      try {
        await siteManagementAPI.deletePartner(id)
        await this.searchPartner('')

        mc.success(MSG.DELETE_SUCCESS)
      } catch (err) {
        mc.error(MSG.DELETE_FAILED)
      }
    }
  }
})
