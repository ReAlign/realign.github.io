---
view: post
layout: post
lang: zh-cn
author: realign
title: 一些常见的js代码片段
description: 一些常见的js代码片段
excerpt: 一些常见的js代码片段
cover: true
categories:
  - coding
  - js
  - notes
tags:
  - coding
  - js
  - notes
created_at: 2020-04-04 15:04
updated_at: 2020-04-04 16:21
meta:
  - name: keywords
    content: coding, js, notes
---

## Common

### typeOf

> 精确版的 typeof

```js
function typeOf(o) {
  return ({}).toString.call(o).slice(8, -1).toLowerCase();
}

typeOf([]); // 'array'
typeOf(undefined); // 'undefined'
typeOf(Symbol()); // 'symbol'
```

## Array

### GetMaxAndIndexs

> 找出数组中出现次数最的元素，并给出其出现过的位置

```js
function getMaxAndIndexs(arr) {
  const map = {};
  let max = null;
  for(let i = 0; i < arr.length; i++) {
    const x = arr[i];
    if(i === 0) {
      max = x;
    }

    max = Math.max(max, x);
    if(map[x] === undefined) {
      map[x] = [];
    }
    map[x].push(i);
  }

  return {
    max,
    indexs: map[max]
  };
}

var x = [7, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 3, 2, 1, 4, 3, 7];
getMaxAndIndexs(x);
// {
//   "max": 7,
//   "indexs": [ 0, 7, 8, 9, 10, 16 ]
// }
```
