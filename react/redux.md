- 利用了发布订阅模式，dispatch action 底层会有个更新函数去做订阅，把更新函数直接订阅传给了redux，这个时候只要数据发生变化只要把刚刚订阅的那些函数重新执行一篇

- redux-thunk和redux-logger中间件就是⼀个函数，对store.dispatch⽅法进⾏改造，在发出 Action 和执⾏ Reducer 这两步之间，添加了其他功能。

- store.subscribe(listener)注册一个监听器订阅一些事件listeners数组里面，createStore传入reducer和中间件，中间件可以理解成改装dispatch函数，譬如说redux-logger日志打印、redux-thunk异步处理，通过触发dispatch更新listeners遍历执行。

- 中间件：实现函数序列执⾏，通过compose（reduce方法合并）以middlewareChain函数数组合并成⼀个函数。