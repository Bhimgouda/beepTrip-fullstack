import http from "./httpService";
import config from "../config.json";

const { apiUrl: apiEndpoint } = config;

// Registering A User

export const registerUser = (user) => {
  return http.post(`${apiEndpoint}/register`, user);
};
export const loginUser = (user) => {
  return http.post(`${apiEndpoint}/login`, user);
};
export const logoutUser = () => {
  return http.get(`${apiEndpoint}/logout`);
};
