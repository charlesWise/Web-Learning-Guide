### Vuex
- 借助vue的数据响应式，使vuex的state响应式变化页面渲染

### readux
- 利用了发布订阅模式，dispatch action 底层会有个更新函数去做订阅，把更新函数直接订阅传给了redux，这个时候只要数据发生变化只要把刚刚订阅的那些函数重新执行一篇

### vue-router怎样根据hash变化更新
- 记录当前的current hash值load hashchange变化，重新渲染对应组件，current hash值也是响应式的只要一变化便会重新render