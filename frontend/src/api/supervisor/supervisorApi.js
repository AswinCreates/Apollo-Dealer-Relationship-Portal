import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

// Add auth interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getSupervisorDashboard = () => API.get("/supervisor/dashboard");
export const getSubmissions = () => API.get("/supervisor/submissions");
export const approveSubmission = (id, remarks) => API.post(`/submissions/approve/${id}`, { remarks });
export const rejectSubmission = (id, reason) => API.post(`/submissions/reject/${id}`, { reason });
export const getOverallReport = () => API.get("/reports/overall");
export const getNotifications = () => API.get("/supervisor/notifications");
export const exportExcel = () => API.get("/reports/export/excel", { responseType: "blob" });

export default API;