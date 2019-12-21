<template>
  <div class="user">
    <el-card class="box-card user-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.role_id" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserList">搜索</el-button>
          <el-button @click="cleanForm">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addDialogFormVisible=!addDialogFormVisible"
          >新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card user-body">
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index" width="70" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id == 2">管理员</span>
            <span v-else-if="scope.row.role_id == 3">老师</span>
            <span v-else-if="scope.row.role_id == 4">学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditForm(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status == 1?"禁用":"启用"}}</el-button>
            <el-button type="text" @click="userRemove(scope.row)">删除</el-button>
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

    <!--新增用户对话框组件-->
    <addDialog></addDialog>
    <!--编辑用户对话框组件-->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
//导入新增用户毒化框组件
import addDialog from "./components/addDialog";
import editDialog from "./components/editDialog";
import { userList, userStatus, userRemove } from "../../../api/user.js";
export default {
  name: "user",
  data() {
    return {
      //顶部表单
      formInline: {
        user_name: "",
        email: "",
        role_id: ""
      },
      //主体内容
      userList: [],
      //是否显示新增用户对话框
      addDialogFormVisible: false,
      //是否显示编辑用户对话框
      editDialogFormVisible: false,
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
    //显示编辑框
    showEditForm(item) {
      this.editDialogFormVisible = true;
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
    },
    //删除用户
    userRemove(item) {
      userRemove({
        id: item.id
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getUserList();
        } else {
          this.$message.error("删除失败，请稍后重试");
        }
      });
    },
    //设置用户状态
    changeStatus(item) {
      userStatus({
        id: item.id
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("状态修改成功");
          this.getUserList();
        }
      });
    },
    //清除搜索条件
    cleanForm() {
      this.formInline = {};
      this.getUserList();
    },
    //获取用户列表
    getUserList() {
      userList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.userList = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    //页容量改变
    handleSizeChange(limit) {
      // window.console.log(`每页 ${limit} 条`);
      this.limit = limit;
      this.getUserList();
    },
    //页码改变
    handleCurrentChange(page) {
      // window.console.log(`当前页: ${page}`);
      this.page = page;
      this.getUserList();
    }
  },
  components: {
    //注册组件
    addDialog,
    editDialog
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang='less'>
.user {
  height: 100%;
  .user-header {
    display: flex;
    justify-content: flex-start;
  }
  .user-body {
    margin-top: 19px;
    text-align: center;
    .el-pagination {
      margin-top: 30px;
    }
  }
}
</style>