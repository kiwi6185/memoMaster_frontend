<template>
  <div>
    <div class="logout-button">
      <el-button type="danger" icon="el-icon-back" size="mini" @click="handleLogout">登出</el-button>
    </div>
    <!-- 声明路由链接 -->
    <div class="user-info">
      <span class="email">欢迎你，用户 {{ this.$store.state.email }}</span>
    </div>
    <el-tabs
      style="z-index: 0;"
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane :msgchange=msgdata label="便签浏览" name="browsearticle" @tab-click="handleClick"></el-tab-pane>
      <el-tab-pane label="便签发表" name="postarticle" @tab-click="handleClick"></el-tab-pane
      >
    </el-tabs>
    <!-- 声明路由占位标签 -->
    <PostArticle @tabclick="setActiveName" :select="selectIndex"></PostArticle>
    <UpdateArticle></UpdateArticle>
    <router-view></router-view>
  </div>
</template>

<script>
import store from '../vuex/store'
//添加以下代码
export default {
  data() {
    return {
      userEmail: "",
      msgdata:'我是父组件传值',
      activeName: 'browsearticle',
    };
  },
  created(){
    this.userEmail = this.$route.query.email;
    this.userEmail = this.store.state.email;
    console.log("邮箱号：" + this.userEmail)
    // userEmail = localStorage.getItem("email")
    this.$router.push("/browsearticle");
    updateActiveName('browsearticle')
  },
  methods: {
    handleLogout(){
      this.$router.push("/login");
      location.reload();
    },
    setActiveName(name) {
      this.activeName = name;
      console.log('这里 ' + name)
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.path);
      if (tab.name === null) {
        tab.name === "browsearticle";
        this.path !== "/browsearticle";
      }
      else if (tab.name === "browsearticle" && this.path !== "/browsearticle") {
        this.path = "/browsearticle";
        this.$router.push("/browsearticle");
      } else if (tab.name === "postarticle" && this.path !== "/postarticle") {
        this.path = "/postarticle";
        this.$router.push("/postarticle");
      }
    }
  },
};
</script>

<style>
.logout-button {
  z-index: 1;
  position: fixed;
  /* bottom: 20px; */
  right: 20px;
  display: flex;
  justify-content: flex-end;
}

.page {
  position: relative; /* 定位上下文，便于绝对定位 */
}

.user-info {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.user-info .nickname {
  margin-right: 16px;
  font-weight: bold;
}
</style>