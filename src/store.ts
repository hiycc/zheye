import { createStore } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createAt: string;
  columnId: number;
}
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export interface GlobalDataProps {
  isLoading: boolean,
  columns: ColumnProps[];
  user: UserProps,
  posts: PostProps[] | undefined,
  column: ColumnProps | undefined
}
const store = createStore<GlobalDataProps>({
  state: {
    isLoading: false,
    columns: [] as ColumnProps[],
    user: { isLogin: false, columnId: 1 },
    posts: [] as PostProps[],
    column: {} as ColumnProps
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'lewis' }
    },
    logout (state) {
      state.user = { isLogin: false }
      state.columns = []
    },
    createPost (state, newPost) {
      state.posts?.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.list
    },
    fetchColumn (state, rawData) {
      state.column = rawData
    },
    setLoading (state, status) {
      state.isLoading = status
    }
  },
  actions: {
    async fetchColumns (context) {
      const { data } = await axios.get('/columns')
      context.commit('fetchColumns', data)
    },
    async fetchPosts (context, cid) {
      const { data } = await axios.get(`/posts/${cid}`)
      context.commit('fetchPosts', data)
    },
    async fetchColumn (context, cid) {
      const { data } = await axios.get(`/columns/${cid}`)
      context.commit('fetchColumn', data)
    }
  },
  getters: {
    getColumnsById: (state) => (id: number) => {
      return state.columns?.find(c => c.id === id)
    }
  }
})

export default store
