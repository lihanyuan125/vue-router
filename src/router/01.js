class VueRouter{
    constructor(options){
        // console.log(options)
        this.mode = options.mode || "hash";
        this.routes = options.routes || [];
        this.routesMap = this.createMap(this.routes)
        console.log(this.routesMap)
    }
    // createMap  可以把数组结构转化成对象结构
    // [
    //     {path:"/home",component:Home},
    //     {path:"/about",component:About},
    // ]
    createMap(routes){
       return routes.reduce((memo,current)=>{
            // memo 刚开始是一个空对象
            memo[current.path] = current.component
            return memo;
        },{})
    }
}
// install方法中第一个参数就是Vue构造器
VueRouter.install = function(Vue){
    // console.log(Vue)
}


export default VueRouter