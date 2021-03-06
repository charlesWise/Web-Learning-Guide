/**
 * 散列表（hashTable）：表示集合，字典的另一种有效方法，它将关键码映射到某个位置上来存储元素，取值的时候根据关键码找到对应的位置来取值。
 * 散列表使用数组实现，关键码key和数组索引之间有个映射关系，那么就可以通过key找到数组中索引，得到索引后无论是赋值还是取值，变得非常方便时间复杂度O(1)
 * hash函数：一遍翻译成散列，它把任意长度的输入通过散列算法变换成固定长度的输出，这个输出的结果就是散列值。给hash函数一个字符串它返回给你一个整数。
 */