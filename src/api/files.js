import axios from 'axios'

class FilesApiClient {
    async getFIleFromOneDrive() {
        const {data: response} = await axios.get('https://n8n.inbrix.tech/webhook/report/onedrive', {responseType: 'blob'})
        return response
    }
}

export default new FilesApiClient()