import instance from '../config/axios'

export default () => {
  const getAll = async (payload) => {
    return await instance.get('/customer/all', { params: payload })
  }

  const getAllOption = async (payload) => {
    return await instance.get('/customer/all-option', { params: payload })
  }

  const upsert = async (payload) => {
    await instance.post('/customer/upsert', payload)
  }

  return {
    getAll,
    getAllOption,
    upsert
  }
}
