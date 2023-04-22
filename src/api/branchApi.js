import instance from '../config/axios'

export default () => {
  const getAllBranch = async () => {
    return await instance.get('/branch/public/all')
  }

  const upsertBranch = async (payload) => {
    await instance.post('/branch/upsert', payload)
  }

  return {
    getAllBranch,
    upsertBranch
  }
}
