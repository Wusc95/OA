<template>
  <el-container class="main-layout">
    <!-- 头部-->
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="../../assets/index_logo.png" />
        <p>黑马面面</p>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt />
        <p>{{userInfo.username}}，您好</p>
        <el-button type="primary" size="small" class="out" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside class="aside" width="auto">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo list-show" router :collapse="isCollapse">
          <el-menu-item index="/index/chart" v-if="['管理员','老师'].includes($store.state.userInfo.role)">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user" v-if="['管理员'].includes($store.state.userInfo.role)">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question" v-if="['管理员','老师','学生'].includes($store.state.userInfo.role)">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise" v-if="['管理员','老师'].includes($store.state.userInfo.role)">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject" v-if="['管理员','老师'].includes($store.state.userInfo.role)">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体-->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import axios from 'axios'
// import {getToken,removeToken} from"../../utils/token.js"
// import {userInnfo} from"../../api/user.js"
import { userLogout } from "../../api/user";
import { removeToken } from "../../utils/token.js";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    logout() {
      // userLogout().then(res=>{
      //   window.console.log(res);
      // });
      this.$confirm("确认退出", "友情提示:", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userLogout().then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              removeToken();
              this.$store.state.userInfo = {};
              this.$router.push("./login");
              this.$message({ type: "success", message: "已退出!" });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "取消退出" });
        });
    }
  },
  computed: {
    //简化userinfo
    userInfo(){
      return this.$store.state.userInfo;
    }
  },
  // beforeCreate() {
  //   //采用这种方法，如果网速较差的话会出现闪的现象
  //   //解决办法，尽可能的早判断
  //   if(!getToken()){
  //     this.$message.warning('用户未登录，请先登录');
  //     this.$router.push('/login')
  //   }
  // },
  created() {
    this.$message.success('登录成功');
    //进入页面，获取用户信息
    // userInnfo().then(res=>{
    //   // window.console.log(res);
    //   if(res.data.code == 200){
    //     res.data.data.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`
    //     this.userInfo = res.data.data;
    //   }else if(res.data.code == 206){
    //     this.$message.error('小样，就知道你会改token,滚犊子');
    //     removeToken();
    //     this.$router.push('/login');
    //   }
    // });
  }
};
</script>
<style lang='less'>
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
}

.el-main {
  background-color: #e8e9ec;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/*************************************************************************************** */
.main-layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        width: 24px;
        font-size: 24px;
      }
      img {
        width: 33px;
        margin: 0 11px;
      }
      p {
        width: 92px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      p {
        // width: 100px;
        margin-left: 19px;
        margin-right: 9px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
      }
    }
  }
  .mian {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list-show {
    background-color: #ffffff;
  }
}
</style>