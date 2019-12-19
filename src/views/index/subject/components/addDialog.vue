<template>
  <el-dialog title="新增学科" :visible.sync="$parent.dialogFormVisible">
    <el-form :model="addForm" :rules="rules" ref="addForm">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDiscipline">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addDiscipline } from "../../../../api/subject.js";
export default {
  data() {
    return {
      //新增对话框表单
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //新增学科表单验证规则
      rules: {
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }]
      },
      formLabelWidth: "85px"
    };
  },
  methods: {
    //添加学科
    addDiscipline() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addDiscipline({
            rid: this.addForm.rid,
            name: this.addForm.name,
            short_name: this.addForm.short_name,
            intro: this.addForm.intro,
            remark: this.addForm.remark
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("添加成功");
              this.$parent.dialogFormVisible = false;
              this.$parent.getSubjectList();
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
//新增学科对话框样式
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