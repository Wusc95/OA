<template>
  <el-dialog title="修改企业" :visible.sync="$parent.editFormVisible">
    <el-form :model="editForm" :rules="rules" ref="editForm">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="editForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth"  prop="short_name">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth"  prop="intro">
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="enterpriseEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseEdit } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      //编辑企业对话框表单
      editForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //编辑企业表单验证规则
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        short_name: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        intro: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
      },
      formLabelWidth: "85px"
    };
  },
  methods: {
    //编辑企业
    enterpriseEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          enterpriseEdit({
            ...this.editForm
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("修改成功");
              this.$parent.editFormVisible = false;
              this.$parent.enterpriseList();
            } else if (res.data.code == 201) {
              this.$message.error("修改失败，该企业编号已存在");
            }
            window.console.log(res);
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
//编辑企业学科对话框样式
// .el-dialog {
//   width: 603px;
//   height: 500px;
//   .el-dialog__header {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: linear-gradient(
//       to right,
//       rgba(20, 147, 250, 1),
//       rgba(1, 198, 250, 1)
//     );
//     .el-dialog__headerbtn {
//       display: block;
//       i {
//         color: wheat;
//       }
//     }
//     span {
//       font-size: 18px;
//       font-family: Microsoft YaHei;
//       font-weight: bold;
//       color: rgba(255, 255, 255, 1);
//     }
//   }
//   .el-dialog__footer {
//     text-align: center;
//   }
// }
</style>