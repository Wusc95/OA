//导入index页面包含的单个组件
import user from '../views/index/user/user.vue';
import subject from '../views/index/subject/subject.vue';
import question from '../views/index/question/question.vue';
import enterprise from '../views/index/enterprise/enterprise.vue';
import chart from '../views/index/chart/chart.vue';
export default [{
        path: 'user',
        component: user,
        //判断哪些用户可以去
        meta: {
            power: ['管理员']
        },
        icon: 'el-icon-user',
        name: '用户列表'
    },
    {
        path: 'subject',
        component: subject,
        //判断哪些用户可以去
        meta: {
            power: ['管理员', '老师']
        },
        icon: 'el-icon-notebook-2',
        name: '学科列表'
    },
    {
        path: 'question',
        component: question,
        //判断哪些用户可以去
        meta: {
            power: ['管理员', '老师', '学生']
        },
        icon: 'el-icon-edit-outline',
        name: '题库列表'
    },
    {
        path: 'enterprise',
        component: enterprise,
        //判断哪些用户可以去
        meta: {
            power: ['管理员', '老师']
        },
        icon: 'el-icon-office-building',
        name: '企业列表'
    },
    {
        path: 'chart',
        component: chart,
        //判断哪些用户可以去
        meta: {
            power: ['管理员', '老师']
        },
        icon: 'el-icon-pie-chart',
        name: '数据概览'
    }
]