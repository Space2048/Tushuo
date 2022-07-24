import axios from 'axios'

axios.defaults.baseURL = "/webapi"

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios