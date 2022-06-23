<template>
  <div class="post-list">
    <article v-for="post in list" :key="post.postId" class="card mb-3">
      <div class="card-header">{{post.createdAt?.slice(0,10)}}</div>
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img :src="post.image" alt="post.title" class="rounded-lg img-fluid">
          </div>
          <p :class="{'col-9':post.image}">{{post.content}}</p>
        </div>
        <div class="d-flex flex-row-reverse">
          <span @click="deletePost(post.postId?.toString()!)" class="btn btn-danger">删除Post</span>
        </div>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { PostProps } from '../store/module/Posts'
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const columnId = store.state.columnId
    const deletePost = (postId:string) => {
      store.dispatch('deletePost', postId).then((result) => {
        console.log(result)
        if (result === 200) {
          console.log('abc')
          router.replace({ path: `/detail/${columnId}` })
        }
      })
    }
    return {
      deletePost
    }
  }
})
</script>
