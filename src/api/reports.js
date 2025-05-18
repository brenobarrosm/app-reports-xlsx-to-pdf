import axios from 'axios'

class ReportsApiClient {
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

        const { data: response } = await axios.post(
            'http://localhost:8000/api/reports/info',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...this.getAuthHeaders()
                }
            }
        )
        return response
    }

    async getReportPdf(reportInfoInDTO) {
        const { data: response } = await axios.post(
            'http://localhost:8000/api/reports/pdf',
            reportInfoInDTO,
            {
                responseType: 'blob',
                headers: {
                    ...this.getAuthHeaders()
                }
            }
        )
        return response
    }
}

export default new ReportsApiClient()
