import axios from "axios";

const omdbInstance = axios.create(
    {
        baseURL: '/api/omdb'
    }
);
export default omdbInstance;
