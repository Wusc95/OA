<template>
  <div class="editUser">
    <el-dialog title="修改用户" :visible.sync="$parent.editDialogFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select v-model="editForm.role_id" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择角色">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userEdit } from "../../../../api/user.js";
export default {
  data() {
    //手机号验证规则
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == true) {
          callback();
        } else {
          return callback(new Error("请输入正确手机号"));
        }
      }
    };
    //邮箱验证规则
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (regEmail.test(value) == true) {
          callback();
        } else {
          return callback(new Error("请输入正确的邮箱"));
        }
      }
    };
    return {
      //新增对话框表单
      editForm: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      //新增用户表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 12, message: "长度在6到12个字符", trigger: "change" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        role_id: [
          { required: true, message: "请选择用户角色", trigger: "blur" }
        ]
      },
      formLabelWidth: "85px"
    };
  },
  methods: {
    //添加用户
    editUser() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          userEdit({
            ...this.editForm
          }).then(res => {
            if(res.data.code == 200){
              this.$message.success('修改成功');
              this.$parent.editDialogFormVisible=false;
              this.$parent.getUserList();
            }else{
              this.$message.error('修改失败，请稍后再试');
            }
            // window.console.log(res);
          });
        } else {
          this.$message.error("请输入正确信息");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less'>
.editUser {
  //新增用户对话框样式
  .el-dialog {
    width: 477px;
    height: 557px;
    .el-dialog__header {
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(
        to right,
        rgba(20, 147, 250, 1),
        rgba(1, 198, 250, 1)
      );

      span {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>