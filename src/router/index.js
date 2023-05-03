import Vue from 'vue'
import VueRouter from 'vue-router'
import { getLocalStorage } from "../utils/localStorageExceed"
Vue.use(VueRouter)

const routes = [
  {
    path: '/personalcenter',
    name: 'personalcenter',
    redirect: '/personalcenter/basicInfor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/personalCenter.vue'),
    children: [
      {
        path: 'basicInfor',
        name: 'basicInfor',
        component: () => import('../childrenView/personalCenter/basicInformation.vue')
      },
      {
        path: 'modifyInfor',
        name: 'modifyInfor',
        component: () => import('../childrenView/personalCenter/modifyInformation.vue')
      },
      {
        path: 'modifyPassword',
        name: 'modifyPassword',
        component: () => import('../childrenView/personalCenter/modifyPassword.vue')
      },
      {
        path: 'modifyHeaderPhoto',
        name: 'modifyHeaderPhoto',
        component: () => import('../childrenView/personalCenter/modifyHeaderPhoto.vue')
      },
    ]
  },
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signal',
    name: 'signal',
    component: () => import('../views/Signal.vue')
  },
  {
    path: '/psychoTest',
    name: 'psychoTest',
    component: () => import('../views/psychoTest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {//所有不是前往login页面的路由都会被拦截
    if (!getLocalStorage("AccessToken")) {//token过期或不存在
      next('/login')
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})
export default router
