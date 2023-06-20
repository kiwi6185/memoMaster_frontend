<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- 声明路由链接 -->
    <!-- <router-link to="/postarticle">发表文章</router-link>
    <br>
    <router-link to="/browsearticle">浏览文章</router-link> -->
    <!-- <router-link to="/login">登录</router-link> -->
    <!-- 声明路由占位标签 -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
