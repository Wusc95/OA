<template>
  <div class="addQuestionForm">
    <el-dialog title="新增题库测试" :visible.sync="$parent.addFormVisible">
      <el-form :model="form">
        <el-form-item label="学科" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择企业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="radio">
            <el-radio :label="3">单选</el-radio>
            <el-radio :label="6">多选</el-radio>
            <el-radio :label="9">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="radio">
            <el-radio :label="3">简单</el-radio>
            <el-radio :label="6">一般</el-radio>
            <el-radio :label="9">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <hr>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="$parent.addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "questionAddDialog",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      radio: 3,
      formLabelWidth: "306px"
    };
  }
};
</script>

<style lang='less'>
.addQuestionForm {
  .el-dialog {
    width: 1429px;
    height: 2408px;
    .el-dialog__header {
      display: flex;
      justify-content: flex-start;
      span.el-dialog__title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }

    .el-form {
      .el-select {
        width: 364px;
        height: 40px;
      }
      .el-form-item__label {
          margin: 0 41px;
      }
      hr {
          width: 832px;
          float: left;
      }
    }
  }
}
</style>