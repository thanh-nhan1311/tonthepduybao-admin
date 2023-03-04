import instance from '../config/axios'

export async function login(payload) {
  return await instance.post('/auth/login', payload)
}
