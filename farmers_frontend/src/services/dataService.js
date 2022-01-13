import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/data'

const addDataPoint = async(datapoint, token) => {
    const parsedToken = `bearer ${token}`
    const config = {
        headers: { Authorization: parsedToken }
    }
    const res = await axios.post(baseUrl, datapoint, config)
    return res.data
}

const getMonthData = async (date, token) => {
    const parsedToken = `bearer ${token}`
    const config = {
        headers: { Authorization: parsedToken }
    }
    const res = await axios.get(`${baseUrl}/byMonth?year=${date.year}&month=${date.month}`, config)
    return res.data
}

const getMonthStats = async (date, token) => {
    const parsedToken = `bearer ${token}`
    const config = {
        headers: { Authorization: parsedToken }
    }
    const res = await axios.get(`${baseUrl}/monthStatistics?year=${date.year}&month=${date.month}`, config)
    return res.data
}

const getMetricStats = async (metric, token) => {
    const parsedToken = `bearer ${token}`
    const config = {
        headers: { Authorization: parsedToken }
    }
    const res = await axios.get(`${baseUrl}/byMetric?metric=${metric}`, config)
    return res.data
}
export { addDataPoint, getMonthData, getMonthStats, getMetricStats }