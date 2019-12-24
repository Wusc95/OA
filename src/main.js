import Vue from 'vue'
import App from './App.vue'
//导入基础样式
import './style/base.css'
import './style/normalize.css'

//导入全局过滤器
import "./filters/filters.js"

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入vue-router
import router from './router/router.js'
//导入vuex仓库
import store from'./store/store.js'
//注册
Vue.use(ElementUI);
//导入控制功能按钮是否显示的自定义指令
import "./directives/directives.js"
Vue.config.productionTip = false;
// window.console.log(process.env.VUE_APP_BASEURL)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
