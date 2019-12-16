import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true
});

//登陆接口
export function login(data) {
    return instance({
        url: '/login',
        method: 'post',
        data
    });
}


//注册接口
 export function register(data){
    return instance({
        url:'/register',
        method:'post',
        data
    });
 }

 //获取短信验证码
 export function getsmsCode(data){
    return instance({
        url:'/sendsms',
        method:'post',
        data
    });
 }