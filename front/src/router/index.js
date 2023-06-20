import VueRouter from 'vue-router'
import Vue from 'vue'
import LoginNregister from '../components/LoginNregister.vue'
import Index from '../components/Index'
import PostArticle from '../components/PostArticle.vue'
import BrowserArticle from '../components/BrowseArticle.vue'
import UpdateArticle from '../components/UpdateArticle.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//将VueRouter设置为Vue的插件
Vue.use(VueRouter)

const router = new VueRouter({
    // 指定hash属性与组件的对应关系
    routes: [
        { path: '/login', name: 'LoginNregister', component: LoginNregister },
        { path: '/', name: 'home', component: Index,
            children: [
                {path: "/postarticle", component: PostArticle},
                {path: "/browsearticle", component: BrowserArticle},// 我是从这里调到 UpdateArticle
                {path: "/updatearticle", component: UpdateArticle, name: UpdateArticle}
            ]
        },
    ]
})
export default router