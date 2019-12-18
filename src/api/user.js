import axios from "axios"
import {getToken} from"../utils/token"
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true
});

//获取用户信息
export const userInnfo=()=>{
    return instance({
        url:'/info?_t'+Date.now(),
        method:'GET',
        headers:{
            token:getToken()
        }
    });
}

export const userLogout=()=>{
    return instance({
        url:'/logout',
        method:'get',
        headers:{
            token:getToken()
        }
    });
}