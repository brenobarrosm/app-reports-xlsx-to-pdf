import axios from 'axios'
class UsersApiClient {
    async login(loginRequest) {
        const {data: response} = await axios.post(
            'http://localhost:8000/api/users/login',
            loginRequest)
        return response
    }
}

export default new UsersApiClient()