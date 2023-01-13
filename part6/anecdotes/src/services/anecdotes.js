import axios from "axios";
import { asObject } from "../reducers/anecdoteReducer";

const serverUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios.get(serverUrl);
  return response.data;
};

export const create = async (content) => {
  const object = asObject(content);
  const response = await axios.post(serverUrl, object);
  return response.data;
};

export const update = async (id, newData) => {
  const response = await axios.put(`${serverUrl}/${id}`, newData);
  return response.data;
};
