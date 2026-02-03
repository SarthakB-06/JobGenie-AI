import axios from "axios";
const BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';
const API = axios.create({
    baseURL: BASE_URL
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default API; 