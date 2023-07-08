import instance from '../config/axios'

export default () => {
  const getAll = async (payload) => {
    return await instance.get('/customer/all', { params: payload })
  }

  const upsert = async (payload) => {
    await instance.post('/customer/upsert', payload)
  }

  return {
    getAll,
    upsert
  }
}
