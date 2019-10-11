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
            // console.log(location.pathname)
            location.pathname ? "" : location.pathname = "/"
            window.addEventListener("load",()=>{
                this.history.current = location.pathname
                // console.log("load--->", this.history.current)
            })
            window.addEventListener("popstate",()=>{
                this.history.current = location.pathname
                // console.log("popstate--->", this.history.current)
            })
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