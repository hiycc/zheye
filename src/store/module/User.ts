import { ActionContext } from 'vuex'
import axios, { AxiosError } from 'axios'

import { GlobalDataProps } from '../store'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export const User = {
  actions: {
    //  login
    async login (context: ActionContext<GlobalDataProps, GlobalDataProps>, user: string) {
      try {
        const result = await axios.post('/signin', JSON.stringify(user), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (result.status === 200) {
          context.rootState.user = { id: result.data.id, isLogin: true, name: result.data.username }
        }
        console.log(result)
        return result
      } catch (e: Error | AxiosError | unknown) {
        if (axios.isAxiosError(e)) {
          return e
        }
      }
    },

    // logout
    logout (context: ActionContext<GlobalDataProps, GlobalDataProps>) {
      context.rootState.user = { isLogin: false }
      context.rootState.columns = []
    },
    async addUser (context: ActionContext<GlobalDataProps, GlobalDataProps>, user: string) {
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
  }
}
