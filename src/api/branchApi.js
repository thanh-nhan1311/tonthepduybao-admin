import instance from '../config/axios'

export async function getAllBranchAPI() {
  return await instance.get('/branch/public/all')
}
