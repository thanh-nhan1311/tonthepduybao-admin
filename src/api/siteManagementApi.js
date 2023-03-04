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
