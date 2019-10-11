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
            // console.log(location.hash)  // #/
            window.addEventListener("load",()=>{
                this.history.current = location.hash.slice(1)
                // console.log(this.history.current)
            })
            window.addEventListener("hashchange",()=>{
                // console.log(this.history.current,"----")
                this.history.current = location.hash.slice(1)
                // console.log(this.history.current)
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
    Vue.mixin({
        beforeCreate () {
            if(this.$options && this.$options.router){
                this._router = this.$options.router  
                this._root = this  
                Vue.util.defineReactive(this,"xxx",this._router,history)
            }else{ 
                this._root = this.$parent._root;
            }
            Object.defineProperty(this,"$router",{
                get(){
                    return this._root._router;
                }
            })
            Object.defineProperty(this,"$route",{
                get(){
                    // console.log(this._root._router.history)
                    return{
                        current:this._root._router.history.current
                    }
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
            // console.log(this)
            let current = this._self._root._router.history.current;
            // console.log(current)
            let routesMap = this._self._root._router.routesMap;
            return h(routesMap[current])
        }
    })
}
export default VueRouter