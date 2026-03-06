import axios from "axios";

const API = "https://server-quanlykho.onrender.com/api/objects";

export const updateObject = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteObject = (id) =>
  axios.delete(`${API}/${id}`);

export const createObject = (data) => axios.post(API, data);

export const getObjects = () => axios.get(API);
