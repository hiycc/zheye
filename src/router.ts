import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Hall from './views/Hall.vue'
import Login from './views/Login.vue'
import store from './store/store'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import CreateColumn from './views/CreateColumn.vue'
import Register from './views/Register.vue'
import ProfileEditor from './views/ProfileEditor.vue'

const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileEditor,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/',
      name: 'hall',
      component: Hall
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
  // const store = useStore()
  // const token = localStorage.getItem('token')
  // if (token) {
  //   store.dispatch('loginWithToken', token)
  // } else {
  //   console.log('456')
  // }
  if (to.meta.requireLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectLogin && store.state.user.isLogin) {
    console.log(to.meta)
    next({ name: 'hall' })
  } else {
    next()
  }
})
