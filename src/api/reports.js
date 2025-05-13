import axios from 'axios'
class ReportApiClient {
    async getReportInfo(file, filters) {
        console.log(filters)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('filter_type', filters.type)
        formData.append('value', filters.value)
        const { data: response } = await axios.post(
            'http://localhost:8000/api/reports/info',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response
    }
    async getReportPdf(reportInfoInDTO) {
        const { data: response } = await axios.post(
            'http://localhost:8000/api/reports/pdf',
            reportInfoInDTO,
            { responseType: 'blob' }
        )
        return response
    }
}

export default new ReportApiClient()