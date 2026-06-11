import axios from "axios";

const API = axios.create({
baseURL: "http://localhost:8080/api"
});

export const getContractorReport = (contractorId) =>
API.get(`/reports/contractor/${contractorId}`);

export default API;
