---
view: post
layout: post
lang: zh-cn
author: realign
title: 算法(1)-排序
description: 排序
excerpt: 排序
cover: true
categories:
  - algorithm
  - js
tags:
  - algorithm
  - js
created_at: 2020-03-29 02:01
updated_at: 2020-03-29 02:01
meta:
  - name: keywords
    content: algorithm, js
---

## 概述

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-29/img-1585419156776-5170.png', alt: 'sorting', width: '50%' }" />

## Bubble-冒泡排序

### bubble描述

* 一种简单的排序算法
* 重复遍历要排序的数组，每次比较相邻两个元素，如果它们的顺序错误就把它们交换过来
* 重复地进行比较，直到没有再需要交换的元素，也就是说该数列已经排序完成
* 越小的元素会经过交换慢慢「浮」到数数组头部，冒泡因此得名

### bubble执行步骤

1. 相邻比较：如果第一个比第二个大，就交换他们两个
2. 从头到尾依次重复「相邻比较」，做完后，最后的元素是最大的数
3. 所有元素重复【1】【2】，除了最后一个

### bubble代码实现

```js
const bubbleSort = (arr = []) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 相邻比较
      if (arr[j] > arr[j + 1]) {
        // 解构，交换元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

const a = [2, 1, 5, 3, 4];
bubbleSort(a);
// [1, 2, 3, 4, 5]
```

### 一句话说bubble

无大局观，只关心往前走的路上碰到的，不符合就换。

## Selection-选择排序

### selection描述

* 简单直观的排序算法
* 先在未排序序列中找到最小元素，存放到排序序列开始位置
* 再从剩余未排序元素中继续寻找最小元素，放到已排序序列的末尾
* 依次，直到所有元素均排序完毕

### selection执行步骤

描述很清楚了

### selection代码实现

```js
const selectionSort = (arr) => {
  const len = arr.length;
  let minIndex;

  for (let i = 0; i < len - 1; i++) {
    // 保存最小数
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 寻找最小的数
      if (arr[j] < arr[minIndex]) {
        // 将最小数的索引保存
        minIndex = j;
      }
    }
    // 解构，交换
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }

  return arr;
};
const a = [2, 1, 5, 3, 4];
selectionSort(a);
// [1, 2, 3, 4, 5]
```

### 一句话说selection

有大局观，每一遍都找到最小的，把每次最小的依次放列尾。

## Insertion-插入排序

### insertion描述

是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

### 核心思想

> 扑克牌思想

* 就想着自己在打扑克牌，待抓的牌是待排序的序列
* 抓起来第一张，放哪里无所谓
* 再抓起来一张，比第一张小，放左边
* 继续抓，可能是中间数，就插在中间
* 再继续，可能也是中间数，但是这个中间需要自己对比，是哪个的中间
* 后面抓起的牌从后向前依次比较，并插入

### insertion执行步骤

1. 从第一个元素开始，该元素可以认为已经被排序
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
5. 将新元素插入到该位置后
6. 重复步骤 2~5

### insertion代码实现

```js
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }
  return arr;
};

const a = [2, 1, 5, 3, 4];
insertionSort(a);
// [1, 2, 3, 4, 5]
```

### 一句话说insertion

有大局观，拿一个排一个，每次把拿到的插到新序列合适的位置。

## Quick-快速排序

### quick描述

名字简单粗暴，一听到这个名字就知道它存在的意义：就是快，而且效率高!

它是处理大数据最快的排序算法之一了。

它是在冒泡排序基础上的递归分治法。通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列。该算法不断重复这个步骤直至所有数据都是有序的。

### quick核心思想

找到一个数作为参考，比这个数字大的放在数字左边，比它小的放在右边；然后分别再对左边和右变的序列做相同的操作(递归)。

* 注意: 涉及到递归的算法，一定要记得要有条件跳出递归！

### quick执行步骤

1. 从数列中挑出一个元素，称为 “基准”（pivot）
2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面
3. 递归地把小于基准值元素的子数列和大于基准值元素的子数列排序

### quick代码实现

```js
const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr; //递归出口
  }
  let left = [];
  let right = [];
  let pivot = a[0];

  for (let i = 1; i < a.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }

  return quickSort(left).concat(pivot, quickSort(right));
};

const a = [2, 1, 5, 3, 4];
quickSort(a);
// [1, 2, 3, 4, 5]
```

### 进阶改进版

```js
const partition = (arr, low, high) => {
  let pivot = arr[low];
  while (low < high) {
    while (low < high && arr[high] > pivot) {
      --high;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
};
const quickSort = (arr, low = 0, high = arr.length - 1) => {
  if (low < high) {
    // 分区，排序
    partition(arr, low, high);
    quickSort(arr, low, low - 1);
    quickSort(arr, low + 1, high);
  }
  return arr;
};

const a = [2, 1, 5, 3, 4];
quickSort(a);
// [1, 2, 3, 4, 5]
```

### 一句话说quick

有大局观，递归-分治；分治双指针收缩。

<!-- ### bubble描述

* 一

### bubble执行步骤

1. 相

### bubble代码实现 -->
