/** 模态框固定props参数，用于调用模态框成功|关闭|销毁 */
export const modalProps = {
  // 是否展示组件
  modalValue: Boolean,
  // 组件消失时（移除实例）
  vanish: Function,
  // 组件调用成功事件
  resolve: Function,
  // 组件调用失败事件
  reject: Function
}

/** 组件内传入props参数 用于模态框的自定义设置 */
export const componentProps = {
  // 模态框标题
  title: String,
  // 模态框内容
  content: String
}

export const props = { ...modalProps, ...componentProps }
