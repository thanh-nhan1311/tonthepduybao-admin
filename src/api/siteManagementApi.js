import instance from '../config/axios'

// Site Contact
export async function searchContactAPI(params) {
  return await instance.get('/sm/contact/search', { params })
}
export async function resolveContactAPI(id) {
  return await instance.put(`/sm/contact/resolve/${id}`)
}
export async function deleteContactAPI(id) {
  return await instance.delete(`/sm/contact/${id}`)
}

// Site Category
export async function searchCategoryAPI(params) {
  return await instance.get('/sm/category/search', { params })
}
export async function upsertCategoryAPI(payload) {
  return await instance.post('/sm/category/upsert', payload)
}
export async function deleteCategoryAPI(id) {
  return await instance.delete(`/sm/category/${id}`)
}

// Site Partner
export async function searchPartnerAPI(params) {
  return await instance.get('/sm/partner/search', { params })
}
export async function upsertPartnerAPI(payload) {
  return await instance.post('/sm/partner/upsert', payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export async function deletePartnerAPI(id) {
  return await instance.delete(`/sm/partner/${id}`)
}
