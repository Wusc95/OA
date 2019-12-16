import Vue from "vue"
//导入单个组件
import login from '../views/login/login.vue' //登陆页
import index from '../views/index/index.vue' //首页
// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
//创建路由规则
const routes =[
    {
        path:'/login',
        component:login
    },
    {
        path:'/',
        component:login
    },
    {
        path:'/index',
        component:index
    }
];
// 实例化
const router = new VueRouter({
    routes
})

export default router;