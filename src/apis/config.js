import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: '/api/tmdb'
    }
);
export default axiosInstance;