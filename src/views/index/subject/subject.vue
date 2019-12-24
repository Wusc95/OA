<template>
  <div class="subject">
    <el-card class="box-card subject-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" class="dd">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getSubjectList">搜索</el-button>
          <el-button @click="cleanForm">清除</el-button>
          <el-button
            type="primary"
            @click="addDialogFormVisible=!addDialogFormVisible"
            icon="el-icon-plus"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subject-body">
      <el-table :data="subjectList" stripe style="width: 100%">
        <el-table-column type="index" width="70" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)" v-isShow="['老师','学生']">编辑</el-button>

            <el-button
              type="text"
              @click="changeStatus(scope.row)"
              v-isShow="['学生']"
            >{{scope.row.status == 1?"禁用":"启用"}}</el-button>

            <el-button type="text" @click="removeSubject(scope.row)" v-isShow="['学生','老师']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!--新增学科录入框-->
    <addDialog></addDialog>
    <!--编辑学科录入框-->
    <editDialog ref="editDialog"></editDialog>

    <!-- <el-dialog title="新增学科" :visible.sync="addDialogFormVisible">
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
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDiscipline">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
//导入新增学科对话组件
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
// import axios from "axios";
// import { getToken } from "../../../utils/token";
import {
  getSubjectList,
  subjectStatus,
  subjectRemove
} from "../../../api/subject.js";
export default {
  data() {
    return {
      //顶部表单
      formInline: {
        rid: "",
        name: "",
        status: "",
        username: ""
      },
      //新增对话框是否显示
      addDialogFormVisible: false,
      //编辑对话框是否显示
      editDialogFormVisible: false,
      //学科列表
      subjectList: [],
      //页码
      page: 1,
      //每页多少数据
      limit: 6,
      //总条数
      total: 0,
      //选择显示多少条
      pageSizes: [2, 4, 6, 8, 10]
    };
  },
  methods: {
    //进去编辑框状态
    showEdit(item) {
      this.editDialogFormVisible = true;
      // window.console.log(item);
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    },
    //删除学科
    removeSubject(item) {
      this.$confirm("是否要删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subjectRemove({
            id: item.id
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.getSubjectList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //清空搜索列表
    cleanForm() {
      for (const key in this.formInline) {
        this.formInline[key] = "";
      }
      this.getSubjectList();
    },
    //改变状态
    changeStatus(item) {
      subjectStatus({
        id: item.id
      }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.$message.success("设置成功");
          this.getSubjectList();
        }
      });
    },
    //获取学科列表
    getSubjectList() {
      getSubjectList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.subjectList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    //页容量改变
    handleSizeChange(limit) {
      window.console.log(`每页 ${limit} 条`);
      this.limit = limit;
      this.getSubjectList();
    },
    //页码改变
    handleCurrentChange(page) {
      window.console.log(`当前页: ${page}`);
      this.page = page;
      this.getSubjectList();
    }
  },
  //注册组件
  components: {
    addDialog,
    editDialog
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
    .el-pagination {
      margin-top: 30px;
    }
  }
}
</style>