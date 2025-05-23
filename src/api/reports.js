import axios from 'axios'

class ReportsApiClient {

    constructor() {
        this.baseUrl = process.env.VUE_APP_API_BASE_URL.replace(/\/$/, '')
    }
    getAuthHeaders() {
        const token = sessionStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`
        }
    }

    async getReportInfo(file, filters) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('filter_type', filters.type)
        formData.append('value', filters.value)
        try {
            const { data: response }  = await axios.post(
                this.baseUrl + '/api/reports/info',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...this.getAuthHeaders()
                    }
                }
            )
            return response
        } catch (error) {
            return null
        }
    }

    async getReportPdf(reportInfoInDTO) {
        try {
            const { data: response } = await axios.post(
                this.baseUrl + '/api/reports/pdf',
                reportInfoInDTO,
                {
                    responseType: 'blob',
                    headers: {
                        ...this.getAuthHeaders()
                    }
                }
            )
            return response
        } catch (error) {
            return null
        }
    }
}

export default new ReportsApiClient()
