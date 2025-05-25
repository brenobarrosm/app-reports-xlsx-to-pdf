import axios from 'axios'
class UsersApiClient {
    constructor() {
        this.baseUrl = process.env.VUE_APP_API_BASE_URL.replace(/\/$/, '')
    }

    async login(loginRequest) {
        const {data: response} = await axios.post(
            this.baseUrl + '/api/users/login',
            loginRequest)
        return response
    }
}

export default new UsersApiClient()