import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost
    }
  ]
})
