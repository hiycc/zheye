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
    <!-- <div>{{list.length}}</div> -->
    <post-list :list="list?.data"></post-list>
    <span @click="createPost" class="btn btn-primary p-2 m-3">新建Post</span>
    <span @click="deleteColumn" class="btn btn-danger p-2 m-3">删除专栏</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import PostList from '../components/PostList.vue'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const columnId = route.params.columnId
    onMounted(() => {
      store.dispatch('fetchPost', columnId)
      store.dispatch('fetchColumn', columnId)
    })
    const createPost = () => {
      router.push({ name: 'createPost', params: { columnId: columnId } })
    }
    const deleteColumn = () => {
      store.dispatch('deleteColumn', route.params.columnId).then((results) => {
        console.log('删除专栏:' + results)
        router.replace({ path: '/' })
      })
    }
    const posts = computed(() => store.state.posts)
    const column = computed(() => store.state.column)
    return {
      column,
      list: posts,
      deleteColumn,
      createPost
    }
  }
})
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
</style>
