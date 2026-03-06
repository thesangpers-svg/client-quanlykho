import axios from "axios";

const API = "https://server-quanlykho.onrender.com/api/exports";

export const createExport = (data) =>
  axios.post(API, {
    ...data,
    user: localStorage.getItem("user"),
  });

export const getExportHistory = () =>
  axios.get(`${API}/history`);
export const deleteExport = (id) =>
  axios.delete(`${API}/${id}`);

export const updateExport = (id, data) =>
  axios.put(`${API}/${id}`, data);
