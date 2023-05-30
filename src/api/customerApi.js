import instance from '../config/axios'

export default () => {
  const search = async (payload) => {
    return await instance.get('/customer/search', { params: payload })
  }

  const upsert = async (payload) => {
    await instance.post('/customer/upsert', payload)
  }

  return {
    search,
    upsert
  }
}
