class HistoryRoute{
    constructor(){
        this.current = null;
    }
}
class VueRouter{
    constructor(options){
        this.mode = options.mode || "hash";
        this.routes = options.routes || [];
        this.routesMap = this.createMap(this.routes)
        this.history = new HistoryRoute()
        this.init();  
    }
    init(){
        if(this.mode === "hash"){
            location.hash ? "" : location.hash="/";
            console.log(location.hash)  // #/
            window.addEventListener("load",()=>{
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener("hashchange",()=>{
                this.history.current = location.hash.slice(1)
            })
            
        }else{
            location.pathname ? "" : location.pathname = "/"
            window.addEventListener("load",()=>{
                this.history.current = location.pathname
            })
            window.addEventListener("popstate",()=>{
                this.history.current = location.pathname
            })
        }
    }
    push(){}
    go(){}
    back(){}
    createMap(routes){
       return routes.reduce((memo,current)=>{
            memo[current.path] = current.component
            return memo;
        },{})
    }
}
VueRouter.install = function(Vue){
    // 当使用Vue.use(Vue-router)时，调用install方法
    // Vue.component() // 全局组件
    Vue.mixin({
        // 给每个组件都是混入一个beforeCreate
        beforeCreate () {
            // 获取根组件
            if(this.$options && this.$options.router){
                // 找到根组件
                // 把当前实例挂载到_root上
                this._root = this  // main 根组件
                // 把router实例挂载到_router上面
                this._router = this.$options.router  
            }else{  // main ----> app    --->  Home/About   所有组件中都是有router
                this._root = this.$parent._root;
            }

            // this.$options.name 获取组件的名字
            // console.log(this.$options.name)
            Object.defineProperty(this,"$router",{
                get(){
                    return this._root._router;
                }
            })
            Object.defineProperty(this,"$route",{
                get(){
                    return{}
                }
            })
        }
    }),
    Vue.component("router-link",{
        render(h){
            return <a>router-link</a>
        }
    }),
    Vue.component("router-view",{
        render(h){
            return <h1>router-view</h1>
        }
    })
}
export default VueRouter