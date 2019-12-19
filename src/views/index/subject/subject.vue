<template>
  <div class="subject">
    <el-card class="box-card subject-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" class="dd">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button type="primary" @click="dialogFormVisible=!dialogFormVisible" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subject-body">
      <el-table :data="subjectList" stripe style="width: 100%">
        <el-table-column prop="id" label="序号" width="150"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
    <!--新增学科录入框-->
    <addDialog></addDialog>
    <!-- <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiscipline">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
//导入新增学科对话组件
import addDialog  from "./components/addDialog.vue"
// import axios from "axios";
// import { getToken } from "../../../utils/token";
import {getSubjectList } from "../../../api/subject.js";
export default {
  data() {
    return {
      //顶部表单
      formInline: {
        user: "",
        region: ""
      },
      //新增对话框是否显示
      dialogFormVisible: false,
      
      //学科列表
      subjectList: [],
      
      
      //分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    },

    //获取学科列表
    getSubjectList() {
      // axios({
      //   url:process.env.VUE_APP_BASEURL+'/subject/list',
      //   method:'get',
      //   headers:{
      //     token:getToken()
      //   },
      //   params:{
      //     name:'',
      //     page:'',
      //     limit:'',
      //     rid:'',
      //     username:'',
      //     status:''
      //   }
      // })
      getSubjectList({
        name: "",
        page: "",
        limit: "8",
        rid: "",
        username: "",
        status: ""
      }).then(res => {
        window.console.log(res);
        this.subjectList = res.data.data.items;
      });
    },
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  },
  //注册组件
  components:{
    addDialog
  },
  created() {
    this.getSubjectList();
  }
};
</script>

<style lang='less'>
.subject {
  height: 100%;
  .subject-header {
    display: flex;
    justify-content: flex-start;
  }
  .subject-body {
    margin-top: 19px;
    text-align: center;
  }

}
</style>