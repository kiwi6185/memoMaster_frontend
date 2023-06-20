<template>
  <div class="sendAritical">
    <div>正在编辑 便签号 {{this.form.id}}</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="便签标题">
        <el-input v-model="form.title">{{this.form.title}}</el-input>
      </el-form-item>
      <el-form-item label="便签内容">
        <el-input type="textarea" rows="10" v-model="form.content">{{this.form.content}}</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <div id="file">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8080/upload"
        multiple
        :file-list="fileList"
        :on-success="handleSucess"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png/txt/pdf/excel文件，且不超过2MB</div>
      </el-upload>
    </div> -->
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  data: function(){
    return{
      form: {
        id: store.state.updateId, // VueX
        title: store.state.updateTitle,
        content: store.state.updateContent,
        region: "",
        delivery: false,
        type: [],
      },
    }
  },
  created(){
    console.log("这里 " + this.form.id)
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      if (!this.form.title || !this.form.content) {
        this.$message.error("标题和内容不能为空！");
        return;
      }
      this.$http
        .put("/article/update/" + this.form.id, this.form)
        .then((response) => {
          if (response) {
            console.log(response);
          }
          // 跳转
          // this.$destroy(); // 销毁当前组件
          this.$router.push("/browsearticle");
          // 重新加载当前页面
          // location.reload();
        })
        .catch((err) => this.$message.error(err));
    },
    onCancel() {
      this.$router.push("/browsearticle");
    },
  },
}
</script>

<style>
.sendAritical {
  width: 50%; /* 这里设置为要缩小的宽度 */
  margin: 0 auto;
}
.sameline {
  flex: 1 1 auto;
  flex-direction: row-reverse;
  display: flex;
}
</style>