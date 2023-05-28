import { defineStore } from 'pinia'
import { useMessage } from '~/composables'
import { useSiteManagementAPI } from '~/api'
import { MSG } from '~/modules/constant'

const mc = useMessage()
const siteManagementAPI = useSiteManagementAPI()

export const useSiteContactStore = defineStore('siteContact', {
  state: () => ({
    allContact: []
  }),

  actions: {
    async searchContact(payload) {
      const res = await siteManagementAPI.searchContact({ search: payload })
      this.allContact = res.data
    },
    async resolveContact(id) {
      try {
        await siteManagementAPI.resolveContact(id)

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (err) {
        mc.error(MSG.UPDATE_FAILED)
      }
    },
    async deleteContact(id) {
      try {
        await siteManagementAPI.deleteContact(id)

        mc.success(MSG.DELETE_SUCCESS)
      } catch (err) {
        mc.error(MSG.DELETE_FAILED)
      }
    }
  }
})
