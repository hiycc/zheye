import { createStore } from 'vuex'
import { testData, PostData } from './testData'
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
  columns: ColumnProps[];
  user: UserProps,
  posts: PostProps[]
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    user: { isLogin: false, columnId: 1 },
    posts: PostData
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
      state.posts.push(newPost)
    }
  },
  getters: {
    getColumnsById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    }
  }
})

export default store
