import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://120.24.186.236:9999'
// axios.interceptors.request.use(config => {
//   store.commit('setLoading', true)
//   return config
// })
// axios.interceptors.response.use(config => {
//   store.commit('setLoading', false)
//   return config
// })
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
