import Vue from 'vue'
import App from './App.vue'
//导入基础样式
import './style/base.css'
import './style/normalize.css'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入vue-router
import router from './router/router.js'
//注册
Vue.use(ElementUI);

Vue.config.productionTip = false;
// window.console.log(process.env.VUE_APP_BASEURL)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
