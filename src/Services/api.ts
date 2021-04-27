import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.16.50.10:3333'
})

export default api