import instance from '../config/axios'

export async function loginAPI(payload) {
  return await instance.post('/auth/login', payload)
}
