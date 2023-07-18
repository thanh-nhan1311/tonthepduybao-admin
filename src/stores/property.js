import { defineStore } from 'pinia'
import { usePropertyAPI } from '../api'
import { useMessage } from '../composables'
import { MSG } from '../modules/constant'

const mc = useMessage()
const propertyAPI = usePropertyAPI()

export const usePropertyStore = defineStore('propertyStore', {
  state: () => ({
    search: '',
    allProperty: []
  }),

  actions: {
    // Function
    async getAll(payload = { search: '' }) {
      const { data } = await propertyAPI.getAll(payload)
      this.allProperty = data
    },

    async delete(payload) {
      try {
        await propertyAPI.del(payload)
        await this.getAll({ search: this.search })

        mc.success(MSG.DELETE_SUCCESS)
      } catch (error) {
        mc.error(MSG.DELETE_FAILED)
      }
    },

    async create(payload) {
      try {
        await propertyAPI.create(payload)
        await this.getAll({ search: this.search })

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (error) {
        mc.error(MSG.UPDATE_FAILED)
      }
    },

    async update(payload) {
      try {
        await propertyAPI.update(payload)
        await this.getAll({ search: this.search })

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (error) {
        mc.error(MSG.UPDATE_FAILED)
      }
    }
  }
})
