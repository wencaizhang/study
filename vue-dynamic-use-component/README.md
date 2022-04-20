# vue2 动态创建组件


## 用法

### 1. 创建实例

```js
const instance = useComponent(Component, props)
```

`useComponent` 函数接受两个参数：组件 `Component` 和想要传入的 `props` 参数，返回值 `instance` 是组件的实例。

### 2. 事件监听

拿到组件实例后，可以进行 `instance` 内部通过 `$emit` 触发的事件：


```js
instance.$on("update", (e) => {
  console.log('%c [ e ]', 'font-size:13px; background:pink; color:#bf2c9f;', e)
});
```

这里的事件名称 `update` 由你的 `Component` 组件决定。


### 3. 更新 props

需要手动更新组件实例 props

```js
Object.assign(instance.$props, newProps)
// 或者
instance.$update(newProps)
```

`$update` 是在创建实例的时候挂载到实例上用于更新 `$props` 的一个方法，它的实现也很简单：

```js
instance.$update = (newProps) => {
  Object.assign(instance.$props, newProps)
}
```

同时列举几个错误写法：

1. 直接修改 props

```js
props.value = 'newValue'
```

这大概是我们第一时间想到的更新 props 的方法了，然而遗憾的是它并不能总是生效。如果你修改的是 number/string/boolean 等基础类型就不会生效，如果修改 Object/Array 等引用类型

我的猜想：// TODO 去源码找答案（验证想法）（要搞清楚实例化过程中是如何处理数据的）

props 的赋值类似一种浅拷贝，值引用类型的属性只在实例化的时候拷贝到实例上，如果实例化之后，再去修改 props 值，实例是无法感应到这个变化的。

如果是修改一个地址引用类型的呢？

所以这种的方式也不建议。

2. 直接修改实例的 `$props`

```js
instance.$props = props
```

`$props` 是只读属性，所以无法使用赋值操作。


3. 修改实例的 `propsData`


```js
instance.propsData = props
```

虽然创建实例的时候确实用的是 `propsData` 属性，但遗憾的是实例并不存在这个属性，所以也同样不能生效。

### 单例

既然你已经想到了使用 js 创建来创建实例，那我能想到的理由除了使用 js 调用更灵活以外，大概率有可能是这个组件需要在多个页面调用或者重复调用多次，所以是时候考虑一下创建组件实例的内存开销问题


将上面的 `useComponent` 改为 `useSingleComponent` 即可，其他用法不变：

```js
const instance = useSingleComponent(Component, props)
```

单例的实现依赖于 `Component` 的 `name` 属性，所以请保证 `Component` 的 `name` 是唯一的（起码在所有调用 `useSingleComponent` 方法的组件中是唯一的）。

如果没有设置 `name` 属性，则会使用 `Component` 的 `__file` 属性，它的值是改 `Component` 文件的相对路径，例如 `src/components/TheModal.vue`。