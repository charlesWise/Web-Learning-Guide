### 术语解释：
- runtime：仅包含运行时，不包含编译器
- common：commonjs规范
- esm：ES模块
- umd：兼用commonjs和amd异步，用于浏览器

### 树节点创建的顺序
- 自上而下

### 挂载的顺序
- 自下而上

### 初始化过程
```
new Vue() => this.init(options) => $mount => mountComponent() => _render() => _update()

调用init =》初始化各种属性 =》调用mountComponent：声明updateComponent、创建Watcher
_render获取虚拟dom =》 _update把虚拟dom转为真实dom
```
+ 每一个data里面key都会有一个dep一一对应

### 为什么数组Vue2.x响应式缺点
- 递归遍历，性能会受影响
- 数组和对象是两个完全不同的处理，api操作不统一
- watcher对更新是在微任务执行

### 虚拟DOM，有哪些优缺点？
- vue里面使用snabbdom实现

- 轻量、快速：当他们发生变化时通过新旧虚拟DOM比对可以得到最小DOM操作量，从而提升性能
- 跨平台

- vue2.x选择了中等粒度当解决方案，每一个组件一个watcher实例，这样状态变化时只能通知到组件，再通过引入虚拟DOM去进行比对和渲染。

mountComponent => updateComponent 用户$mount()时，定义updateComponent

### diff
- 是什么？
- 性能、跨平台、兼容性
- 举个例子，我用vue到例子来说diff，我在研究vue源码的时候是这样的，存在两个新旧dom节点的时候，在进行patch函数这个时候就用到了diff，它的名字叫做patchVnode它的主要作用是，能够比较他们之间的变化，那是如何比较的呢？总体来说咋们所说的深度优先，同级比较；首先它会从顶层节点开始一个个比较，这个时候会判断两个节点 的类型如果是元素，看他们有没有孩子，如果有孩子就向下递归，这就是所谓的深度优先向下递归，那么在比较孩子的过程中，我可以详细的和你说下重排算法，这个重排算法是怎样的呢？首先先假设首尾相同xxxxxx比较完之后（介绍四个指针），可能很遗憾没有找到相同的那么则尝试的要从新的里面取出来一个新的要在老的里面尝试去找到它，那如果在老的里面找到那个位置之后，我们要通过这两个的相对位置进行一次移动，同时还要对这两个节点进行打补丁操作，这个时候就是咋们刚刚说的递归，在这个过程中有可能会重复，因为这两个节点本身还会有子节点，那么如果是叶子节点（没有子节点）就结束啦，这个时候开始同层的其它节点的比较，这就是刚刚说的同级比较。


```
new Watcher => render => get => dep收集
watch/computed 用户watcher也会细粒度到key
```

### 模版编译
- 将模版转换为渲染函数
- ast(里面有个优化点就是标记是否静态节点)
- if条件会生成很多三元表达式

```
new Vue() => $mount() => vm._render() => createElement()创建vdom及h函数 => createComponent()
```