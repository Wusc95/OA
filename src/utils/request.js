import axios from "axios";
import {
    getToken
} from "../utils/token.js";

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true
});

//axios拦截器
instance.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;