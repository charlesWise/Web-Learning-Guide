function Queue() {
  var items = []
  this.enqueue = function(item) {
    items.push(item)
  }
  this.dequeue = function() {
    return items.shift()
  }
  this.head = function() {
    return items[0]
  }
  this.tail =function() {
    return items[items.length - 1]
  }
  this.size = function() {
    return items.length
  }
  this.clear = function() {
    items = []
  }
  this.isEmpty = function() {
    return !items.length
  }
}

/**
 * 约瑟夫环：有一个数组a[100]存放0-99，要求每隔两个树删掉一个数，到末尾时循环至开通继续进行，求最后一个被删掉到数。
 * 实现：用一个队列先将这100个数放入队列，使用while循环，while循环终止到条件时队列里只有一个元素，使用index变量从0开始计数。
 */

function del_ring(arr) {
  var queue = new Queue();
  for (let i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i])
  }

  var index = 0
  while(queue.size() !== 1) {
    var item = queue.dequeue()
    index += 1
    if (index % 3 !== 0) {
      queue.enqueue(item)
    }
  }

  return queue.head()
}

/**
 * 斐波那契数列：前两项是1 1，此后的每一项都是该项前面两项只和，即f(n) = f(n - 1) + f(n - 2)
 * 实现：先将两个1添加到队列，之后使用while循环，用index计数，循环终止到条件index < n - 2
 * 1、使用dequeue方法队列头部删除一个元素，该元素del_item
 * 2、使用head方法获得获得队列头部的元素，该元素为head_item
 * 3、del_item + head_item = next_item，将next_item放入队列注意只能从尾部加元素
 * 4、index + 1
 * 当循环结束时，队列里面有两个元素先用dequeue删除头元素，剩下的那个就是元素就是我想要的答案
 */

function fibonacci(n) {
  var queue = new Queue()
  var index = 0
  queue.enqueue(1)
  queue.enqueue(1)
  while(index < n- 2) {
    var del_item = queue.dequeue()
    var head_item = queue.head()
    var next_item = del_item + head_item
    queue.enqueue(next_item)
    index += 1
  }

  queue.dequeue()
  return queue.head()
}

/**
 * 两个队列实现一个栈，思路其实就是取队列的尾部数据，用两个队列来回颠倒去取对方数据往对方队列加直到这个队列剩下最后一个元素把取出就是栈顶元素
 */