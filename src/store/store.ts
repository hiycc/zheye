import { createStore } from 'vuex'
import axios, { AxiosError } from 'axios'

import { Posts, PostProps } from './module/Posts'
import { Columns, ColumnProps } from './module/Columns'
import { User, UserProps } from './module/User'

export interface GlobalModalProps {
  isShow: boolean,
  title: string,
  content: string
}

export interface GlobalDataProps {
  GlobalModal: GlobalModalProps,
  isLoading: boolean,
  columns: ColumnProps[];
  user: UserProps,
  posts: PostProps[]
  column: ColumnProps | undefined,
  isMobile: boolean,
  isLarge: boolean
}

const store = createStore<GlobalDataProps>({
  modules: {
    Posts,
    Columns,
    User
  },
  state: {
    GlobalModal: {
      isShow: false
    } as GlobalModalProps,
    isLoading: false,
    columns: [] as ColumnProps[],
    user: { isLogin: false },
    posts: [] as PostProps[],
    column: {} as ColumnProps,
    isMobile: false,
    isLarge: false
  },
  mutations: {
    setLoading (state, status) {
      state.isLoading = status
    },
    addUser (state) {
      state.isLoading = false
    }
  },
  actions: {
  },
  getters: {
    getColumnsById: (state) => (id: number) => {
      return state.columns?.find(c => c.id === id)
    }
  }
})

export default store
