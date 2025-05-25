import axios from 'axios'

class FilesApiClient {
    constructor() {
        this.baseUrl = process.env.VUE_APP_N8N_BASE_URL.replace(/\/$/, '')
    }

    async getFIleFromOneDrive() {
        const {data: response} = await axios.get(
            this.baseUrl + '/webhook/report/onedrive',
            {
                responseType: 'blob',
                headers: {
                    'api-key': process.env.VUE_APP_N8N_API_KEY
                }
            }
        );
        return response;
    }
}

export default new FilesApiClient()