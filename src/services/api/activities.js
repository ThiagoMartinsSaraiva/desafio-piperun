import api from '.'

export default {
  index: async (id) => {
    return await api.get(`activities/${id}`, { params: { with: 'owner' } })
  },
  list: async (params) => {
    return await api.get('activities', { params: { show: 30, ...params } })
  },
  store: async (data) => {
    return await api.post('activities', data)
  },
  update: async (data, id) => {
    return await api.put(`activities/${id}`, data)
  },
  remove: async (id) => {
    return await api.delete(`activities/${id}`)
  }
}
