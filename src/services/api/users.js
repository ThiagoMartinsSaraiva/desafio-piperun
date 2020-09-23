import api from '../api'

export default {
  list: async () => {
    return await api.get('users')
  }
}
