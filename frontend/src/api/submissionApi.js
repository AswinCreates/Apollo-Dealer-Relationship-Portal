import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const uploadSubmission = (assignmentId, remarks, file) => {
  const formData = new FormData();
  formData.append("assignmentId", assignmentId);
  formData.append("remarks", remarks);
  formData.append("file", file);
  return API.post("/submissions/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const getSubmissions = () =>
  API.get("/contractor/submissions");

export const submitCompliance = (taskId, data) => {
  const formData = new FormData();
  formData.append("remarks", data.remarks);
  if (data.file) formData.append("file", data.file);
  return API.post(`/submissions/upload/${taskId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const getContractorTasks = () =>
  API.get("/contractor/tasks");

export default API;