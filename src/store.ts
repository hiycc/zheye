import { createStore } from 'vuex'
import axios, { AxiosError } from 'axios'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface PostProps {
  postId: number | undefined;
  userId: number;
  title: string;
  content: string;
  image?: string;
  createAt: string | undefined;
  columnId: number;
}
export interface ColumnProps {
  id?: number;
  title: string;
  avatar?: string;
  description: string;
  userId: number
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
    user: { isLogin: false },
    posts: [] as PostProps[],
    column: {} as ColumnProps
  },
  mutations: {
    login (state, data) {
      console.log(data)
      state.user = { id: data.id, isLogin: true, name: data.username }
    },
    logout (state) {
      state.user = { isLogin: false }
      state.columns = []
    },
    createPost (state, newPost) {
      state.posts?.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data
    },
    fetchPosts (state, rawData) {
      state.posts = rawData
    },
    fetchColumn (state, rawData) {
      state.column = rawData
    },
    setLoading (state, status) {
      state.isLoading = status
    },
    addUser (state) {
      state.isLoading = false
    }
  },
  actions: {
    async login (context, user) {
      try {
        const result = await axios.post('/signin', JSON.stringify(user), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (result.status === 200) {
          context.commit('login', result.data)
        }
        console.log(result)
        return result
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          return e
        }
      }
    },
    async createPost (context, newPost) {
      try {
        const result = await axios.post('/posts/create', JSON.stringify(newPost), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (result.status === 201) {
          context.commit('createPost', result.data.data)
        }
        return result
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          return e
        }
      }
    },
    async createColumn (context, newColumn) {
      try {
        const result = await axios.post('/columns/create', JSON.stringify(newColumn), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return result
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          return e
        }
      }
    },
    async fetchColumns (context, uid) {
      const { data } = await axios.get(`/columns/${uid}`)
      context.commit('fetchColumns', data)
    },
    async deleteColumn (context, columnId) {
      const { data } = await axios.post(`/columns/delete/${columnId}`)
      return data.status
    },
    async fetchPosts (context, cid) {
      const { data } = await axios.get(`/posts/${cid}`)
      context.commit('fetchPosts', data.data)
    },
    async fetchColumn (context, cid) {
      const { data } = await axios.get(`/columns/detail/${cid}`)
      context.commit('fetchColumn', data.data)
    },
    async addUser (context, user) {
      try {
        const result = await axios.post('/signup', JSON.stringify(user), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        context.commit('addUser')
        return result
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          context.commit('addUser')
          return e
        }
      }
    }
  },
  getters: {
    getColumnsById: (state) => (id: number) => {
      return state.columns?.find(c => c.id === id)
    }
  }
})

export default store
