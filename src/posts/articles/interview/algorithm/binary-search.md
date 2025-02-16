---
view: post
layout: post
lang: zh-cn
author: realign
title: 二分查找
description: 二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。前提是要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。
excerpt: 二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。前提是要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。
cover: true
coverConfig:
  - type: algorithm
  - iconType: algorithm
  - title: Algorithm
  - subTitle: Binary search
categories:
  - algorithm
  - js
  - notes
tags:
  - algorithm
  - js
  - notes
created_at: 2020-04-01 13:28
updated_at: 2020-04-01 13:28
meta:
  - name: keywords
    content: algorithm, js, notes
---

## 概述

二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。前提是要求线性表必须采用**顺序存储**结构，而且表中元素按关键字**有序**排列。

## 基础二分查找

### 寻找一个数

可假设目标元素在序列中是唯一的，或者只需要得到结果 - 序列中存在目标元素。

### 查找过程

1. 将表中间位置记录的关键字与查找关键字比较，如果两者相等，则查找成功
2. 否则利用中间位置记录将表分成前、后两个子表
    1. 如果中间位置记录的关键字大于查找关键字，则进一步查找前一子表，否则进一步查找后一子表
3. 重复以上过程
    1. 直到找到满足条件的记录，使查找成功
    2. 或直到子表不存在为止，此时查找不成功

### 基础二分查找代码实现-非递归

```js
/**
 * 二分查找-非递归
 * @param {Array} arr 有序序列
 * @param {Number} target 目标值
 * @returns {Number} index 目标值索引位置，-1 表示未找到
 */
function binarySearch(arr = [], target = null) {
  const len = arr.length;
  let left = 0;
  let right = len - 1;
  while(left <= right) {
    const middleIndex = Math.floor((left + right) / 2);
    const item = arr[middleIndex];
    if(item === target) {
      return middleIndex;
    }
    if(item < target) {
      left = middleIndex + 1;
    }
    if(item > target) {
      right = middleIndex - 1;
    }
  }

  return -1;
}

binarySearch([1, 2, 3, 4, 5, 9, 34, 222], 34); // 6
binarySearch([1, 2, 3, 4, 5, 9, 34, 222], 10); // -1
```

### 基础二分查找代码实现-递归

```js
/**
 * 二分查找-递归
 * @param {Array} arr 有序序列
 * @param {Number} target 目标值
 * @param {Array} left 区间左边界
 * @param {Number} right 区间右边界
 * @returns {Number} index 目标值索引位置，-1 表示未找到
 */
function binarySearch(arr = [], target = null, left = 0, right = arr.length - 1) {
  // ！！递归注意跳出条件！！
  if(left > right) {
    return -1;
  }
  const middleIndex = Math.floor((left + right) / 2);
  const item = arr[middleIndex];
  if(item === target) {
    return middleIndex;
  } else {
    if(item < target) {
      return binarySearch(arr, target, middleIndex + 1, right);
    } else {
      return binarySearch(arr, target, left, middleIndex - 1);
    }
  }
  return -1;
}

binarySearch([1, 2, 3, 4, 5, 9, 34, 222], 34); // 6
binarySearch([1, 2, 3, 4, 5, 9, 34, 222], 10); // -1
```

## 寻找左侧边界的二分搜索

### 寻找左侧边界的非递归实现

```js
/**
 * 二分查找-寻找左侧边界-非递归
 * @param {Array} arr 有序序列
 * @param {Number} target 目标值
 * @returns {Number} index 目标值索引位置，-1 表示未找到
 */
function binarySearchLeft(arr = [], target = null) {
  const len = arr.length;
  let left = 0;
  let right = len;
  while(left < right) {
    const middleIndex = Math.floor((left + right) / 2);
    const item = arr[middleIndex];
    if(item === target) {
      right = middleIndex;
    }
    if(item < target) {
      left = middleIndex + 1;
    }
    if(item > target) {
      right = middleIndex;
    }
  }

  return left;
}

binarySearchLeft([1, 2, 3, 3, 4, 5, 9, 34, 222], 3); // 2
```

## 寻找右侧边界的二分搜索

### 寻找右侧边界的非递归实现

```js
/**
 * 二分查找-寻找右侧边界-非递归
 * @param {Array} arr 有序序列
 * @param {Number} target 目标值
 * @returns {Number} index 目标值索引位置，-1 表示未找到
 */
function binarySearchRight(arr = [], target = null) {
  const len = arr.length;
  let left = 0;
  let right = len;
  while(left < right) {
    const middleIndex = Math.floor((left + right) / 2);
    const item = arr[middleIndex];
    if(item === target) {
      left = middleIndex + 1;
    }
    if(item < target) {
      left = middleIndex + 1;
    }
    if(item > target) {
      right = middleIndex;
    }
  }

  return left - 1;
}

binarySearchRight([1, 2, 3, 3, 4, 5, 9, 34, 222], 3); // 3
```

## 参考

* [详解二分查找算法](https://www.cnblogs.com/kyoner/p/11080078.html)
