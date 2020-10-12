#### 中间件

- Koa 中间件机制：Koa 中间件机制就是函数式 组合概念 Compose 的概念，将⼀组需要顺序执⾏的函数复合为⼀个函数，外层函数的参数实际是内层函数的返回值。洋葱圈模型可以形象表示这种机制，是源码中的精髓和难点。

```
知识储备：函数组合
const add = (x, y) => x + y
const square = z => z * z
const fn = (x, y) => square(add(x, y))
console.log(fn(1, 2))
上⾯就算是两次函数组合调⽤，我们可以把他合并成⼀个函数
const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
const fn = compose(add,square)

多个函数组合：中间件的数⽬是不固定的，我们可以⽤数组来模拟
const compose = (...[first,...other]) => (...args) => {
  let ret = first(...args)
  other.forEach(fn => {
    ret = fn(ret)
  })
  return ret
}
const fn = compose(add,square)
console.log(fn(1, 2))
```

```
function compose(middlewares) {
  return function() {
    return dispatch(0); // 执⾏第0个
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          // promise完成后，再执⾏下⼀个
          return dispatch(i + 1);
        })
      );
    }
  };
}
传入middlewares方法数组，fn没有返回一个空对承诺，有返回下一个
```

### 扩展内容

[Object.create 的理解][https://juejin.im/post/5dd20cb3f265da0bf66b6670]
[中间件扩展学习][https://juejin.im/post/5dbf9bdaf265da4d25054f91]
[策略模式][https://github.com/su37josephxia/frontend-basic/tree/master/src/strategy]
[中间件对⽐][https://github.com/nanjixiong218/analys-middlewares/tree/master/src]


### 总结

- koa为了解决原生不足，对描述复杂业务逻辑切面描述AOP，通过中间件机制实现洋葱圈模型