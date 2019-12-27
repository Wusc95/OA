<template>
  <div class="question">
    <el-card class="question-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline myForm">
        <el-form-item label="学科">
          <el-select v-model="formInline.region" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
            <el-option
              v-for="(item, index) in enterpriseList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学科·阶段">
          <template slot-scope="scope">
            {{scope.row.subject_name}}
            {{ {1:"初级",2:"中级",3:"高级"}[scope.row.step] }}
          </template>
        </el-table-column>
        <el-table-column prop="question_type" label="题型">
          <template slot-scope="scope">{{ {1:"单选",2:"多选",3:"简答"}[scope.row.step] }}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeStatus(scope.row)">
              {{
              scope.row.status === 1 ? "禁用" : "启用"
              }}
            </el-button>
            <el-button type="text"  @click="removeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
import { questionList,questionStatus,questionRemove } from "../../../api/question.js";
import { enterpriseList } from "../../../api/enterprise.js";
import { getSubjectList } from "../../../api/subject.js";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      //数据
      tableData: [],
      //企业列表
      enterpriseList: [],
      //学科列表
      subjectList: [],
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
    // 页容量改变
    handleSizeChange(limit) {
      this.limit = limit;
      // 重新获取数据
      this.getData();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.page = page;
      // 重新获取数据
      this.getData();
    },
    // 修改状态
    changeStatus(item) {
      questionStatus({ id: item.id }).then(res => {
        if (res.code === 200) {
          this.$message.success("状态修改成功");
          this.getData();
        }
      });
    },
    // 删除数据
    removeItem(item) {
      this.$confirm("你真的要把他删掉吗？o(╥﹏╥)o", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              if (this.tableData.length == 1) {
                // 一会刷新就没有数据了
                // 修改页码
                this.page--;
                // 三元表达式
                // 如果 this.page 小于1 那么就变为1 否则 是什么就是什么
                // this.page = this.page<1?1:this.page
                if (this.page < 1) {
                  this.page = 1;
                }
              }
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    //获取数据
    getQuestionList() {
      questionList({
        limit: this.limit,
        page: this.page
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    }
  },
  components: {
    addDialog
  },
  created() {
    // //获取学科列表
    getSubjectList().then(res => {
      //  window.console.log(res);
      this.subjectList = res.data.data.items;
    });
    //获取企业列表
    enterpriseList().then(res => {
      // window.console.log(res);
      this.enterpriseList = res.data.data.items;
    });
    //获取题库数据
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