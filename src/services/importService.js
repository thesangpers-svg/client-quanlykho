import axios from "axios";

const API = "http://localhost:5000/api/imports";

export const createImport = (data) => {
  return axios.post(API, {
    ...data,
    user: localStorage.getItem("user"), // 🔥 thêm dòng này
  });
};

export const getStocks = () => axios.get(`${API}/stocks`);

export const getHistory = () => axios.get(`${API}/history`);

export const deleteImport = (id) =>
  axios.delete(`${API}/${id}`);

export const updateImport = (id, data) =>
  axios.put(`${API}/${id}`, data);