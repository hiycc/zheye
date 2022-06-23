import { ExtractPropTypes, ref } from 'vue'
import Index from './index.vue'
import { componentProps } from './props'
import { renderInstance } from './utils'

/** 组件props 类型，ExtractPropTypes可将Constructor 转换为对应值类型 */
type Props = ExtractPropTypes<typeof componentProps>

/** 组件调用resolve 返回结果 */
type Result = { path: string }[]

/**
 * 模态框调用方法
 * @param props
 * @returns {Promise}
 */
export const Modal = (props: Props) => {
  return new Promise<Result>((resolve, reject) => {
    return resolve
  })
}
