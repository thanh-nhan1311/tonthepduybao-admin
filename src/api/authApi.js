import instance from '../config/axios'

class AuthAPI {
  async login(payload) {
    return await instance.post('/auth/login', payload)
  }
}

export default new AuthAPI()
