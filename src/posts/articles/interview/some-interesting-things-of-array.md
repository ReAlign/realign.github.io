---
view: post
layout: post
lang: zh-cn
author: realign
title: 关于数组:一些有趣的东西
description: 关于数组:一些有趣的东西
excerpt: 关于数组:一些有趣的东西
cover: true
coverConfig:
  - type: js
  - iconType: js
  - title: Array
  - subTitle: Interesting things
categories:
  - api
  - js
tags:
  - api
  - js
created_at: 2020-01-02 23:43
updated_at: 2020-01-02 23:43
meta:
  - name: keywords
    content: js-array,数组
---

## 关于数组

JS 中，数组是一个比较神奇的存在。

## 初始化

数组的初始化，一般有以下三种方式。

### 字面量

> ES5

```js
// 字面量
const a1 = [3]; // [3]
```

### 构造函数

> ES5

```js
// 构造函数
const a2 = new Array(3); // [empty × 3]
```

### Array.of

> ES6

```js
// 为了解决类似 a2 引发的怪异行为
const a3 = Array.of(3); // [3]
```

## 如何让数组使用与众不同

### 是否包含某个元素

```js
const arr = [1, 'x', false, { x: 'a' }, null];

// 一般写法
arr.indexOf(1) !== -1
// 推荐写法
arr.includes(1)
```

推荐理由

* 更加语义化
* 省略运算符

### 查找某个元素

```js
const arr = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
];

// 一般写法
arr.filter(item => item.id === 1)[0]
// 推荐写法
arr.find(item => item.id === 1)
```

推荐理由

* 更加语义化
* 省略运算符

### 对数组进行有条件的归并

```js
const arr = [1, 2, 3, 4, 5, 6];

let res = 0;
arr.filter(item => item % 2).forEach(item => res += item);

arr.reduce((total, num, index) => total + (num % 2 ? num : 0))
```

推荐理由

* 更加语义化
* 减少循环次数

## ES6

```js
// .of: 解决了构造函数方法创建数组时单个数字引起了怪异行为。
const a = Array.of(3); // [3]
// es5
const a1 = new Array(3); // [empty × 3]

// .from: 解决了 “类数组” 的转化问题
const x = document.querySelectorAll("a");

Array.from(x).forEach((i) => { console.log(i) });
// es5
[].forEach.call(x, function(i) { console.log(i) });
```

## Operation

### →[]

```js
[].unshift(x)
```

### []←

```js
[].push(x)
```

### ←[]

```js
[].shift()
```

### []→

```js
[].pop()
```

[waiting read](http://louiszhai.github.io/2017/04/28/array/)
