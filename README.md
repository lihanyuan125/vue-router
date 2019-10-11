
vue-router: 实现vue中的路由系统   spa  

    使用步骤：
        import VueRouter from "vue-router"
        Vue.use(VueRouter)
        new VueRouter({})  {}里面配置mode routes
        在main.js中 import router from "./router"
        new Vue({router})

        在项目中使用到了：<router-view></router-view>   
                         <router-link to="/home">首页面</router-link> 
                         this.$router   this.$route  
            说明router-view    router-link  全局注册 

            在后代组件中需要得到router对象

----------------------------------------------- 
hash   history 
hash:  location.hash      load      hashchange
history: h5中的 history.pushState  popstate  xxx 
-------------------------------------------------










































