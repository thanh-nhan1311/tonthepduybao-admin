import { defineStore } from 'pinia'
import { useMessage } from '~/compositions'
import { MSG } from '~/modules/constant'
import { searchPartnerAPI, upsertPartnerAPI, deletePartnerAPI } from '~/api/siteManagementApi'

const mc = useMessage()

export const useSitePartnerStore = defineStore('sitePartner', {
  state: () => ({
    allPartner: []
  }),

  actions: {
    async searchPartner(payload) {
      const res = await searchPartnerAPI({ search: payload })
      this.allPartner = res.data
    },
    async upsertPartner(payload) {
      try {
        await upsertPartnerAPI(payload)
        await this.searchPartner('')

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (err) {
        if (err && err.response && err.response.message) mc.error(err.response.message)
        else mc.error(MSG.UPDATE_FAILED)
      }
    },
    async deletePartner(id) {
      try {
        await deletePartnerAPI(id)
        await this.searchPartner('')

        mc.success(MSG.DELETE_SUCCESS)
      } catch (err) {
        mc.error(MSG.DELETE_FAILED)
      }
    }
  }
})
