<template>
  <el-dialog title="修改学科" :visible.sync="$parent.editDialogFormVisible">
    <el-form :model="editForm" :rules="rules" ref="editForm"> 
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="subjectEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "../../../../api/subject.js";
export default {
  data() {
    return {
      //编辑学科对话框表单
      editForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //编辑学科学科表单验证规则
      rules: {
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }]
      },
      formLabelWidth: "85px"
    };
  },
  methods: {
    //编辑学科
    subjectEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          subjectEdit({
            ...this.editForm
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("修改成功");
              this.$parent.editDialogFormVisible = false;
              this.$parent.getSubjectList();
            }else if(res.data.code == 201){
              this.$message.error('修改失败，该学科编号已存在');
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
//编辑学科学科对话框样式
.el-dialog {
  width: 603px;
  height: 500px;
  .el-dialog__header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to right,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    .el-dialog__headerbtn {
      display: none;
    }
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
</style>