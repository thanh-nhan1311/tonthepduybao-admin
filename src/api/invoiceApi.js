import instance from '../config/axios'

export default () => {
  const create = async (payload) => {
    return await instance.post('/invoice', payload)
  }

  const getAll = async (params) => {
    return await instance.get('/invoice/all', { params })
  }

  return {
    create,
    getAll
  }
}
