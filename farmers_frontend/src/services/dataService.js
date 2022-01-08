import axios from "axios";
const baseUrl = 'http://localhost:3001/api/data'

const addDataPoint = async(datapoint, token) => {
    const parsedToken = `bearer ${token}`
    console.log(parsedToken);
    const config = {
        headers: {Authorization: parsedToken}
    }
    const res = axios.post(baseUrl, datapoint, config)
    return res.data
}

export default {addDataPoint}