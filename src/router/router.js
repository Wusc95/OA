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
//导入store(vuex)
import store from '../store/store.js'
//导入提示框
import {
    Message
} from 'element-ui'
//导入token的方法
import {
    getToken,
    removeToken
} from '../utils/token'
//导入获取用户信息的方法
import {
    userInnfo
} from '../api/user.js'
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
        // redirect: 'index/chart',
        meta:{
            power:['管理员','老师','学生']
        },
        children: [{
                path: 'user',
                component: user,
                //判断哪些用户可以去
                meta: {
                    power: ['管理员']
                }
            },
            {
                path: 'subject',
                component: subject,
                //判断哪些用户可以去
                meta: {
                    power: ['管理员', '老师']
                }
            },
            {
                path: 'question',
                component: question,
                //判断哪些用户可以去
                meta: {
                    power: ['管理员', '老师', '学生']
                }
            },
            {
                path: 'enterprise',
                component: enterprise,
                //判断哪些用户可以去
                meta: {
                    power: ['管理员', '老师']
                }
            },
            {
                path: 'chart',
                component: chart,
                //判断哪些用户可以去
                meta: {
                    power: ['管理员', '老师']
                }
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
        } else {
            userInnfo().then(res => {
                // window.console.log(res);
                if (res.data.code == 200) {
                    // store.state.userInfo = res.data.data;
                    // store.state.userInfo.avatar = `${process.env.VUE_APP_BASEURL}/${store.state.userInfo.avatar}`
                    //判断用户状态是否启用(1:启用 0:禁用),如果状态为禁用，则提示用户联系管理员
                    if (res.data.data.status == 1) {

                        res.data.data.avatar = process.env.VUE_APP_BASEURL + '/' + res.data.data.avatar;
                        store.commit('changeUserInfo', res.data.data);
                        //当状态为启用时，判断用户是否有权限进入到这个页面
                        if (to.meta.power.includes(store.state.userInfo.role)) {
                            next();
                        }else{
                            Message.error('您不具备访问权限，请及时联系管理员');
                        }



                    } else {
                        Message.error('该账号已被禁用，请及时联系管理员');
                        removeToken();
                        next('/login');
                    }

                } else if (res.data.code == 206) {
                    Message.error('就你，还伪造token,滚犊子');
                    removeToken();
                    next('/login');
                }
            })
        }
    }

});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router;