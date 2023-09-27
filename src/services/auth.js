import api from './api'
import React from "react";

export const TOKEN_KEY = "@tokenUserSDBS";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = token => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const removeTokenAndRedirect = () => {
    if (getToken()) {
        removeToken();
        return window.location.reload();
    }
};

export const refreshToken = () => {
    return api.post('auth/refresh_token').then(response => {
        if (!response.data.token) {
            return removeTokenAndRedirect();
        }
        setToken(response.data.token);
        return response;
    }).catch(err => removeTokenAndRedirect());
};

export const me = () => {
    return api.post('auth/me').then(response => {
        if (!response.data) {
            return removeTokenAndRedirect();
        }
        return response;
    }).catch(err => removeTokenAndRedirect() );
};
