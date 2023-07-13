import instance from '../config/axios'

export default () => {
  const get = async (id) => {
    return await instance.get(`/debt/${id}`)
  }

  const getAll = async (params) => {
    return await instance.get('/debt/all', { params })
  }

  const create = async (data) => {
    await instance.post('/debt', data)
  }

  const update = async (data) => {
    await instance.put('/debt', data)
  }

  const del = async (id) => {
    await instance.delete(`/debt/${id}`)
  }

  return {
    get,
    getAll,
    create,
    update,
    del
  }
}
