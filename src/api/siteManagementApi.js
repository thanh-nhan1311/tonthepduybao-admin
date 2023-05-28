import instance from '../config/axios'

export default () => {
  // Site Contact
  const searchContact = async (params) => {
    return await instance.get('/sm/contact/search', { params })
  }
  const resolveContact = async (id) => {
    return await instance.put(`/sm/contact/resolve/${id}`)
  }
  const deleteContact = async (id) => {
    return await instance.delete(`/sm/contact/${id}`)
  }

  // Site Category
  const searchCategory = async (params) => {
    return await instance.get('/sm/category/search', { params })
  }
  const upsertCategory = async (payload) => {
    return await instance.post('/sm/category/upsert', payload)
  }
  const deleteCategory = async (id) => {
    return await instance.delete(`/sm/category/${id}`)
  }

  // Site Partner
  const searchPartner = async (params) => {
    return await instance.get('/sm/partner/search', { params })
  }
  const upsertPartner = async (payload) => {
    return await instance.post('/sm/partner/upsert', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
  const deletePartner = async (id) => {
    return await instance.delete(`/sm/partner/${id}`)
  }

  // Site Setting
  const deleteSetting = async (payload) => {
    await instance.delete(`/sm/setting/${payload}`)
  }
  const getAllSetting = async () => {
    return await instance.get('/sm/setting')
  }
  const saveSetting = async (payload) => {
    return await instance.post('/sm/setting', payload)
  }

  return {
    searchContact,
    resolveContact,
    deleteContact,

    searchCategory,
    upsertCategory,
    deleteCategory,

    searchPartner,
    upsertPartner,
    deletePartner,

    deleteSetting,
    getAllSetting,
    saveSetting
  }
}
