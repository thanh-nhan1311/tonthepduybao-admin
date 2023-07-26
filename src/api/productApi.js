import instance from '../config/axios'

export default () => {
  const create = async (payload) => {
    await instance.post('/product/create', payload)
  }

  const getAll = async (params) => {
    return await instance.get('/product/all', { params })
  }

  return {
    create,
    getAll
  }
}
