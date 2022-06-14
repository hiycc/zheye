import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import CreateColumn from './views/CreateColumn.vue'
import Register from './views/Register.vue'

const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectLogin: true
      }
    },
    {
      path: '/detail/:columnId',
      name: 'detail',
      component: ColumnDetail
    },
    {
      path: '/createPost',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/createColumn',
      name: 'createColumn',
      component: CreateColumn,
      meta: {
        requireLogin: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin && !store.state.user.isLogin) {
    console.log('123')
    next({ name: 'login' })
  } else if (to.meta.redirectLogin && store.state.user.isLogin) {
    console.log(to.meta)
    next({ name: 'home' })
  } else {
    next()
  }
})
