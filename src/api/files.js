import axios from 'axios'

class FileApiClient {
    async getFIleFromOneDrive(url) {
        const {data: response} = await axios.post('http://localhost:8000/api/files/onedrive', {'url': url}, {responseType: 'blob'})
        return response
    }
}

export default new FileApiClient()