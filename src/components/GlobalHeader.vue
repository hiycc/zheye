<template>
  <nav class="navbar navbar-dark bg-primary mb-4 px-3 d-flex">
    <router-link :to="{path: '/'}"><a href="#" class="navbar-brand fs-4">学洱</a></router-link>
    <span class="navbar-text pb-0" v-if="!isMobile"
    >
      Share Your World!
    </span>
    <ul v-if="!user.isLogin" class="list-inline ms-auto mb-0">
      <li class="list-inline-item"><router-link :to="{path: '/login'}"><a href="#" class="btn btn-outline-light my-2">登陆</a></router-link></li>
      <li class="list-inline-item"><router-link :to="{path: '/register'}"><a href="#" class="btn btn-outline-light my-2">注册</a></router-link></li>
    </ul>
    <ul v-else class="list-inline ms-auto mb-0">
      <li v-if="!isMobile" class="list-inline-item"><router-link :to="{path:'/home'}"><a href="#" class="btn btn-outline-light my-2">我的专栏</a></router-link></li>
      <li v-if="!isMobile" class="list-inline-item"><router-link :to="{path:'/createColumn'}"><a href="#" class="btn btn-outline-light my-2">新建专栏</a></router-link></li>
      <li class="list-inline-item">
        <drop-down :title="`欢迎 ${user.name}`">
          <dropdown-item v-if="isMobile"><router-link :to="{path:'/home'}"><a href="#" class="btn btn-outline-light my-2">我的专栏</a></router-link></dropdown-item>
          <dropdown-item v-if="isMobile"><router-link :to="{path:'/createColumn'}"><a href="#" class="btn btn-outline-light my-2">新建专栏</a></router-link></dropdown-item>
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item" @click="handleLogout">退出登陆</a></dropdown-item>
        </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import DropDown from './DropDown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserProps } from '../store/module/User'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropDown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const isMobile = computed(() => store.state.isMobile)
    const handleLogout = () => {
      store.dispatch('logout')
    }
    return { handleLogout, isMobile }
  }
})
</script>
