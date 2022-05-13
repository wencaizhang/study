/**
 * desc: 用 js 的方式插入一个 vue 组件，适用于弹窗类组件
 */

 import Vue from 'vue'

 function getComponentName (Component) {
   // __file 文件路径
   return Component.name || Component.__file
 }
 
 /**
   * 实例化 Component，挂载到 document，返回实例
   * @param {*} Component 组件
   * @param {*} props 向组件传入的 props
   * @returns 组件实例
   */
 export function mountComponent (Component, props, options = {}) {
   const propsData = typeof props === 'object' ? props : {}
   const Constructor = Vue.extend(Component)
   const instance = new Constructor({ propsData })
   instance.$_update = (newProps) => {
     // 如果组件定义中没有 props 选项，则不存在 $props 属性
     if (instance.$props) {
       Object.assign(instance.$props, newProps)
     }
   }
   if (options.el) {
     // 创建并挂载到 el (会替换 el)
     instance.$mount(options.el)
   } else {
     instance.$mount()
     document.body.appendChild(instance.$el)
   }
   return instance
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
 
   return function (Component, props, options) {
     const name = getComponentName(Component)
 
     if (state[name]) {
       const instance = state[name]
       instance.$_update(props)
       return instance
     }
 
     const instance = mountComponent(Component, props, options)
     state[name] = instance
     return instance
   }
 })()
 
 /**
   * 每次都会调用 mountComponent 创建新的组件实例
   * @param {Object} Component 组件
   * @param {Object} props 向组件传入的 props
   * @param {Object} options
   * @returns 组件实例
   */
 export default function useComponent (Component, props, options = {}) {
   // 默认单例
   const { single = true, ...otherOptions } = options
   if (single) {
     return useSingleComponent(Component, props, otherOptions)
   }
   return mountComponent(Component, props, otherOptions)
 }
 