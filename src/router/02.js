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
        this.init();  // 用来初始化
    }
    init(){
        if(this.mode === "hash"){
            // 使用的是hash路由
            // console.log("使用的是hash路由")
            // console.log(location.hash)
            location.hash ? "" : location.hash="/";
            console.log(location.hash)  // #/
            window.addEventListener("load",()=>{
                this.history.current = location.hash.slice(1)
                // console.log("load-->",this.history.current)
            })
            window.addEventListener("hashchange",()=>{
                this.history.current = location.hash.slice(1)
                // console.log("hashchange-->",this.history.current)
            })
            
        }else{
            // 使用的是history
            // console.log("使用的是history")
        }
    }
    createMap(routes){
       return routes.reduce((memo,current)=>{
            memo[current.path] = current.component
            return memo;
        },{})
    }
}
VueRouter.install = function(Vue){
}


export default VueRouter