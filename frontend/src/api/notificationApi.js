import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getNotifications = () =>
  API.get("/contractor/notifications");

export const markAsRead = (id) =>
  API.put(`/contractor/notifications/${id}/read`);

export default API;