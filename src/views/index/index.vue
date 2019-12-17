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
        <img src="../../assets/png-0018.png" alt />
        <p>利达，您好</p>
        <el-button type="primary" size="small" class="out">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside class="aside" width="auto">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo list-show" router :collapse="isCollapse">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="subject">
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
import {getToken} from"../../utils/token.js"
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    //进入页面，获取用户信息
    
  },
  beforeCreate() {
    //采用这种方法，如果网速较差的话会出现闪的现象
    //解决办法，尽可能的早判断
    if(!getToken()){
      this.$message.warning('用户未登录，请先登录');
      this.$router.push('/login')
    }
  },
 
};
</script>
<style lang='less'>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
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
        width: 80px;
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
    background-color: #d3dce6;
  }
}
</style>