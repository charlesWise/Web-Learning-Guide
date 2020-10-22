- loader其实就是一个有返回值的函数（不能是箭头函数必须声明函数function，因为需要使用this），多个loader是有顺序的

- plugin是一个类，里面包含一个apply函数，接收一个参数compiler