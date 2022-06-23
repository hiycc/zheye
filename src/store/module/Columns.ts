import { ActionContext } from 'vuex'
import axios, { AxiosError } from 'axios'

import { GlobalDataProps } from '../store'

export interface ColumnProps {
  id?: number;
  title: string;
  avatar?: string;
  description: string;
  userId: number
}

export const Columns = {
  actions: {
    async fetchColumns (context: ActionContext<GlobalDataProps, GlobalDataProps>, uid: string) {
      const { data } = await axios.get(`/columns/${uid}`)
      context.rootState.columns = data.data
    },
    async deleteColumn (context: ActionContext<GlobalDataProps, GlobalDataProps>, columnId: string) {
      const { data } = await axios.post(`/columns/delete/${columnId}`)
      return data.status
    },
    async createColumn (context: ActionContext<GlobalDataProps, GlobalDataProps>, newColumn: string) {
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
    async fetchColumn (context: ActionContext<GlobalDataProps, GlobalDataProps>, cid: string) {
      const { data } = await axios.get(`/columns/detail/${cid}`)
      context.rootState.column = data.data
    }
  }
}
