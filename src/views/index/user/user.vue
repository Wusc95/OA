<template>
  <div class="user">
    <el-card class="box-card user-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card user-body">
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index" width="70" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{scope.row.status == 1?"禁用":"启用"}}</el-button>
            <el-button type="text">删除</el-button>
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
  </div>
</template>

<script>
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
      //主体内容
      userList: {
        username:"",
        phone:"",
        email:"",
        role_id:"",
        remark:"",
        status:""
      },
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
    //页容量改变
    handleSizeChange(limit) {
      window.console.log(`每页 ${limit} 条`);
    },
    //页码改变
    handleCurrentChange(page) {
      window.console.log(`当前页: ${page}`);
    }
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