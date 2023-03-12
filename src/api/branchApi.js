import instance from '../config/axios'

export async function getAllBranchAPI() {
  return await instance.get('/branch/public/all')
}

export async function upsertBranchAPI(payload) {
  await instance.post('/branch/upsert', payload)
}
