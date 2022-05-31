<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <global-loader v-if="isLoading" text="加载中..." background="rgba(0,0,0,0.8)"></global-loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalLoader from './components/GlobalLoader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalLoader
  },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.isLoading)
    return {
      currentUser,
      isLoading
    }
  }
})
</script>
