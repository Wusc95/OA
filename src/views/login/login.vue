<template>
  <div class="login-main">
    <div class="login-box">
      <!-- 表单验证 -->
      <el-form ref="form" :model="form" :rules="rules" status-icon>
        <el-form-item>
          <div class="login-title">
            <img src="../../assets/login-logo.png" alt />
            <span class="title">黑马面面</span>
            <i class="fenge"></i>
            <span class="sub-title">用户登录</span>
          </div>
        </el-form-item>

        <el-form-item prop="tel">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.tel"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="captcha">
          <el-row class="row">
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="captchaPic" :src="LoginCaptchaURL" @click="getLoginCaptcha" />
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
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="login-img">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>

    <!-- 注册对话框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form :model="registerForm" :rules="registerRules" ref="RegisterForm" status-icon>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1/heimamm/public/uploads"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="picCode">
          <el-row class="row">
            <el-col :span="16">
              <el-input v-model="registerForm.picCode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img class="pic_code" :src="RegisterCaptchaUrl" @click="getRegisterCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row class="row">
            <el-col :span="16">
              <el-input v-model="registerForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button
                :disabled="time!=0"
                class="num_captcha"
                @click="getMsCaptcha"
              >{{time == 0?`获取短信验证码`:`(${time})后获取`}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
//导入表单验证规则
import { checkPhone, checkEmail } from "../../utils/validator.js";

import { login, register, getsmsCode } from "../../api/login.js";
import { setToken } from "../../utils/token.js";
export default {
  data() {
    //登陆验证逻辑
    // var checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("手机号不能为空"));
    //   } else {
    //     const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    //     if (reg.test(value) == true) {
    //       callback();
    //     } else {
    //       return callback(new Error("请输入正确手机号"));
    //     }
    //   }
    // };
    //注册验证逻辑
    //验证邮箱
    // var checkEmail = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("邮箱不能为空"));
    //   } else {
    //     const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    //     if (regEmail.test(value) == true) {
    //       callback();
    //     } else {
    //       return callback(new Error("请输入正确的邮箱"));
    //     }
    //   }
    // };

    return {
      form: {
        checked: false,
        tel: "",
        password: "",
        captcha: ""
      },
      rules: {
        tel: [{ required: true, validator: checkPhone, trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4", trigger: "change" }
        ]
      },
      registerForm: {
        //用户名
        username: "",
        //邮箱
        email: "",
        //手机号
        phone: "",
        //密码
        password: "",
        //图形验证码
        picCode: "",
        //验证码
        rcode: "",
        //头像
        avatar: ""
      },
      registerRules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        picCode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "图形码长度为4", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4", trigger: "change" }
        ]
      },
      time: 0,
      imageUrl: "",
      dialogFormVisible: false,
      formLabelWidth: "70px",
      LoginCaptchaURL:
        process.env.VUE_APP_BASEURL + "/captcha?type=login&_t" + Date.now(),
      RegisterCaptchaUrl:
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&_t" + Date.now()
    };
  },
  methods: {
    //登录按钮事件
    submitForm() {
      this.$refs.form.validate(valid => {
        if (this.form.checked == true) {
          if (valid) {
            // axios({
            //   url: process.env.VUE_APP_BASEURL + "/login",
            //   method: "post",
            //   withCredentials: true,
            //   data: {
            //     phone: this.form.tel,
            //     password: this.form.password,
            //     code: this.form.captcha
            //   }
            // })
            //这里使用封装的api
            login({
              phone: this.form.tel,
              password: this.form.password,
              code: this.form.captcha
            }).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                // localStorage.setItem( 'token',`${res.data.data.token}`);
                setToken(res.data.data.token);
                // this.$message.success("登陆成功");
                this.$router.push("/index");

                //Object.keys(Obj).length > 0   ES6语法，可以用来判断对象是否为空
                // if (Object.keys(this.$store.state.userInfo).length > 0) {
                //   
                // }
              } else {
                this.$message.warning(`${res.data.message}`);
              }
            });
          } else {
            this.$message.error("请填写正确的信息");
            return false;
          }
        } else {
          this.$message.error("请勾选用户协议");
        }
      });
    },
    //注册按钮事件
    registerSubmit() {
      this.$refs.RegisterForm.validate(valid => {
        if (valid) {
          // this.$message.success("注册成功");
          //验证通过，调用注册接口
          // axios({
          //   url: `${process.env.VUE_APP_BASEURL}/register`,
          //   method: "post",
          //   data: {
          //     username: this.registerForm.username,
          //     email: this.registerForm.email,
          //     phone: this.registerForm.phone,
          //     password: this.registerForm.password,
          //     rcode: this.registerForm.rcode,
          //     avatar: this.registerForm.avatar
          //   }
          // })
          register({
            username: this.registerForm.username,
            email: this.registerForm.email,
            phone: this.registerForm.phone,
            password: this.registerForm.password,
            rcode: this.registerForm.rcode,
            avatar: this.registerForm.avatar
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
              this.$refs.RegisterForm.resetFields();
              this.imageUrl = "";
            } else {
              return this.$message.warning(res.data.message);
            }
            window.console.log(res);
          });
        } else {
          this.$message.error("请填写正确信息");
          return false;
        }
      });
    },
    //获取登录图形验证码
    getLoginCaptcha() {
      this.LoginCaptchaURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&_t" + Date.now();
    },
    //获取注册图形验证码
    getRegisterCaptcha() {
      this.RegisterCaptchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&_t" + Date.now();
    },
    //获取短信验证码
    getMsCaptcha() {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.registerForm.phone)) {
        this.$message.error("请输入正确手机号");
      } else if (
        this.registerForm.picCode == "" ||
        this.registerForm.picCode.length == 0
      ) {
        this.$message.error("请输入图形验证码");
      } else {
        //获取短信验证码
        // axios({
        //   url: `${process.env.VUE_APP_BASEURL}/sendsms`,
        //   method: "post",
        //   withCredentials: true,
        //   data: {
        //     code: this.registerForm.picCode,
        //     phone: this.registerForm.phone
        //   }
        // })
        getsmsCode({
          code: this.registerForm.picCode,
          phone: this.registerForm.phone
        }).then(res => {
          if (res.data.code == 200) {
            this.$message.success(`验证码:${res.data.data.captcha}`);
            this.time = 60;
            var timeID = setInterval(() => {
              this.time--;
              if (this.time == 0) {
                clearInterval(timeID);
              }
            }, 100);
          } else {
            this.$message.warning(res.data.message);
          }
          // window.console.log(res);
        });
      }
    },
    //头像上传成功后执行的函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.registerForm.avatar = res.data.file_path;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
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
    .captchaPic {
      width: 100%;
      height: 40px;
    }
  }

  .el-dialog {
    width: 603px;
    height: 786px;
    .el-dialog__header {
      width: 100%;
      height: 53px;
      background: linear-gradient(
        to right,
        rgba(20, 147, 250, 1),
        rgba(1, 198, 250, 1)
      );
      display: flex;
      align-items: center;
      justify-content: center;
      .el-dialog__headerbtn {
        display: none;
      }
    }
    .pic_code,
    .num_captcha {
      width: 100%;
      height: 40px;
    }
    .dialog-footer {
      text-align: center;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .avatar-uploader {
      display: flex;
      justify-content: center;
    }
  }
}
</style>