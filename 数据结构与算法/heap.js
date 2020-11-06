/**
 * 堆就是一个完全二叉树
 * 关键码：节点所保存元素中某个属性，它能够唯一的表示（区分）这个节点，堆里进行比较堆值、对象key等
 * 最小堆任何一个父节点都小于左右两个子节点，最大堆相反。
 * 排序最小堆最小堆只关心父节点和左右子节点的关心，小于其中一个互换
 * insert插入最小堆将新堆元素插入到最小堆中由于此前最小堆已经建好，那么就可以从下向上与父节点堆关键码进行比较对调
 */

function MinHeap(size) {
  var head = new Array(size)
  var curr_size = 0
  var max_size = size
}

/**
 * 最小堆排序，因为父节点都是最小的每次删除堆顶
 * 一个非常大的数据集合，求集合最大的K个值：用最小堆（利用最小堆特性堆顶元素最小）来初始化一个大小为k堆最小堆先放入k个数剩余堆数依次和堆顶元素比较如果比堆顶大则删除堆顶元素并放入新的元素
 * 用最大堆求集合最小堆K个值
 */

/**
 * 哈夫曼树
 */

/**
 * 二叉搜索树：
 * 1、所以节点关键码都互不相同
 * 2、左子树上所有节点的关键码都小于根节点的关键码
 * 3、右节点的所有关键码都大于根节点的关键码
 * 4、左右子树也是二叉搜索树
 * 
 * 对二叉搜索树进行中序遍历，就可以按照关键码对大小从小到大的顺序将各个节点排列起来，因此二叉树也叫二叉排序树
 */

var TreeNode = function(data) {
  this.data= data
  this.leftChild = null
  this.rightChild = null
  this.parent = null
}

function BinarySerchTree() {
  var root = null
  var insert_data = function(data) {
    if(root === null) {
      root = new TreeNode(data)
    }
    if (data < node.data) {
      if(node.leftChild) {
        return insert_data(node.leftChild, data)
      } else {
        var new_node = new TreeNode(data)
        node.leftChild = new_node
        new_node = node
        return true
      }
    } else if(data > node.data) {
      if(node.rightChild) {
        return insert_data(node.rightChild, data)
      } else {
        var new_node = new TreeNode(data)
        node.rightChild = new_node
        new_node = node
        return true
      }
    } else {
      return false
    }
  }
  this.insert = function(data) {
    return insert_data(root, data)
  }

  var link_parent = function(parent, node, next_node) {
    if (parent === null) {
      root = next_node
      root.parent = null
    } else {
      if (parent.leftChild && parent.leftChild.data === node) {
        parent.leftChild = next_node
        next_node.parent = parent
      } else {
        parent.rightChild = next_node
        next_node.parent = parent
      }
    }
  }
  var remove_data = function(root, data) {
    if(!root) {
      return false
    }
    if(data < node.data) {
      return remove_data(node.leftChild, data)
    } else if(data > node.data) {
      return remove_data(node.rightChild, data)
    } else {
      if (node.leftChild && node.rightChild) {
        var tmp = node.rightChild
        while(tmp.leftChild) {
          tmp = tmp.leftChild
        }
        node.data = tmp.data
        return remove_data(node.rightChild, tmp.data)
      } else {
        var parent = node.parent
        if (!node.leftChild) {
          link_parent(parent, node, node.rightChild)
        } else {
          link_parent(parent, node, node.leftChild)
        }
      }
    }
  }
  this.remove = function(data) {
    return remove_data(root, data)
  }
}