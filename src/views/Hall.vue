<template>
  <div class="post-list">
    <article v-for="post in list" :key="post.postId" class="card mb-3">
      <h5 class="card-header">{{post.username}}</h5>
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img :src="post.image" alt="post.title" class="rounded-lg img-fluid">
          </div>
          <p :class="{'col-9':post.image}">{{post.content}}</p>
        </div>
        <!-- <span class="text-muted">{{post.createAt}}</span> -->
      </div>
      <div class="card-footer text-muted text-end">{{post.createdAt?.slice(0,10)}}</div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { PostProps } from '../store/module/Posts'

export default defineComponent({
  name: 'Hall',
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('fetchPosts')
    })
    const list = computed<PostProps[]>(() => store.state.posts)
    return {
      list
    }
  }
})
</script>
