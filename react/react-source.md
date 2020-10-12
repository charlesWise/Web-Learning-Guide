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

- （1）queue1 取的是 fiber.updateQueue;queue2 取的是 alternate.updateQueue（2）如果两者均为 null，则调用 createUpdateQueue()获取初始队列（3）如果两者之一为 null，则调用 cloneUpdateQueue()从对方中获取队列（4）如果两者均不为 null，则将 update 作为 lastUpdate

- React 低优先级 update 的 expirationTime 间隔是 25ms，React 让两个相近（25ms 内）的 update 得到相同的 expirationTime，目的就是让这两个 update 自动合并成一个 Update，从而达到批量更新的目的，就像 LOW_PRIORITY_BATCH_SIZE 的名字一样，自动合并批量更新。

- 执行 setState 或 forUpdate 后 React 进行更新的流程为：
  （1）获取 this 上的 fiber 对象
  （2）计算 currentTime
  （3）根据（1）fiber 和（2）currentTime 计算 fiber 对象的 expirationTime
  （4）根据（3）expirationTime 创建 update 对象
  （5）将 setState 中要更新的对象赋值到（4）update.payload
  （6）将 setState 中要执行的 callback 赋值到（4）update.callback
  （7）update 入队 updateQueue
  （8）进行任务调度

- FiberRoot.current = RootFiber、RootFiber.stateNode = FiberRoot

- 在 createUpdate 后就进入 scheduleWork 流程，scheduleWork = scheduleUpdateOnFiber;

- Fiber 机制可以为每一个 update 任务进行优先级排序，并且可以记录调度到了哪里（schedulePendingInteractions()）同时，还可以中断正在执行的任务，优先执行优先级比当前高的任务(scheduleCallbackForRoot())，之后，还可以继续之前中断的任务，而 React16 之前调用 setState()，必须等待 setState 的 update 队列全部调度完，才能进行之后的操作。

- 中断正在执行的调度任务：操作 schedule 链表，将正要执行的 callback“移除”，将游标指向下一个调度任务；如果是同步任务的话，则执行 scheduleSyncCallback()，将调度任务入队，并返回入队后的临时队列；如果是异步任务的话，则执行 scheduleCallback()，对 callback 进行包装处理，并更新调度队列的状态。

- **scheduleWork 流程总结**：一般我们更新组件有 ReactDOM.render() || hydrate(ReactDOMServer 渲染)、setState()、forceUpdate()，当我们执行上面的更新函数时，首先会创建我们的 update 更新器（createUpdate()），然后在执行我们的调度工作（scheduleWork()），这个时候会再判断是否有无限循环 update 更新，找到根 rootFiber 并遍历更新子节点的 expirationTime 时间，然后判断是否有高优先级任务打断当前正在执行的任务，如果有任务这个时候会区分是同步任务还是异步任务，如果是同步任务则会判断是否是初次渲染任务还是已经渲染过的任务，如果是初次渲染任务跟踪这些 update 更新器，并计数、检测他们是否会报错，如果调度任务因为报错而中断了，React 尽可能退出当前浏览器执行的任务，继续执行下一个调度任务，然后调用 workLoop 进行循环单元更新，如果是已经渲染过的任务刷新同步任务队列；如果是异步任务很简单立即执行调度任务 scheduleCallbackForRoot()

- localRequestAnimationFrame 即 window.requestAnimationFrame，作用是和浏览器刷新频率保持同步的时候，执行内部的 callback，rAFTimeoutID 的作用更像是一个保底措施，如果 React 在进入调度流程，并且有调度队列存在，但是 100ms 仍未执行调度任务的话，则强制执行调度任务，并且阻止 rAFID 的执行。

- 只要调度任务不为空，则持续调用 requestAnimationFrameWithTimeout(animationTick)这样做的目的是：调度队列有多个 callback，不能保证在一个 callback 完成后，刚好能在下一帧继续执行下一个 callback，所以在当前 callback 存在的同时，执行下一帧的 callback，以确保每一帧都有 React 的调度任务在执行。

- React 默认浏览器刷新频率是 30Hz，保持浏览器每秒 30 帧的情况下，每一帧为 33ms

- new MessageChannel()，创建新的消息通道用来跨域通信，并且 port1 和 port2 可以互相通信，react 中通过 port.postMessage(undefined)就会执行 onmessage 方法，判断是否有多余的调度任务需要被执行，如果当前调度任务报错，就会尽可能继续执行下一个调度任务。

```
const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;
port1.onmessage = function(event) {    
  console.log("port111111 " + event.data);  
}  
port2.onmessage = function(event) {    
  console.log("port2222 " + event.data);  
}  
port1.postMessage("port1发出的");  
port2.postMessage("port2发出的");

port2222 port1发出的
port111111 port2发出的
```

- requestHostCallback()的作用是：（1）在浏览器的刷新频率（每一帧）内执行 React 的调度任务 callback（2）计算每一帧中 React 进行调度任务的时长，多出的时间留给下一帧的调度任务，也就是维护时间片（3）跨域通知 React 调度任务开始执行，并在调度任务 throw error 后，继续执行下一个 调度任务。

- flushWork：刷新调度队列，执行调度任务；
  (1) 判断 React 是否掌握浏览器的控制权，如果没有，则不执行调度任务
  (2) 如果调度任务超时，则调用 cancelHostTimeout()，取消执行调度任务
  (3) 调用 advanceTimers()，检查是否有不过期的任务，并把它们加入到新的调度队列中
  (4) 如果能执行到此步，意味着可以执行调度任务，设 isPerformingWork 为 true
  (5) 如果 React 的执行时间没有剩余，但是调度队列存在，且调度任务过期时 ① ② ③
  (6) 如果 React 的执行时间有剩余，但是调度队列存在，且调度任务未被中断时 ① ② ③
  (7) 如果调度任务都执行完毕，则返回 true，否则返回 false，执行延期的任务

- renderRoot 主要的作用：
  (1) 调用 workLoop 进行循环单元更新
  (2) 捕获错误并进行处理
  (3) 走完流程后，根据 workInProgressRoot 的不同状态来进行不同的操作
- 根据 workInProgressRoot 的不同状态来进行不同的操作，也就是当 root 被处理完，根据它的状态，来判断后续是进行 commit、阻止 commit 并重新 render、等待一段时间再去 commit、还是报错。

- workLoop 作用：循环执行 performUnitOfWork 并赋值给 workInProgress，直到 workInProgress 值为空，则中止循环，workInProgress 是一个 fiber 对象，它值不为 null 意味着该 fiber 对象上仍然有更新要执行

- performUnitOfWork 作用：调用 beginWork，从父至子，进行组件（节点）更新；调用 completeUnitOfWork，从子至父，根据 effectTag，对节点进行一些处理组件的更新

- beginWork：判断 fiber 有无更新，有更新则进行相应的组件更新，无更新则复制节点

- **非常大的优化**：通常判断子节点的更新是要遍历子树来获取信息的，但 React 非常聪明地在子节点产生更新的时候，设置上 childExpirationTime，并最终在父节点上设置一个优先级最高的 childExpirationTime，这样的话，如果 childExpirationTime 优先级小于 renderExpirationTime 的话，则跳过子树的遍历及更新渲染。

- **workLoop 流程图**：workLoop 循环执行 performUnitOfWork 并赋值给 workInProgress 直到 workInProgress 值为空，则终止循环；当 workInProgress 不为空时，performUnitOfWork()调用 beginWork，从父到子进行组件（节点）更新，调用 completeUnitOfWork 从子到父，根据 effectTag 对节点进行一些处理，beginWork()判断 fiber 有无更新有更新则进行相应对组件更新，无更新则复制节点

### ComponentUpdate

### NodeUpdate

### Commit 阶段