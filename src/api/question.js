import instance from "../utils/request.js"

//编辑题目
const questionEdit = (data)=>{
    return instance({
        url:'/question/edit',
        method:'post',
        data
    });
}
//题目列表
const questionList = (params)=>{
    return instance({
        url:'/question/list',
        method:'get',
        params
    });
}
//删除题目
const questionRemove = (data)=>{
    return instance({
        url:'/question/remove',
        method:'post',
        data
    });
}
//设置题目状态
const questionStatus = (data)=>{
    return instance({
        url:'/question/status',
        method:'post',
        data
    });
}
//发布题目
const questionAdd = (data)=>{
    return instance({
        url:'/question/add',
        method:'post',
        data
    });
}
//上传文件
const questionUpload = (data)=>{
    return instance({
        url:'/question/upload',
        method:'post',
        data
    });
}
//获取题目信息
const questionOne = (data)=>{
    return instance({
        url:'/question/one',
        method:'post',
        data
    });
}