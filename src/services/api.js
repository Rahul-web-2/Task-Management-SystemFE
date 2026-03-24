import axios from "axios";
import { navigateTo } from "../utils/navigation";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    if (status === 401 && !url.includes("/auth/login")) {
      localStorage.removeItem("user");
      navigateTo("/login");
    }

    return Promise.reject(error);
  }
);

export default api;