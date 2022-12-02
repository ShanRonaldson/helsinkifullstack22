import axios from "axios";
const serverUrl = 'http://localhost:3001/persons'


export const getAll = () => {
    const request = axios.get(serverUrl);
    return request.then(response => response.data);
}

export const create = newData => {
    const request = axios.post(serverUrl, newData);
    return request.then(response => response.data)
}

export const update = (id, newData) => {
    const request = axios.put(`${serverUrl}/${id}`, newData);
    request.then(response => { alert('Updated!') }).catch(error => {
        alert('An error occurred, please try again!')
        console.log(error)
    })

}

export const remove = (id) => {
    const request = axios.delete(`${serverUrl}/${id}`)
    request.then(response => { alert('Deleted!') }).catch(error => {
        alert('An error occurred, please try again!')
        console.log(error)
    })
}
