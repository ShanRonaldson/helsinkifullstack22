import axios from 'axios';
const serverUrl = '/api/blogs';

export const getAll = () => {
	const request = axios.get(serverUrl);
	return request.then(response => response.data);
};

export const create = newData => {
	const request = axios.post(serverUrl, newData);
	return request.then(response => response.data);
};
