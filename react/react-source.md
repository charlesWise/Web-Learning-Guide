### Virtual DOM

- vdom 真实 dom 相互的映射，理解成 js 对象表示了当前的 ui，同步的时候只去同步这个 js 对象，然后再根据这个差异性来更新真实的 dom

### diff

- O(n3)：新旧节点双循环 n2 次方，然后假设 key 没有不得不再遍历次 n 次，这样就是 n3 次

- diff 策略：同级比较，type key 不同直接不再比较直接替换，type key 相同话更新属性、更新儿子，打补丁递归操作

- 性能优化：1、避免同级移动；2 避免节点 type 更改；3、避免 key 变化

### fiber

- 解决上面的递归操作影响性能，出现了 fiber，有了 fiber 就会出现了任务的优先级的概念，停下来做优先级更高的任务，通过链表来接着上次执行的地方

### 协调

- 前面部分可以理解成协调，做的事情更新子组件属性

### 提交

- 一个个子任务进行的，那提交的时候有个前提，等没有子任务了才可以提交了

### requestIdleCallback

- 获取当前的空闲时候已经回调

- 所有更新会走到 enqueueUpdate 入栈 scheduleWork 任务调度

### 事件系统

- react 里面做了一个映射表，事件委托方式

### API

```javascript
1、PureComponent.prototype直接等于Component的实例对象的话（继承原型），会多继承Component的constructor，但是PureComponent已经有自己的constructor了，这样就会多消耗一些内存。
所以会新建ComponentDummy，只继承Component的原型，不包括constructor，以此来节省内存。
2、为什么要弃用childContext？
因为childContext对下层的组件影响太大了，即使子孙组件没有用到childContext，子孙组件仍然要进行Update，严重影响了性能
3、context.Consumer = context，让<Consumer>等于React.context，这样能立即拿到<Provider>提供的最新值
4、React.Children.map(props.children, item => [item, [item, [item]]]，多层嵌套的数组[item, [item, [item]]]经过map()后，平铺成[item,item,item]，核心递归函数，目的是展平嵌套数组
```

```javascript
实现一个flatten方法，使得输入一个数组，该数组里面的元素也可以是数组，该方法会输出一个扁平化的数组？
function flatten(arr){
  var res = [];
  for(var i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      res = res.concat(flatten(arr[i]));
    }else{
      res.push(arr[i]);}
    }
  return res;
}

function flatten(array) {
  //只要数组中的元素有一个嵌套数组，就合并      
  while(array.some(item=>Array.isArray(item))) array=[].concat(...array)
  console.log(array) //[1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10]
  return array
}
```

### FiberScheduler

- doubleBuffer：Fiber 在更新后，不用再重新创建对象，而是复制自身，并且两者相互复用，用来提高性能

- （1）queue1取的是fiber.updateQueue;queue2取的是alternate.updateQueue（2）如果两者均为null，则调用createUpdateQueue()获取初始队列（3）如果两者之一为null，则调用cloneUpdateQueue()从对方中获取队列（4）如果两者均不为null，则将update作为lastUpdate

- React低优先级update的expirationTime间隔是25ms，React让两个相近（25ms内）的update得到相同的expirationTime，目的就是让这两个update自动合并成一个Update，从而达到批量更新的目的，就像LOW_PRIORITY_BATCH_SIZE的名字一样，自动合并批量更新。

- 执行setState或forUpdate后React进行更新的流程为：
  （1）获取this上的fiber对象
  （2）计算currentTime
  （3）根据（1）fiber和（2）currentTime计算fiber对象的expirationTime
  （4）根据（3）expirationTime创建update对象
  （5）将setState中要更新的对象赋值到（4）update.payload
  （6）将setState中要执行的callback赋值到（4）update.callback
  （7）update入队updateQueue
  （8）进行任务调度

- FiberRoot.current = RootFiber、RootFiber.stateNode = FiberRoot

- 在createUpdate后就进入scheduleWork流程，

### ComponentUpdate

### NodeUpdate

### Commit 阶段
