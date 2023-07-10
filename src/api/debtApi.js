import instance from '../config/axios'

export default () => {
  const create = async (data) => {
    await instance.post('/debt/create', data)
  }

  return {
    create
  }
}
