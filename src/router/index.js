import Vue from "vue"
import VueRouter from "./vue-router"
import routes from "./routes"

// 使用Vue.use就会调用install方法
Vue.use(VueRouter)

export default new VueRouter({
    mode:"hash",   // hash  history
    routes
})