import instance from '../config/axios'

export async function getAllBranch() {
  return await instance.get('/branch/public/all')
}
