<template>
  <div class="addQuestionForm">
    <el-dialog
      @opened="opened"
      fullscreen
      center
      title="新增题库测试"
      :visible.sync="$parent.addFormVisible"
    >
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="学科">
          <el-select v-model="addForm.subject" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in $parent.subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="addForm.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="addForm.enterprise" placeholder="请选择企业">
            <el-option
              v-for="(item, index) in $parent.enterpriseList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-cascader
            size="large"
            v-model="addForm.city"
            :options="options"
            :props="props"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度">
          <el-radio-group v-model="addForm.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <!--试题标题，富文本编辑器-->
        <el-form-item label="试题标题"></el-form-item>
        <div class="title-toolbar"></div>
        <div class="title-edit"></div>
        <!--选项区域---单选-->
        <el-form-item label="单选" v-if="addForm.type == 1">
          <el-radio-group v-model="addForm.single_select_answer">
            <!--A选项-->
            <div class="radio-box">
              <el-radio label="A">A</el-radio>
              <el-input v-model="addForm.select_options[0].text"></el-input>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarASuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!--B选项-->
            <div class="radio-box">
              <el-radio label="B">B</el-radio>
              <el-input v-model="addForm.select_options[1].text"></el-input>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarBSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!--C选项-->
            <div class="radio-box">
              <el-radio label="C">C</el-radio>
              <el-input v-model="addForm.select_options[2].text"></el-input>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarCSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!--D选项-->
            <div class="radio-box">
              <el-radio label="D">D</el-radio>
              <el-input v-model="addForm.select_options[3].text"></el-input>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarDSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-radio-group>
        </el-form-item>
        <!--选项区域---多选-->
        <el-form-item v-else-if="addForm.type == 2" label="多选">
          <el-checkbox-group v-model="addForm.multiple_select_answer">
            <!-- 选项A -->
            <div class="radio-box">
              <el-checkbox label="A">A</el-checkbox>
              <!-- 输入框 -->
              <el-input v-model="addForm.select_options[0].text"></el-input>
              <!-- 上传组件 -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!-- 选项B -->
            <div class="radio-box">
              <el-checkbox label="B">B</el-checkbox>
              <!-- 输入框 -->
              <el-input v-model="addForm.select_options[1].text"></el-input>
              <!-- 上传组件 -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleBvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!-- 选项C -->
            <div class="radio-box">
              <el-checkbox label="C">C</el-checkbox>
              <!-- 输入框 -->
              <el-input v-model="addForm.select_options[2].text"></el-input>
              <!-- 上传组件 -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleCvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!-- 选项D -->
            <div class="radio-box">
              <el-checkbox label="D">D</el-checkbox>
              <!-- 输入框 -->
              <el-input v-model="addForm.select_options[3].text"></el-input>
              <!-- 上传组件 -->
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleDvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <!-- 简答题区域 -->
        <el-form-item v-else label="简答题" prop="short_answer">
          <el-input v-model="addForm.short_answer" type="textarea" :rows="6"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="解析视屏">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarVideoSuccess"
            :before-upload="beforeAvatarVideoUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Mp4文件，且不超过2000kb</div>
          </el-upload>
        </el-form-item>
        <video class="preview-video" :src="videoUrl" controls v-if="videoUrl != ''"></video>
        <el-divider></el-divider>
        <!--答案解析，富文本编辑器-->
        <el-form-item label="答案解析"></el-form-item>
        <div class="answer-toolbar"></div>
        <div class="answer-edit"></div>
        <el-divider></el-divider>
        <el-form-item label="试题备注"></el-form-item>
        <el-input type="textarea" :rows="2" v-model="addForm.remark" placeholder="请输入试题备注"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="questionAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入城市联动
import { regionData } from "element-china-area-data";
//导入富文本编辑器
import wangeditor from "wangeditor";
//导入题库接口
import { questionAdd } from "../../../../api/question.js";
export default {
  name: "questionAddDialog",
  data() {
    return {
      //表单的数据
      addForm: {
        //标题
        title: "",
        //学科id标识
        subject: "",
        //阶段
        step: "",
        //企业id标识
        enterprise: "",
        //省市区县
        city: "",
        //题型
        type: 1,
        //题目难度
        difficulty: "",
        //单选题答案
        single_select_answer: "",
        //多选题答案
        multiple_select_answer: "",
        //简答题答案
        short_answer: "",
        //解析视屏地址
        video: "",
        //答案解析
        answer_analyze: "",
        //答案备注
        remark: "",
        //选项，介绍，图片介绍
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      //城市数据
      options: regionData,
      //省级联动设置的属性
      props: { expandTrigger: "hover", value: "label" },
      //titleEditor   标题编辑器是否存在
      titleEditor: undefined,
      //answerEditor   答案编辑器是否存在
      answerEditor: undefined,
      //文件的上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload",
      //视屏的临时地址
      videoUrl: "",
      //图片预览
      imageAUrl: "",
      imageBUrl: "",
      imageCUrl: "",
      imageDUrl: ""
    };
  },
  methods: {
    //新增题库
    questionAdd() {
      questionAdd({
        ...this.addForm
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("新增成功");
          this.$parent.addFormVisible = false;
        }
      });
    },
    handleChange(value) {
      window.console.log(value);
    },
    opened() {
      //设置答案解析编辑器
      if (this.answerEditor == undefined) {
        this.answerEditor = new wangeditor(".answer-toolbar", ".answer-edit");
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          this.addForm.answer_analyze = html;
        };
        this.answerEditor.create();
      }
      //设置标题编辑器
      if (this.titleEditor == undefined) {
        this.titleEditor = new wangeditor(".title-toolbar", ".title-edit");
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          this.addForm.title = html;
        };
        this.titleEditor.create();
      }
    },
    //单选的图片，选择成功后调用的函数
    handleAvatarASuccess(res, file) {
      this.imageAUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[0].image = URL.createObjectURL(file.raw);
    },
    handleAvatarBSuccess(res, file) {
      this.imageBUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[1].image = URL.createObjectURL(file.raw);
    },
    handleAvatarCSuccess(res, file) {
      this.imageCUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[2].image = URL.createObjectURL(file.raw);
    },
    handleAvatarDSuccess(res, file) {
      this.imageDUrl = URL.createObjectURL(file.raw);
      this.addForm.select_options[3].image = URL.createObjectURL(file.raw);
    },
    //单选的图片验证规则
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //视屏上传成功后的回调函数
    handleAvatarVideoSuccess(res, file) {
      //本地视屏的临时地址
      this.videoUrl = URL.createObjectURL(file.raw);
      //设置给form表单
      this.addForm.video = res.data.url;
      window.console.log(res);
      window.console.log(this.videoUrl);
    },
    //视屏上传的验证规则
    beforeAvatarVideoUpload(file) {
      const isMp4 = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isMp4) {
        this.$message.error("上传视屏只能是Mp4格式");
      }
      if (!isLt2M) {
        this.$message.error("上传视屏大小不能超过2MB");
      }
      return isMp4 && isLt2M;
    }
  },
  mounted() {}
};
</script>

<style lang='less'>
.addQuestionForm {
  .el-dialog {
    // width: 602px;
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
      width: 761px;
      margin: 0 auto;
      .el-select,
      .el-cascader {
        width: 364px;
        height: 40px;
      }
      .el-form-item__label {
        margin: 0 41px 0 0;
      }
      .title-toolbar,
      .answer-toolbar {
        border: 1px solid #bfbfbf;
        border-bottom: none;
        margin-left: 61px;
      }
      .title-edit,
      .answer-edit {
        border: 1px solid #bfbfbf;
        height: 200px;
        margin-left: 61px;
      }
      .el-radio-group,
      .el-checkbox-group {
        width: 100%;
        .radio-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 45px;
          .avatar-uploader {
            margin-left: 21px;
            .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
            }
            .el-upload:hover {
              border-color: #409eff;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            }
            .avatar {
              width: 178px;
              height: 178px;
              display: block;
            }
          }
        }
      }
      .preview-video {
        width: 320px;
      }
      .el-textarea {
        margin-left: 61px;
        width: 700px;
      }
    }
  }
}
</style>