import { defineStore } from 'pinia'
import { useMessage } from '~/compositions'
import { MSG } from '~/modules/constant'
import { searchCategoryAPI, upsertCategoryAPI, deleteCategoryAPI } from '~/api/siteManagementApi'

const mc = useMessage()

export const useSiteCategoryStore = defineStore('siteCategory', {
  state: () => ({
    allCategory: [],
    parentOptions: []
  }),

  getters: {
    allCategoryTableData: (state) =>
      state.allCategory.map((item) => {
        const parentCategory = state.allCategory.find((cateItem) => cateItem.id === item.parent)
        return { ...item, parentName: parentCategory ? parentCategory.name : '' }
      })
  },

  actions: {
    async getCategoryOptions(excludeId = null) {
      const res = await searchCategoryAPI({ search: '' })
      this.parentOptions = res.data
        .filter((item) => item.id !== excludeId)
        .map((item) => {
          return { value: item.id, label: item.name }
        })
    },
    async searchCategory(payload) {
      const res = await searchCategoryAPI({ search: payload })
      this.allCategory = res.data
    },
    async upsertCategory(payload) {
      try {
        await upsertCategoryAPI(payload)
        await this.searchCategory('')

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (err) {
        mc.error(MSG.UPDATE_FAILED)
      }
    },
    async deleteCategory(id) {
      try {
        await deleteCategoryAPI(id)
        await this.searchCategory('')

        mc.success(MSG.DELETE_SUCCESS)
      } catch (err) {
        mc.error(MSG.DELETE_FAILED)
      }
    }
  }
})
