import axios from 'axios'
const loginUrl = '/api/login'

export const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

