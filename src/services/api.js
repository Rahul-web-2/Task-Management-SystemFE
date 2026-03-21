import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
  timeout: 10000,
});

// On 401: JWT is missing or expired — clear local auth state and redirect.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
