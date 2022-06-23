import { Component, h, render } from 'vue'

/**
 * 渲染组件实例
 * @param Constructor 组件
 * @param props 组件参数
 * @returns 组件实例
 */

export const renderInstance = (Constructor: Component, props: any) => {
  //  创建组件容器，这一步是必须的，在销毁组件时需要用到
  const container = document.createElement('div')

  //  在props添加组件消失钩子，移除当前实例，将销毁方法提供给组件
  //  这里不需要调用document.body.removeChild(container.firElementChild)
  //  因为调用 render(null, container) 为我们完成了这项工作
  props.vanish = () => {
    render(null, container)
  }
  //  创建虚拟节点，渲染组件
  const vnode = h(Constructor, props)
  render(vnode, container)

  //  添加子元素（组件）到父元素
  if (container.firstElementChild) {
    document.body.appendChild(container.firstElementChild)
  }
}
