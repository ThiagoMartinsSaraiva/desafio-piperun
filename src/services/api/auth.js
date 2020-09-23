import api from '../api'

export default {
  login: async (data) => {
    return await api.post('auth', data)
  }
}
