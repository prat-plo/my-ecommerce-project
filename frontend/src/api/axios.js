import axios from 'axios'

const api = axios.create({
  baseURL: 'https://my-ecommerce-api-iowl.onrender.com/api'
})

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  }
  return config
})

export default api