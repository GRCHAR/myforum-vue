import Axios from 'axios'
import env from './config/env'

const myaxios = Axios.create({
    baseURL:'/api',
    withCredentials: true,
    crossDomain: true
})
export default myaxios