<template>
<div>
  <div class="centerInPage">
    <el-input
      v-model="form.email"
      placeholder="请输入邮箱"
      style="width: 40%; margin-bottom: 15px"
    ></el-input>
    <br />
    <el-input
      placeholder="请输入验证码"
      v-model="form.code"
      style="width: 40%; margin-bottom: 15px"
    ></el-input>
    <br />
    <el-button type="success" @click="sendCode" plain :disabled="disabled">{{
      codeBtnMsg
    }}</el-button>
    <el-button type="primary" @click="login" plain>登录</el-button>
    <router-view></router-view>
  </div>
  </div>
</template>

<style>
.centerInPage{
	width: 800px;
	height: 800px;
	/* background: #eee; */
	/* border: 1px solid #ccc; */
	position: absolute;
	left: 25%;top: 50%;
	margin-left: -50px;
	margin-top: -50px;
}
</style>

<script>
import axios from "axios";
export default {
  el: "#app",
  data() {
    return {
      email: "",
      code: "",
      password: "",
      disabled: false, // 发送短信按钮
      codeBtnMsg: "发送验证码", // 发送短信按钮提示
      form: {},
    };
  },
  created(){
  },
  methods: {
    IsEmail(str) {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return  reg.test(str);
    },
    login() {
      if (!this.form.email || !this.form.code) {
        this.$message.error("邮箱和验证码不能为空！");
        return;
      }
      else if (!this.IsEmail(this.form.email)) {
        this.$message.error("邮箱格式错误！");
        return
      }
      this.$http
        .post("/user/login", this.form)
        .then((response) => {
          if (response) {
            // 保存用户信息到session
            console.log(response.data.data)
            sessionStorage.setItem("token", response.data.data);
            sessionStorage.setItem("email", this.form.email);
            this.$store.commit("sendEmailVal", this.form.email);
            console.log("呵呵" + response.data.data)
            if(response.data.data === undefined){
              // console.log('空的')
              this.$message.error('验证码或邮箱错误')
              return
            }
          }
          // 跳转
          // location.href = "http://baidu.com"
          this.$destroy(); // 销毁当前组件
          console.log('哈哈哈1 '+ this.form.email)
          this.$store.commit('sendEmailVal', this.form.email)
          console.log('哈哈哈2 '+ this.$store.state.email)
          this.$router.push({ path: '/', query: { email: this.form.email } });
        })
        .catch((err) => this.$message.error(err));
    },
    goBack() {
      history.back();
    },
    sendCode() {
      if (!this.form.email) {
        this.$message.error("邮箱不能为空");
        return;
      }
      else if (!this.IsEmail(this.form.email)) {
        this.$message.error("邮箱格式错误！");
        return
      }
      // 发送验证码
      axios
        .post("/user/code?email=" + this.form.email)
        .then(() => {})
        .catch((err) => {
          console.log(err);
          this.$message.error(err);
        });
      // 禁用按钮
      this.disabled = true;
      // 按钮倒计时
      let i = 60;
      this.codeBtnMsg = i-- + "秒后可重发";
      let taskId = setInterval(
        () => (this.codeBtnMsg = i-- + "秒后可重发"),
        1000
      );
      setTimeout(() => {
        this.disabled = false;
        clearInterval(taskId);
        this.codeBtnMsg = "发送验证码";
      }, 59000);
    },
  },
};
</script>