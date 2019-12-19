import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        //首页用户信息
        userInfo:{},
    },
    mutations:{
        changeUserInfo(state,newUserInfo){
            state.userInfo=newUserInfo
        }
    }
})

export default store;