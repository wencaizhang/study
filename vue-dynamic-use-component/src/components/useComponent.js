/**
 * desc: 用 js 的方式插入一个 vue 组件，适用于弹窗类组件
 */

import Vue from 'vue'

/**
 * 实例化 Component，挂载到 document，返回实例
 * @param {*} Component 组件
 * @param {*} props 向组件传入的 props
 * @returns 组件实例
 */
export function mountComponent(Component, props) {
  const propsData = typeof props === 'object' ? props : {}
  const Constructor = Vue.extend(Component)
  const instance = new Constructor({ propsData })
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}

/**
 * 每次都会调用 mountComponent 创建新的组件实例
 * @param {*} Component 组件
 * @param {*} props 向组件传入的 props
 * @returns 组件实例
 */
export default function useComponent(Component, props) {
  return mountComponent(Component, props)
}

/**
 * 单例
 * 先检测是否已经存在实例，如果存在则更新实例 props 并返回实例
 * 如果不存在则调用 mountComponent 创建新的组件实例，并且保存记录
 * @param {*} Component 组件
 * @param {*} props 向组件传入的 props
 * @returns 组件实例
 */
export const useSingleComponent = (() => {
  const state = {}

  return function (Component, props) {
    const name = getComponentName(Component)
    if (state[name]) {
      const instance = state[name]
      Object.assign(instance.$props, props)
      return instance
    }

    const instance = mountComponent(Component, props)
    state[name] = instance
  }
})()

function getComponentName(Component) {
  // __file 文件路径
  return Component.name || Component.__file
}
