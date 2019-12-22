<template>
  <div class="question">
    <el-card class="question-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline myForm">
        <el-form-item label="学科">
          <el-select v-model="formInline.region" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.region" placeholder="请选择企业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.region" placeholder="请选择题型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.region" placeholder="请选择难度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-select v-model="formInline.region" placeholder="请选择日期">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="标题">
          <el-input v-model="formInline.user" class="myTitle"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible=!addFormVisible">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="question-body">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="80" label="序号"></el-table-column>
        <el-table-column prop="address" label="题目"></el-table-column>
        <el-table-column prop="address" label="学科·阶段"></el-table-column>
        <el-table-column prop="address" label="题型"></el-table-column>
        <el-table-column prop="address" label="企业"></el-table-column>
        <el-table-column prop="address" label="创建者"></el-table-column>
        <el-table-column prop="address" label="状态"></el-table-column>
        <el-table-column prop="address" label="访问量"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!--引入新增题库对话框组件-->
    <addDialog></addDialog>
  </div>
</template>

<script>
//注册新增题库对话框组件
import addDialog from "./components/addDialog.vue";
import { questionList } from "../../../api/question.js";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      //数据
      tableData: [],
      //新增题库对话框是否显示
      addFormVisible: false,
      //数据总条数
      total: 0,
      //选择每页显示多少
      pageSizes: [2, 4, 6, 8, 10],
      //页码
      page: 1,
      //每页显示多少数据
      limit: 6
    };
  },
  methods: {
    //获取数据
    getQuestionList() {
      questionList({
        limit: this.limit,
        page: this.page
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 页容量改变
    handleSizeChange(limit) {
      // window.console.log(`每页 ${limit} 条`);
      this.limit = limit;
      this.getQuestionList();
    },
    // 页码改变
    handleCurrentChange(page) {
      // window.console.log(`当前页: ${page}`);
      this.page = page;
      this.getQuestionList();
    }
  },
  components: {
    addDialog
  },
  created() {
    this.getQuestionList();
  }
};
</script>

<style lang="less">
.question {
  .question-header {
    .myForm {
      .el-form-item__label {
        padding: 0 30px;
      }
      .el-input {
        width: 150px;
        height: 38px;
      }
      .myTitle {
        width: 388px;
        height: 39px;
      }
    }
  }
  .question-body {
    margin-top: 21px;
    text-align: center;
    .el-pagination {
      margin-top: 31px;
    }
  }
}
</style>