<template>
  <!-- w-75：width 75% mx-auto: m：margin x：left and right-->
  <div class="column-detail-page w-75 mx-auto" >
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img class="rounded-circle img-fluid" :src="column.avatar" :alt="column.title">
      </div>
      <div class="col-9">
        <h4>{{column?.title}}</h4>
        <!-- text-muted:文本柔和 -->
        <p class="text-muted">{{column?.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    onMounted(() => {
      const currentId = route.params.id
      store.dispatch('fetchPosts', currentId)
      store.dispatch('fetchColumn', currentId)
    })
    const post = computed(() => store.state.posts)
    const column = computed(() => store.state.column)
    return {
      column,
      list: post
    }
  }
})
</script>
<style lang="">
</style>
