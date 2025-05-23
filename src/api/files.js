import axios from 'axios'

class FilesApiClient {
    async getFIleFromOneDrive() {
        const {data: response} = await axios.get(
            'https://n8n.inbrix.tech/webhook/report/onedrive',
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