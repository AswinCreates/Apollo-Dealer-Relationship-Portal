import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAdminDashboard = () => API.get("/admin/dashboard");
export const getContractors = () => API.get("/contractors");
export const addContractor = (data) => API.post("/contractors", data);
export const deleteContractor = (id) => API.delete(`/contractors/${id}`);
export const getUsers = () => API.get("/admin/users");
export const addUser = (data) => API.post("/admin/users", data);
export const deactivateUser = (id) => API.put(`/admin/users/${id}/deactivate`);
export const resetPassword = (id) => API.put(`/admin/users/${id}/reset-password`);
export const getTasks = () => API.get("/tasks");
export const addTask = (data) => API.post("/tasks", data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const getAssignments = () => API.get("/assignments");
export const createAssignment = (data) => API.post("/assignments", data);
export const getOverallReport = () => API.get("/reports/overall");
export const exportExcel = () => API.get("/reports/export/excel", { responseType: "blob" });

export default API;