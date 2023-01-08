import axios from 'axios'
const serverUrl = '/api/blogs'
const userUrl = '/api/users'
const ratingUrl = '/api/rating'

let token = null

export const setToken = async (newToken) => {
  token = await `bearer ${newToken}`
}

export const getAll = async () => {
  const response = await axios.get(serverUrl)
  return response.data
}

export const create = async (newData) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(serverUrl, newData, config)
  return response.data
}

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${serverUrl}/${id}`, config)
  return response.data
}

export const update = async (id, newData) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${serverUrl}/${id}`, newData, config)
  return response.data
}

export const addLikes = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${ratingUrl}/${id}`, [id], config)
  return response.data
}

export const getUsers = async () => {
  const response = await axios.get(userUrl)
  return response.data
}
