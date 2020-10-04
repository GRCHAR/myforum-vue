import Axios from 'axios'

const myaxios = Axios.create({
    baseURL: 'http://192.168.137.44:8071/forum'
})

export default myaxios