<template>
  <div class="container-fluid p-0">
    <global-header :user="currentUser"></global-header>
    <div id="back" class="p-3 m-auto w-50" :class="{ isMobile, isLarge }">
      <global-loader v-if="isLoading" text="加载中..." background="rgba(0,0,0,0)"></global-loader>
      <router-view v-show="!isLoading" class="justify-content-center"></router-view>
    </div>
    <modal />
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022学洱专栏</li>
          <!-- <li class="list-inline-item">课程</li> -->
          <li class="list-inline-item">联系</li>
          <!-- <li class="list-inline-item">设备宽度：{{width}}</li> -->
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalLoader from './components/GlobalLoader.vue'
import Modal from './views/Modal.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalLoader,
    Modal
  },
  setup () {
    const width = screen.width
    const store = useStore()
    if (width <= 600) {
      store.state.isMobile = true
    } else if (width > 1440) {
      store.state.isLarge = true
    }
    const isMobile = computed(() => store.state.isMobile)
    const isLarge = computed(() => store.state.isLarge)
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.isLoading)
    return {
      currentUser,
      isLoading,
      width, isMobile, isLarge
    }
  }
})
</script>
<style>
  .isMobile {
    width: 100% !important;
  }
  .isLarge {
    width: 50% !important;
  }
</style>
