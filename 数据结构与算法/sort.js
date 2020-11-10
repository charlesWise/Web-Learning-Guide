/**
 * 分而治之，是非常重要的编程思想，它的关键之处在于不断缩小问题的规模，直到找到基线条件，而基线条件则是非常简单且易于处理的，这种思想天然的就和递归契合在一起，递归也是一个不断分解问题直到遇到最简单最易处理的情况然后加以解决的过程。
 * 归并排序：合并两个有序数组，思路如下：1、分别使用一个游标指向数组的最小值2、比较这两个最小值，将其中最小的放入合并数组3、最小值的游标向后移动，指向新的最小值，重复刚才的过程4、不能忽略的一点，可能其中某一个游标很快就走到头了，那么另一个没有走到头的游标要单独处理。
 */

// 合并两个有序数组
function merge(arr1, arr2) {
  var merge_arr = [];
  var index_1 = 0;
  var index_2 = 0;

  while (index_1 < arr1.length && index_2 < arr2.length) {
    // 哪个数组的头部元素小,就合并谁,然后更新头的位置
    if (arr1[index_1] <= arr2[index_2]) {
      merge_arr.push(arr1[index_1]);
      index_1++;
    } else {
      merge_arr.push(arr2[index_2]);
      index_2++;
    }
  }

  // arr1有剩余
  if (index_1 < arr1.length) {
    while (index_1 < arr1.length) {
      merge_arr.push(arr1[index_1]);
      index_1++;
    }
  }

  // arr2有剩余
  if (index_2 < arr2.length) {
    while (index_2 < arr2.length) {
      merge_arr.push(arr2[index_2]);
      index_2++;
    }
  }
  return merge_arr;
}

var arr1 = [1, 3, 5];
var arr2 = [2, 4, 6];
console.log(merge(arr1, arr2));

/**
 * 分治法将一个大的问题，转化分解成若干个子问题，当每个子问题都解决了以后，大的问题也就随之解决。
 * 归并排序：合并两个无序数组
 */

function merge_sort_ex(arr, start, end) {
  if (start < end) {
    // 分
    var middle = Math.floor((start + end) / 2);
    var arr1 = merge_sort_ex(arr, start, middle);
    var arr2 = merge_sort_ex(arr, middle + 1, end);
    // 治
    return merge(arr1, arr2);
  }
  return [arr[end]];
}

function merge_sort(arr) {
  return merge_sort_ex(arr, 0, arr.length - 1);
}

var arr = [7, 2, 8, 1, 4, 6, 9, 3];
console.log(merge_sort(arr));

/**
 * 快速排序也是一种分而治之的算法，对于一个无序的数组，从其中随机找出一个数，以这个数为基准对数组进行处理，处理后，这个基准数的左边的数值都比它小，右边都比它大，这样便完成了一次分，分的结果是数组里的数据分成了两派，一派在基准值的左边，一派在基准值的右边。接下来要治，分别治理这两派，如何治，还是老办法，对他们进行分。如此反复，当一派里只一个元素的时候，它天然就是有序的，不需要继续分治，此时，整个数组都已经变得有序。
 */

// 取arr[start]为基准值,将start到end这个区域进行分区
function partition(arr, start, end) {
  var pivotpos = start;
  var pivot = arr[start];

  for (var i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      pivotpos++;
      if (pivotpos != i) {
        // 将小于基准的值交换到左侧
        var temp = arr[pivotpos];
        arr[pivotpos] = arr[i];
        arr[i] = temp;
      }
    }
  }
  arr[start] = arr[pivotpos];
  arr[pivotpos] = pivot;

  return pivotpos;
}
// 完整快速排序算法
function quick_sort_ex(arr, start, end) {
  if (start < end) {
    var pivotpos = partition(arr, start, end);
    quick_sort_ex(arr, start, pivotpos - 1);
    quick_sort_ex(arr, pivotpos + 1, end);
  }
}

function quick_sort(arr) {
  quick_sort_ex(arr, 0, arr.length - 1);
}

var arr = [7, 2, 8, 1, 4, 6, 9, 3];
quick_sort(arr);
console.log(arr);

/**
 * 当序列长度在5到25之间时，直接插入排序的速度比快速排序快至少10%， 改进后的快速排序，当数据规模小于25时，采用直接插入排序。
 */
// 插入排序示例代码：
function insert_sort(arr, start, end) {
  for (var i = start + 1; i <= end; i++) {
    // 假设从arr[0]到arr[i-1]已经有序,那么只需要比较arr[i]和arr[i-1]的大小即可
    if (arr[i] < arr[i - 1]) {
      var tmp = arr[i];
      var j = i - 1;
      // 找到tmp应该在的位置
      while (j >= start && tmp < arr[j]) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = tmp;
    }
  }
}

var arr = [7, 2, 8, 1, 4, 6, 9, 3];
insert_sort(arr, 0, arr.length - 1);
console.log(arr);

// 改进后的快速排序算法
function quick_sort_ex(arr, start, end) {
  if (start < end) {
    if (end - start <= 25) {
      insert_sort(arr, start, end);
    } else {
      var pivotpos = partition(arr, start, end);
      quick_sort_ex(arr, start, pivotpos - 1);
      quick_sort_ex(arr, pivotpos + 1, end);
    }
  }
}

function quick_sort(arr) {
  quick_sort_ex(arr, 0, arr.length - 1);
}

var arr = [7, 2, 8, 1, 4, 6, 9, 3];
quick_sort(arr, 0, arr.length - 1);
console.log(arr);

/**
 * 二分查找法是分而治之的典型应用，在一个有序的序列中，查找某个具体数值的位置，并不需要从头到尾的进行遍历，而是先找到中间的数值，如果中间的数值比要查找的数值小，下一步就去中间数值的右侧继续查找，如果中间的数值比要查找的数值大，下一步就去中间数值的左侧继续查找，如果中间数值和要查找的数值一样大，则返回中间数值的索引。
 * 二分查找算法虽然也是分治法，但是又与快速排序的分治有所区别，二分查找将一个大的问题转化分解成若干个小问题，这些小问题中只解决其中一个，整个大问题就随之解决了。二分查找算法取中间值，将序列一分为二，但是每次都只进入其中某一个子序列，而不像快速排序算法那样，每次分区后，两个子序列都要处理，二分查找算法是分治法的一种特例，叫减治法。
 */

function binary_search(arr, target, start, end) {
  if (start > end) {
    return -1; //表示找不到
  }

  var middle = Math.floor((start + end) / 2);
  if (arr[middle] == target) {
    return middle;
  } else if (arr[middle] > target) {
    // 去左侧查找
    return binary_search(arr, target, start, middle - 1);
  } else {
    // 去右侧查找
    return binary_search(arr, target, middle + 1, end);
  }
}

var arr = [1, 3, 4, 6, 7, 9, 10];
console.log(binary_search(arr, 5, 0, arr.length - 1));
console.log(binary_search(arr, 9, 0, arr.length - 1));

// 如果问题有一个小小的变化，不再是查找某个具体数值的位置，而是查找第一个比某个数值大的位置，那么该如何处理呢？比如，找到第一个比5大的数的位置。
// 方法依然是二分查找，需要对逻辑稍作修改，当arr[middle]小于等于target时，我们需要判断arr[middle+1]和 target之间的关系，如果arr[middle+1]>target，返回middle+1，反之，继续去右侧查找，示例代码

// 找到第一个比target大的数的位置
function binary_search_bigger(arr, target, start, end) {
  if (arr[start] > target) {
    return start;
  }

  if (start > end) {
    return -1; //表示找不到
  }

  var middle = Math.floor((start + end) / 2);
  if (arr[middle] <= target) {
    if (arr[middle + 1] > target) {
      return middle + 1;
    }
    return binary_search_bigger(arr, target, middle + 1, end);
  } else {
    return binary_search_bigger(arr, target, start, middle - 1);
  }
}

var arr = [1, 3, 4, 6, 7, 9, 10];
console.log(binary_search_bigger(arr, 5, 0, arr.length - 1));
console.log(binary_search_bigger(arr, 0, 0, arr.length - 1));