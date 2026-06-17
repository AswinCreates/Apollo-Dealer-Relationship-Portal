import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getProfile = () =>
  API.get("/contractor/profile");

export const updateProfile = (data) =>
  API.put("/contractor/profile", data);

export default API;