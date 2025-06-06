import axios from "axios";

const defaultContentType = {
  accept: "application/json",
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: defaultContentType,
});

axiosClient.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem("site")
    ? `Bearer ${JSON.parse(localStorage.getItem("site") ?? "").token}`
    : null;

  return config;
});

export default axiosClient;
