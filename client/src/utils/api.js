import axios from 'axios';

const api = axios.create({
    baseURL:`${process.env.REACT_APP_BACKEND_URL}/auth`
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);