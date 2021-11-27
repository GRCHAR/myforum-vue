import Axios from 'axios'
import env from './config/env'

const myaxios = Axios.create({
    baseURL: env.target
})


export default myaxios