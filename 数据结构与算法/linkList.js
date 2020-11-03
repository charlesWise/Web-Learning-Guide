/**
 * 节点类
 */

var Node = function(data) {
  this.data = data
  this.next = null
}

var node1 = new Node(1)
var node2 = new Node(2)
var node3 = new Node(5)

node1.next = node2
node2.next = node3

console.log(node1.next)

/**
* append 添加一个新元素
* inset 在指定位置插入一个元素，要插入都index的位置首先要找到index - 1的位置
* remove 删除指定位置的节点
* remove_head 删除首节点
* remove_tail 删除尾节点
* indexOf 返回指定元素的索引
* get 返回指定索引位置的元素
* head 返回首节点
* tail 返回尾节点
* length 返回链表长度
* inEmpty 判断链表是否为空
* clear 清空链表
* print 打印整个链表
*/

function LinkList() {
 var Node = function(data) {
 this.data.data
 this.next = null
 }

 var length = 0
 var head = null
 var tail = null

 this.append = function(data) {
   var new_node = new Node(data)
   if (head === null) {
     head = new_node
     tail = new_node
   } else {
     tail.next = new_node
     tail = new_node
   }
   length += 1
   return true
 }

 this.print = function() {
   var curr_node = head
   while(curr_node) {
     console.log(curr_node.data)
     curr_node = curr_node.next
   }
 }

 this.insert = function(index, data) {
   if (index < 0 || index > length) return false
   if (index === length) {
     return this.append(data)
   }

   // 插入
   var new_node = new Node(data)
   if (index = 0) {
     new_node.next = head
     head = new_node
   } else {
     var insert_index = 1
     var curr_node = head
     while(insert_index < index) {
       insert_index += 1
       curr_node = curr_node.next
     }
     var next_node = curr_node.next
     curr_node.next = new_node
     new_node.next = next_node
   }
   length += 1
   return true
 }

 this.remove = function(index) {
   if (index < 0 || index >= length) return null
   var del_node = null
   if (index === 0) {
     del_node = head
     head = head.next
   } else {
     var del_index = 0
     var pre_node = null
     var curr_node = head
     while(del_index < index) {
       del_index += 1
       pre_node = curr_node
       curr_node = curr_node.next
     }
     del_node =curr_node
     pre_node.next = curr_node.next

     if (curr_node.next === null) {
       tail = pre_node
     }
   }
   length -= 1
   del_node.next = null
   return del_node.data
 }
}

var link = new LinkList()
link.append(2)
link.append(4)
link.append(8)

link.print()


/**
* 链表翻转（迭代翻转、递归翻转）
* 迭代翻转：遍历过程每完成一个节点翻转都让curr_node = next_node，找到下一个需要翻转的节点，同时pre_node和next_node也跟着curr_node一起向后滑动
* 递归翻转：
* 1、明确函数的功能，既然是先让别人去做，那你得清楚告诉他做什么。函数reverse_digui(head)完成的功能，是从head开始翻转链表，函数返回值是翻转后的头节点
* 2、正式甩锅进行递归调用，var new_head = reverse_digui(head.next)，原本是翻转以head开通链表可是你不会啊那就先让别人从head.next开始翻转链表等他翻转完得到new_head就是翻转后的头节点
* 3、根据别人的结果，计算自己结果，终止 if(head.next === null) return head
*/

// 递归翻转
function reverse_digui(head) {
 if(!head) return null
 if(head.next === null) return head
 var new_head = reverse_digui(head.next)
 head.next.next = head
 head.next = null
 return new_head
}