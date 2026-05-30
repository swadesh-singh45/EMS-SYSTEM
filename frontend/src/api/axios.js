import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.VITE_BASE_URL || "http://localhost:4000") + "/api"
})

//  Attach Auth token to all newtwork requests
api.interceptors.request.use((confiq)=>{
     const token = localStorage.getItem("token")
     if(token) {
      confiq.headers.Authorization = `Bearer ${token}`
     }
     return confiq;
})

export default api