import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    token: process.env.VUE_APP_API_TOKEN
  }
})

export default api
