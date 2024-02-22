// Code: axios.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
});