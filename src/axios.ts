import axios , { AxiosInstance} from 'axios'

const http : AxiosInstance = axios.create({
    baseURL : "http://localhost:3000",
})
// http.interceptors.request.use(request => {
//     const token = localStorage.getItem('token')
//     if(token){
//         request.headers.Authorization = 'Bearer ' + token
//     }
//     return request;
// })
export default http