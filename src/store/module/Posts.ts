import { ActionContext } from 'vuex'
import axios, { AxiosError } from 'axios'

import { GlobalDataProps } from '../store'

export interface PostProps {
  postId: number | undefined;
  username?: string;
  userId: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string | undefined;
  columnId: number;
}

// 和post相关的逻辑
export const Posts = {
  actions: {
    async createPost (context: ActionContext<GlobalDataProps, GlobalDataProps>, newPost: string) {
      try {
        const result = await axios.post('/posts/create', JSON.stringify(newPost), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (result.status === 201) {
          context.rootState.posts.push(result.data.data)
        }
        return result
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          return e
        }
      }
    },
    async fetchPost (context: ActionContext<GlobalDataProps, GlobalDataProps>, columnId: string) {
      try {
        const result = await axios.get(`/posts/${columnId}`)
        if (result.status === 200) {
          context.rootState.posts = result.data
        }
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          return e
        }
      }
    },
    async fetchPosts (context: ActionContext<GlobalDataProps, GlobalDataProps>) {
      try {
        const result = await axios.get('/posts')
        if (result.status === 200) {
          context.rootState.posts = result.data
        }
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          return e
        }
      }
    },
    async deletePost (context: ActionContext<GlobalDataProps, GlobalDataProps>, postId: string) {
      const { data } = await axios.post(`/posts/delete/${postId}`)
      return data.status
    }
  }
}
