import axios from "axios";
import { getToken, refreshToken } from "./auth";
import React from "react";
import showNotification from "../components/extras/showNotification";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
    responseType: 'json'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 404) {
        return showNotification('Atenção!!', error.response?.data?.message, 'danger');
    } else if (error.response.status === 401 || error.response.status === 419) {
        let originalRequest = error.config
        return refreshToken().then(() => {
            originalRequest.headers['Authorization'] = `Bearer ${getToken()}`
            return originalRequest;
        }).catch(() => <Navigate to={`../${pages.login.path}`}/>);
    } else if (error.response?.data?.message) {
        showNotification('Atenção!!', error.response?.data?.message, 'danger');
        return <Navigate to={`../${pages.login.path}`}/>
    }
    return Promise.reject(error)
})


export default api;