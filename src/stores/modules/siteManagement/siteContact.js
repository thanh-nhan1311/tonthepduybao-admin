import { defineStore } from 'pinia'
import { ref } from 'vue'
import { searchContactAPI, resolveContactAPI, deleteContactAPI } from '@/api/siteManagementApi'
import { useMessageStore } from '../..'
import { MSG } from '~/src/modules/constant'

export default defineStore('siteContact', () => {
  // Store
  const messageStore = useMessageStore()

  // State
  const search = ref('')
  const allContact = ref([])

  // Action
  async function searchContact() {
    const res = await searchContactAPI({ search: search.value })
    allContact.value = res.data
  }
  async function resolveContact(id) {
    await resolveContactAPI(id)
    await searchContact()
    messageStore.setSuccessMsg(MSG.UPDATE_SUCCESS)
  }
  async function deleteContact(id) {
    await deleteContactAPI(id)
    await searchContact()
    messageStore.setSuccessMsg(MSG.DELETE_SUCCESS)
  }

  return { search, allContact, searchContact, resolveContact, deleteContact }
})
