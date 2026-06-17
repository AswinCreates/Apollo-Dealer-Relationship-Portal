import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getAssignedTasks = (contractorId) =>
  API.get(`/dashboard/${contractorId}/assigned`);

export const getContractorTasks = () =>
  API.get("/contractor/tasks");

export default API;