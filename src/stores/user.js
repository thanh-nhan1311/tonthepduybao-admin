import { defineStore } from 'pinia'
import { useUserAPI } from '~/api'

const userAPI = useUserAPI()

export const useUserStore = defineStore('userStore', {
  state: () => ({
    me: null,
    user: null,
    allUser: [],
    allRole: []
  }),

  getters: {
    roleOptions() {
      return this.allRole.map((role) => ({
        label: role.name,
        value: role.id
      }))
    }
  },

  actions: {
    async getMe() {
      const { data } = await userAPI.getMe()
      this.me = data
    },

    async get(id) {
      const { data } = await userAPI.get(id)
      this.user = data
    },

    async getAll(payload) {
      const { data } = await userAPI.getAll(payload)
      this.allUser = data
    },

    async create(payload) {
      await userAPI.create(payload)
    },

    async update(payload) {
      await userAPI.update(payload)
      await this.getMe()
    },

    async updateAvatar(payload) {
      await userAPI.updateAvatar(payload)
      await this.getMe()
    },

    async getAllRole(payload) {
      const { data } = await userAPI.getAllRole(payload)
      this.allRole = data
    },

    async del(payload) {
      await userAPI.del(payload)
    }
  }
})
