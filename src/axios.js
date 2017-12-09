import axios from 'axios'


const instance = axios.create({
    baseURL: "http://120.79.31.225:8888"
})

export default instance
