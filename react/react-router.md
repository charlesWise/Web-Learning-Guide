- 通过 context 把 history、location、BrowserRouter.computeRootMatch 对象等相关信息传递下去，Link、Route 组件实现，创建历史对象（createBrowserHistory()、createHistory()），给 history 注册了 lisetner 事件，也就是 react 的 setState 函数，通过 this.unlistener = this.history.listen(location => { this.setState({location}); })监听变化从而更新页面，返回一个 unlistener 函数，解除监听执行 unlistener 函数

- 其实无论是 react-router. react-redux. 能够使组件更新的根本原因，还是最后出发了 setState 函数

- react-router 主要是利用底层 history 模块的机制，通过结合 react 的架构机制做一层包装
