import { createStore } from 'vuex'
import { ColumnProps, testData } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  user: UserProps
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    user: { isLogin: false }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'lewis' }
    },
    logout (state) {
      state.user = { isLogin: false }
      state.columns = []
    }
  },
  getters: {
    getColumnsById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    }
  }
})

export default store
