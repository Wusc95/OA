import axios from "axios";
import {getToken} from "../utils/token.js";

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    headers: {
        'token': getToken()
    },
    withCredentials: true
});

// 学科 新增
export const addDiscipline = (data) => {
    return instance({
        url: '/subject/add',
        method: 'post',
        headers: {
            'token': getToken()
        },
        data
    });
}
// 学科 列表
export const getSubjectList = (params) => {
    return instance({
        url: '/subject/list',
        method: 'get',
        headers: {
            'token': getToken()
        },
        params
    });
}
// 学科 删除
export const subjectRemove = (data) => {
    return instance({
        url: '/subject/remove',
        method: 'post',
        headers: {
            'token': getToken()
        },
        data
    });
}
// 学科 编辑
export const subjectEdit = (data) => {
    return instance({
        url: '/subject/edit',
        method: 'post',
        headers: {
            'token': getToken()
        },
        data
    });
}
// 学科 状态
export const subjectStatus = (data) => {
    return instance({
        url: '/subject/status',
        method: 'post',
        headers: {
            'token': getToken()
        },
        data
    });
}