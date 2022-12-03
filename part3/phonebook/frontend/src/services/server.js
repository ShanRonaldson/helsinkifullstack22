import axios from "axios";
const serverUrl = 'http://localhost:3001/api/persons'


export const getAll = () => {
    const request = axios.get(serverUrl);
    return request.then(response => response.data);
}

export const create = newData => {
    const request = axios.post(serverUrl, newData);
    const data = request.then(response => response.data)
    console.log(data)
    return data
}

export const update = (id, newData) => {
    const request = axios.put(`${serverUrl}/${id}`, newData);
    return request.then(response => response.data)

}

export const remove = (id) => {
    const request = axios.delete(`${serverUrl}/${id}`)
    return request.then(response => response.data)
}
