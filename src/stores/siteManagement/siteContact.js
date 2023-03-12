import { defineStore } from 'pinia'
import { searchContactAPI, resolveContactAPI, deleteContactAPI } from '~/api/siteManagementApi'
import { useMessage } from '~/compositions'
import { MSG } from '~/modules/constant'

const mc = useMessage()

export const useSiteContactStore = defineStore('siteContact', {
  state: () => ({
    allContact: []
  }),

  actions: {
    async searchContact(payload) {
      const res = await searchContactAPI({ search: payload })
      this.allContact = res.data
    },
    async resolveContact(id) {
      try {
        await resolveContactAPI(id)

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (err) {
        mc.success(MSG.UPDATE_FAILED)
      }
    },
    async deleteContact(id) {
      try {
        await deleteContactAPI(id)

        mc.success(MSG.DELETE_SUCCESS)
      } catch (err) {
        mc.success(MSG.DELETE_FAILED)
      }
    }
  }
})
