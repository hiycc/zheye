<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a href="#" class="navbar-brand"><router-link :to="{name: 'home'}">者也</router-link></a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="login"><a href="#" class="btn btn-outline-light my-2">登陆</a></router-link></li>
      <li class="list-inline-item"><router-link to="register"><a href="#" class="btn btn-outline-light my-2">注册</a></router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <drop-down :title="`欢迎 ${user.name}`">
          <dropdown-item class="dropdown-item"><router-link to="createColumn">新建专栏</router-link></dropdown-item>
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item" @click="handleLogout">退出登陆</a></dropdown-item>
        </drop-down>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import DropDown from './DropDown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
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
    const handleLogout = () => {
      store.commit('logout')
    }
    return { handleLogout }
  }
})
</script>
