//定义token的key
const KEY = 'mmtoken';

//保存token
export const setToken=(token)=>{
    localStorage.setItem(KEY,token);
};

//获取token
export const getToken=()=>{
    return localStorage.getItem(KEY);
};

//删除token,退出的时候使用

export const removeToken = ()=>{
    localStorage.removeItem(KEY);
}