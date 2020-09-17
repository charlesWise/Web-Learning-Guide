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