<template>
  <div class="login-main">
    <div class="login-box">
      <el-form ref="form" :model="form">
        <el-form-item>
          <div class="login-title">
            <img src="../../assets/login-logo.png" alt />
            <span class="title">黑马面面</span>
            <i class="fenge"></i>
            <span class="sub-title">用户登录</span>
          </div>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.tel"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-row class="row">
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <el-col :span="6">
              <img src="../../assets/captcher.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-img">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        checked: false,
        tel:'',
        password:'',
        captcha:''
      }
    };
  }
};
</script>

<style lang='less'>
.login-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .login-box {
    width: 478px;
    height: 550px;
    padding: 43px;
    background: rgba(245, 245, 245, 1);
    .login-title {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      .fenge {
        display: inline-block;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin: 0 16px;
      }
      .sub-title {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .el-checkbox {
      display: flex;
      align-items: center;
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    .row {
      display: flex;
      align-items: center;
    }
    .el-button {
      width: 100%;
      margin: 0;
      margin-bottom: 26px;
    }
  }
}
</style>