<template>
  <el-dialog title="新增企业" :visible.sync="$parent.addFormVisible">
    <el-form :model="addFrom" :rules="rules" ref="addFrom">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="addFrom.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addFrom.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addFrom.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="addFrom.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addFrom.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addEnerprise">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseAdd } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      //新增企业表单数据
      addFrom: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      //表单验证规则
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    addEnerprise() {
      this.$refs.addFrom.validate(valid => {
        if (valid) {
          enterpriseAdd(this.addFrom).then(res=>{
            //   window.console.log(res);
              if(res.data.code == 200){
                  this.$message.success('新增企业成功');
                  this.$parent.addFormVisible = false;
                  this.$parent.enterpriseList();
              }else if(res.data.code == 201){
                  this.$message.error('添加失败！ 该企业编号已存在');
              }
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

<style>
</style>