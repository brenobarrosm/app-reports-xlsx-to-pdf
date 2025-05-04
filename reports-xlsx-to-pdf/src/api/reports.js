import axios from 'axios'
class ReportApiClient {
    async getReportInfo(file, filters) {
        const formData = new FormData()
        console.log(':::FILE HERE:::')
        console.log(file)
        formData.append('file', file)
        formData.append('filter_type', filters.type)
        formData.append('scope', filters.scope)
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