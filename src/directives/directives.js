import Vue from "vue";
//导入数据仓库
import store from "../store/store.js"
Vue.directive('isShow',{
    inserted:function(el,binding){
        // window.console.log(el);
        // window.console.log(binding);
        //规则：把不需要显示功能按钮的角色，以数组的形式传递过来。
        if(binding.value.includes(store.state.userInfo.role)){
            el.parentNode.removeChild(el);
        }
    }
});