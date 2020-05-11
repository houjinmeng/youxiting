import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import home from '../components/home'
import Welcome from '../components/Welcome'
import User from '../components/User'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User }
      ]
    }
  ]
})

// 给路由设置“导航守卫”
// 在守卫中对token进行监听，有token就让执行，否则跳回登录页面
// router.beforeEach((to, from, next) => {
//   // 请求login就直接通过
//   if (to.path === '/login') {
//     return next()
//   }
//   // 请求非login就判断token
//   var token = window.sessionStorage.getItem('token')
//   if (!token) {
//     return next('/login')
//   }
//   next() // 请继续你的旅行
// })
export default router
