import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state ={
    myRouter:[
        {path:'/',iconName:'el-icon-house',name:'首页'},//默认首页
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
            if(state.myRouter.length <=1){//判断长度
                state.myRouter.push(obj)
            }else if(state.myRouter.length ===2){
                state.myRouter.splice(1,1,obj)
            }
        }else {
            state.myRouter.splice(1,1)
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