import instance from "../utils/request.js"

//企业编辑
export const enterpriseEdit = (data)=>{
    return instance({
        url:'/enterprise/edit',
        method:'post',
        data
    });
}
//企业删除
export const enterpriseRemove= (data)=>{
    return instance({
        url:'/enterprise/remove',
        method:'post',
        data
    });
}
//企业状态设置
export const enterpriseStatus = (data)=>{
    return instance({
        url:'/enterprise/status',
        method:'post',
        data
    });
}
//企业添加
export const enterpriseAdd = (data)=>{
    return instance({
        url:'/enterprise/add',
        method:'post',
        data
    });
}
//企业列表
export const enterpriseList = (params)=>{
    return instance({
        url:'/enterprise/list',
        method:'get',
        params
    });
}