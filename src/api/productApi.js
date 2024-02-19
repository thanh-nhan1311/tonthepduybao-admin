import instance from '../config/axios'

export default () => {
  const create = async (payload) => {
    await instance.post('/product/create', payload)
  }

  const del = async (id) => {
    await instance.delete(`/product/${id}`)
  }

  const deleteAll = async () => {
    await instance.delete(`/product/delete-all`)
  }

  const getAll = async (params) => {
    return await instance.get('/product/all', { params })
  }

  return {
    create,
    del,
    deleteAll,
    getAll
  }
}
