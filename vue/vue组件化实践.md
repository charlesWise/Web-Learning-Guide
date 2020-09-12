### 组件通信

```
$attrs：子组件未声明接收父组件属性props，会被收集到$attrs属性中；
$listeners：子v-on="$listeners"，父@click="handleFn"（子组件点击会执行父组件handleFn事件）
```

```
provide / inject：能够实现祖先和后代之间传值
// ancestor
provide () {
  return { foo: 'foo' }
}
// descendant
inject: ['foo']

inject: {
  foo: {
    from: 'foo'
  }
}
```

### 插槽

```
// 具名
<template v-slot="header">内容数据</template>
<slot name="header" />
// 作用域：数据可以是子组件里面
<template v-slot:footer="ctx">{{ctx.fc}}</template>
<slot name="footer" :fc="footerContent" />
```

```
v-bind="$attrs" // 会把父组件其它属性扩展到子属性上
inheritAttrs: false // 设置为false避免设置到根元素上
```

```
function create(Component, props) {
  // 组件构造函数如何获取？
  // 1.Vue.extend()
  // 2.render
  const vm = new Vue({
    // h是createElement, 返回VNode，是虚拟dom
    // 需要挂载才能变成真实dom
    render: h => h(Component, {props}),
  }).$mount() // 不指定宿主元素，则会创建真实dom，但是不会追加操作

  // 获取真实dom
  document.body.appendChild(vm.$el)

  const comp = vm.$children[0]

  // 删除
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp

}

export default create
```

```
export default {
  install(Vue) {
    Vue.prototype.$notice = function() {
      return create(Notice, options)
    }
  }
}

Vue.use(create)
```