// Code: axios.js
import axios from 'axios';
// const baseURL = import.meta.env.BASE_URL;
const baseURL = 'http://localhost:4000/api';

export default axios.create({
    baseURL: baseURL,
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});