import Vue from "vue"
//导入单个组件
import login from '../views/login/login.vue' //登陆页
import index from '../views/index/index.vue' //首页
//导入index页面包含的单个组件
import user from '../views/index/user/user.vue';
import subject from '../views/index/subject/subject.vue';
import question from '../views/index/question/question.vue';
import enterprise from '../views/index/enterprise/enterprise.vue';
import chart from '../views/index/chart/chart.vue';

//导入提示框
import {
    Message
} from 'element-ui'

//导入获取token的方法
import {
    getToken
} from '../utils/token'

// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
//创建路由规则
const routes = [{
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: login
    },
    {
        path: '/index',
        component: index,
        children: [{
                path: 'user',
                component: user
            },
            {
                path: 'subject',
                component: subject
            },
            {
                path: 'question',
                component: question
            },
            {
                path: 'enterprise',
                component: enterprise
            },
            {
                path: 'chart',
                component: chart
            }
        ]
    }
];
// 实例化
const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    //路由白名单
    const whitePath = ['/login', '/'];
    if (whitePath.includes(to.path.toLocaleLowerCase()) === true) {
        next();
    } else {
        if (!getToken()) {
            Message.error('用户未登录，请先登录');
            next('/login');
        }else{
            next();
        }
    }

})

export default router;