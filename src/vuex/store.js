import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state ={
    myRouter:[
        {path:'/home',iconName:'el-icon-house',name:'首页'},//默认首页
    ]
};
const actions={
    routerFun({commit},obj){//得到页面传入的数据
       commit('pushRouter',obj)
    }
};
const mutations ={
pushRouter(state,obj){
        if(obj.name !== '首页'){
            state.myRouter=[{path:'/home',iconName:'el-icon-house',name:'首页'}]
            state.myRouter=state.myRouter.concat(obj)
        }else {
            state.myRouter=[{path:'/home',iconName:'el-icon-house',name:'首页'}]
        }
        let myRouter = JSON.stringify(state.myRouter)
        sessionStorage.setItem('myRouter',myRouter)//存入本地是为了解决刷新的问题，在第七步会使用到
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})