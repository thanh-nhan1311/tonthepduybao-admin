import { defineStore } from 'pinia'
import { searchContactAPI, resolveContactAPI, deleteContactAPI } from '~/api/siteManagementApi'

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
      await resolveContactAPI(id)
      await this.searchContact()
    },
    async deleteContact(id) {
      await deleteContactAPI(id)
      await this.searchContact()
    }
  }
})
