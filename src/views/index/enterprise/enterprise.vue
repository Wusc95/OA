<template>
  <div class="enterprise">
    <el-card class="box-card enterprise-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="short-input" v-model="formInline.eid" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formInline.name" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short-input" v-model="formInline.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="enterpriseList">搜索</el-button>
          <el-button @click="cleanFormInline">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible=!addFormVisible">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card enterprise-body">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="序号" type="index" width="70"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="update_time" label="创建日期">
          <template slot-scope="scope">
              <span>{{scope.row.update_time | formatTime}}</span>
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
            <el-button type="text" @click="showForm(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status==1?"禁用":"启用"}}</el-button>
            <el-button type="text" @click="removeEnterprise(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pagesize"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!--新增企业对话框组件-->
    <addDialog></addDialog>
    <!--修改企业对话框组件-->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
//导入新增企业对话框组件
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
import {
  enterpriseList,
  enterpriseStatus,
  enterpriseRemove
} from "../../../api/enterprise.js";

export default {
  data() {
    return {
      //按条件搜索表单
      formInline: {
        name: "",
        eid: "",
        username: "",
        status: ""
      },
      //主体数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      //新增企业表单是否显示
      addFormVisible: false,
      //修改企业表单是否显示
      editFormVisible: false,

      //页码
      page: 1,
      //每页显示多少条数据
      limit: 6,
      //有多少条数据
      total: 0,
      //pagesize选择每页显示多少数据
      pagesize: [2, 4, 6, 8, 10]
    };
  },
  methods: {
    //点击编辑，显示编辑框，并显示需要编辑的企业信息
    showForm(item){
      this.editFormVisible=true;
      this.$refs.editDialog.editForm=JSON.parse(JSON.stringify(item));
    },
    //删除当前点击的企业
    removeEnterprise(item) {
      this.$confirm("确认删除该条数据", "提示！", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          enterpriseRemove({
            id: item.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              this.enterpriseList();
            } else {
              this.$message.error("删除失败，请稍后重试");
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    //企业状态设置status
    changeStatus(items) {
      enterpriseStatus({
        id: items.id
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("更改成功");
          this.enterpriseList();
        }
      });
    },
    //清空搜索条件
    cleanFormInline() {
      for (const key in this.formInline) {
        this.formInline[key] = "";
      }
      this.enterpriseList();
    },
    //获取企业列表
    enterpriseList() {
      enterpriseList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          if (res.data.data.items.length == 0) {
            this.$message.error("未查找到符合条件的数据");
          } else {
            this.tableData = res.data.data.items;
            this.total = res.data.data.pagination.total;
          }
        }
      });
    },
    //页容量改变触发
    handleSizeChange(limit) {
      window.console.log(`每页 ${limit} 条`);
      this.limit = limit;
      this.enterpriseList();
    },
    //页码改变触发
    handleCurrentChange(page) {
      window.console.log(`当前页: ${page}`);
      this.page = page;
      this.enterpriseList();
    }
  },
  created() {
    this.enterpriseList();
  },
  //注册组件
  components: {
    addDialog,
    editDialog
  }
};
</script>

<style lang='less'>
.enterprise {
  height: 100%;
  .enterprise-header {
    .el-form-item {
      .short-input {
        width: 100px;
      }
    }
  }
  .enterprise-body {
    margin-top: 19px;
    text-align: center;
    .el-pagination {
      margin-top: 19px;
    }
  }
}
</style>