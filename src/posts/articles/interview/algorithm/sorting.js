var testArr = [2, 1, 5, 3, 4];

function xBubble(a) {
  var len = a.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }

  return a;
}

function xSelect(a) {
  var minIndex;
  var len = a.length;
  for (var i = 0; i < len; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }
    [a[minIndex], a[i]] = [a[i], a[minIndex]];
  }

  return a;
}

function xInsert(a) {
  for (var i = 1; i < a.length; i++) {
    for (var j = i; j > 0; j--) {
      if (a[j] < a[j - 1]) {
        [a[j], a[j - 1]] = [a[j - 1], a[j]];
      } else {
        break;
      }
    }
  }
  return a;
}

function xQuick(a) {
  if (a.length <= 1) {
    return a; //递归出口
  }
  let left = [];
  let right = [];
  let pivot = a[0];

  for (var i = 1; i < a.length; i++) {
    a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
  }

  return xQuick(left).concat(pivot, xQuick(right));
}

// heap
/**
 * 建立大顶堆
 * @param {*} arr 序列
 */
function buildMaxHeap(arr = []) {
  let len = arr.length;
  for (let i = Math.floor((len - 1 - 1) / 2); i >= 0; i--) {
    heapify(arr, i, len);
  }
}

/**
 * 堆化
 * @param {*} arr
 * @param {*} i
 * @param {*} len
 */
function heapify(arr, i, len) {
  // 左孩子
  let lc = 2 * i + 1;
  // 右孩子
  let rc = 2 * i + 2;
  // 最大值
  let largest = i;

  // 左右孩子对比，使根元素最大
  if (lc < len && arr[lc] > arr[largest]) {
    largest = lc;
  }
  if (rc < len && arr[rc] > arr[largest]) {
    largest = rc;
  }

  // 根元素有变化，调整
  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, largest, len);
  }
}

/**
 *
 * @param {*} arr
 * @param {*} i
 * @param {*} j
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 *
 * @param {*} arr
 */
function heapSort(arr) {
  // 构建堆
  buildMaxHeap(arr);

  let len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    // 大元素「沉底」
    swap(arr, 0, i);
    // 堆调整「子大顶堆」
    heapify(arr, 0, --len);
  }

  return arr;
}