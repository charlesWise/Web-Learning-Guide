- 通过高阶组件的方式实现 connect Provider，通过 context 方式传递 store

- 利用 redux 的 mapStateToProps 对通过 getState()函数的包装返回，利用 redux 的 mapDipatchToProps 区分是 Object 还是 Function 形式，通过 bingActionCreators 合并，内部遍历执行每一个 dispatch，最终统一合并到 props 上面返回。

- connect 一个高阶组件接收一个组件返回一个新到组件，然后属性里面多了个 stateProps 和 dispatchProps，第一个就是 mapStateToProps，第二个就是 mapDipatchToProps 参数项

```
1、connect通过context获取Provider中的store，通过store.getState()获取整个store tree 上所有state。
2、connect模块的返回值wrapWithConnect为function。
3、wrapWithConnect返回一个ReactComponent对象Connect，Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent。
```
