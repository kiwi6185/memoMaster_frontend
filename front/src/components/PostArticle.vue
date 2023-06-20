<template>
  <div class="sendAritical">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="便签标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- <div class="sameline">
        <el-form-item label="文章类型">
          <el-select v-model="form.region" placeholder="请选择文章类型">
            <el-option label="心情类" value="feeling"></el-option>
            <el-option label="科技类" value="IT"></el-option>
            <el-option label="热点类" value="hotspot"></el-option>
            <el-option label="故事类" value="story"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仅我可见">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
      </div> -->
      <el-form-item label="便签内容">
        <el-input type="textarea" rows="10" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发表</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

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

<script>
export default {
  props: ["userEmail"],
  data() {
    return {
      form: {
        title: "",
        content: "",
        region: "",
        delivery: false,
        type: [],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log("这里123 " + sessionStorage.getItem("email"))
      if (!this.form.title || !this.form.content) {
        this.$message.error("标题和内容不能为空！");
        return;
      }
      this.$http
        .post("/article/post", { userEmail: this.userEmail, ...this.form })
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
};
</script>