// This file is responsible for creating http-requests to /api/login

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async(username, password) => {
    const res = await axios.post(baseUrl, { username, password })
    return res.data
}

export { login }