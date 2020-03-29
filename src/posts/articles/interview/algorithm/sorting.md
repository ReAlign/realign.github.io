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

有大局观，每次走一遍，都能找到最小的，把每次最小的依次放下。

## Insertion-插入排序

### insertion描述

* 一

### insertion执行步骤

1. 相

### insertion代码实现

<!-- ### bubble描述

* 一

### bubble执行步骤

1. 相

### bubble代码实现 -->