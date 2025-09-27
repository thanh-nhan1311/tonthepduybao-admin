import instance from '../config/axios'

export default () => {
  const create = async (payload) => {
    return await instance.post('/invoice', payload)
  }

  const del = async (id) => {
    return await instance.delete(`/invoice/${id}`)
  }

  const get = async (id) => {
    return await instance.get(`/invoice/${id}`)
  }

  const getAll = async (params) => {
    return await instance.get('/invoice/all', { params })
  }

  const update = async (id, payload) => {
    return await instance.put(`/invoice/${id}`, payload)
  }

  return {
    create,
    del,
    get,
    getAll,
    update
  }
}
