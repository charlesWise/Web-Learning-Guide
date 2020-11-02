function Stack () {
  var items = []
  this.push = function(item) {
    items.push(item); // 压栈
  }
  this.pop = function() {
    return items.pop()
  }
  this.top = function() {
    return items[items.length - 1]
  }
  this.isEmpty = function() {
    return !items.length
  }
  this.size = function() {
    return items.length
  }
  this.clear = function() {
    items = []
  }
}

/**
 * 判断函数合法性
 */
function is_leagl_brackets(str) {
  var stack = new Stack()
  for (let i = 0; i < str.length; i++) {
    const ele = str[i];
    if (ele === '(') {
      stack.push(ele)
    } else if (ele === ')') {
      if (stack.isEmpty()) {
        return false
      } else {
        stack.pop()
      }
    }
  }
  return stack.isEmpty
}

console.log(is_leagl_brackets('sd(f(ds(ew(we)rw)rw)qq)qw))ewe'))
console.log(is_leagl_brackets('sdf(ds(ew(we)rw)rw)qq)qwewe)('))


/**
 * 逆波兰表达式又叫后缀表达式，计算机是把中缀表达式(1 + 2 = 3)转换为后缀表达式
 * 使用栈来解决：
 * 1、如果元素不是+ - * /中的某一个，就压入栈
 * 2、如果元素是+ - * /中的某一个，则从栈里连续弹出两个元素，并对这两个元素进行计算，将计算结果压入栈中
 * 3、for循环结束之后，栈里只有一个元素，这个元素就是整个表达式对计算结果
 */
function Stack() {
  var items = [];
  this.push = function (item) {
    items.push(item); // 压栈
  };
  this.pop = function () {
    return items.pop();
  };
  this.top = function () {
    return items[items.length - 1];
  };
  this.isEmpty = function () {
    return !items.length;
  };
  this.size = function () {
    return items.length;
  };
  this.clear = function () {
    items = [];
  };
}

function calc_exp(exp) {
  var stack = new Stack();
  for (let i = 0; i < exp.length; i++) {
    const item = exp[i];
    if (["+", "-", "*", "/"].indexOf(item) > 0) {
      var v_1 = stack.pop;
      var v_2 = stack.pop;
      // 逆波兰表达式第二个参数需放到表达式的左边
      var exp_str = v_2 + item + v_1;
      var res = parseInt(eval(exp_str));
      stack.push(res.toString());
    }
  }

  return stack.pop();
}

console.log(calc_exp(["4", "13", "5", "/", "+"]));