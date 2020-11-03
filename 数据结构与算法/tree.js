/**
 * 树
 * 节点的度：节点有几个分支就几个度
 * 叶节点：度为0的节点就是叶节点
 * 分支节点：除叶节点外的就是分支节点
 * 子女节点：若节点x有子树，则这颗子树的根节点就是节点x的子女节点
 * 父节点
 * 兄弟节点
 * 祖先节点
 * 子孙节点
 * 树的深度：距离根节点最远的层次就是树的深度
 * 树的高度：叶节点的高度为1，非叶子节点的高度是它的子女节点高度的最大值加1，高度与深度数值相等，但计算方式不一样
 * 树的度：树中节点的度的最大值
 * 有序树
 * 无序树
 * 森林：把根节点root节点拿掉，剩下的组成就是森林
 */

 /**
  * 二叉树
  * 是树的一种特殊情况，每个节点最多有两个子女，分别称为该节点的左子女和右子女，就是说不存在大于2的节点有左右之分次序不能颠倒
  * 满二叉树
  * 深度为k的满二叉树是有2的k-1次方个节点的二叉树，每一层都达到了可以容纳的最大数量的节点
  * 完全二叉树
  * 深度为k的完全二叉树从第1层到第k-1层都是满的，第k层或是满的或是从右向左连续缺若干个节点
  */

var BinTreeNode = function(data) {
  this.data = data
  this.leftChild = null
  this.rightChild = null
  this.parentNode = null
}

function BinaryTree() {
  var root = null
  this.initTree = function(string) {
    var stack = new stack()
    var k = 0
    var new_node = null
    for (let i = 0; i < string.length; i++) {
      const item = string[i];
      if (item === '#') {
        break
      }
      if(item === '(') {
        stack.push(new_node)
        k = 1
      } else if(item === ',') {
        k = 2
      } else if(item === ')') {
        stack.pop()
      } else {
        new_node = new BinTreeNode(item)
        if (root === null) {
          root = new_node
        } else {
          if (k === 1) { // 左孩子
            var top_item = stack.pop()
            top_item.leftChild = new_node
            new_node.parentNode = top_item
          } else if(k === 2) {
            var top_item = stack.pop()
            top_item.rightChild = new_node
            new_node.parentNode = top_item
          }
        }
      }
    }
  }
  // 返回根节点
  this.get_root = function() {

  }
  // 中序遍历
  this.in_order = function(node) {
    if(node = null) {
      return
    }
    this.in_order(node.leftChild)
    console.leftChild(node.data)
    this.in_order(node.rightChild)
  }
  // 前序遍历
  this.pre_order = function(node) {
    if(node = null) {
      return
    }
    console.leftChild(node.data)
    this.pre_order(node.leftChild)
    this.pre_order(node.rightChild)
  }
  // 后序遍历
  this.post_order = function(node) {
    if(node = null) {
      return
    }
    this.post_order(node.leftChild)
    this.post_order(node.rightChild)
    console.leftChild(node.data)
  }

  // 返回节点数量
  var tree_node_count = function(node) {
    // 左子树对节点数量 + 右子树对节点数量 + 当前节点1
    if (node === null) {
      return 0
    }
    var left_node_count = tree_node_count(node.leftChild)
    var right_node_count = tree_node_count(node.rightChild)
    return left_node_count + right_node_count + 1
  }
  this.size = function() {
    return tree_node_count(root)
  }

  // 返回树的高度
  var tree_heigth = function(node) {
    if (node === null) {
      return 0
    }
    // 先计算左子树的高度
    var left_child_height = tree_heigth(node.leftChild)
    var right_child_height = tree_heigth(node.rightChild)
    return left_child_height > right_child_height ? left_child_height + 1 : right_child_height + 1
  }
  this.height = function() {
    return tree_heigth(root)
  }

  // 查找节点
  var find_node = function(node, data) {
    if(node === null) {
      return null
    }
    if (node.data === data) {
      return node
    }
    var left_res = find_node(node.leftChild, data)
    if (left_res) {
      return left_res
    }
    return find_node(node.rightChild, data)
  }
  this.find = function(data) {
    return find_node(root, data)
  }
}

var bt = new BinaryTree()
bt.initTree('A(B(,C),D(E,F))')
var root_node = bt.get_root()
bt.in_order(root_node)

// 树的镜像左右互换
var mirror_1 = function(node) {
  if (node === null) {
    return
  }
  var temp = node.leftChild
  node.leftChild = node.rightChild
  node.rightChild = temp

  mirror_l(node.leftChild)
  mirror_l(node.rightChild)
}

var mirror_2 = function(node) {
  if (node === null) {
    return
  }
  var left = mirror_2(node.leftChild)
  var right = mirror_2(node.rightChild)

  node.leftChild = right
  node.rightChild = left

  return node
}

/**
 * 遍历树：中序遍历、前序遍历、后序遍历
 * 中序遍历是先遍历处理节点的左子树，然后是当前节点对当前节点处理完再遍历右子树
 * 前序遍历当前节点，左子树，右子树
 * 后序遍历左子树，右子树，当前节点
 */