import instance from "../utils/request.js"

//获取用户信息
export const userInnfo = () => {
    return instance({
        url: '/info',
        method: 'get',
    });
}
//退出登录
export const userLogout = () => {
    return instance({
        url: '/logout',
        method: 'get',
    });
}
//编辑用户
export const userEdit = (data) => {
    return instance({
        url: '/user/edit',
        method: 'post',
        data
    });
}
//删除用户
export const userRemove = (data) => {
    return instance({
        url: '/user/remove',
        method: 'post',
        data
    });
}
//设置用户状态
export const userStatus = (data)=>{
    return instance({
        url:'/user/status',
        method:'post',
        data
    });
}

//后台创建用户
export const userAdd = (data)=>{
    return instance({
        url:'/user/add',
        method:'post',
        data
    });
}

//获取用户列表
export const userList = (params)=>{
    return instance({
        url:'/user/list',
        method:'get',
        params
    });
}

