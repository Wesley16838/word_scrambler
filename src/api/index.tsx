import axios from "axios";
export const apiConfig = axios.create({
  baseURL: " https://api.hatchways.io/assessment/sentences/",
  headers: {
    Accept: "application/json",
  },
  timeout: 3000,
});
export default apiConfig;
