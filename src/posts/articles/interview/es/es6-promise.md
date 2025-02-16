---
view: post
layout: post
lang: zh-cn
author: realign
title: ES6 总结之Promise
description: ES6 总结之Promise
excerpt: ES6 总结之Promise
cover: true
coverConfig:
  - type: js
  - iconType: js
  - title: ECMAScript
  - subTitle: ES6 Promise
categories:
  - api
  - js
tags:
  - api
  - js
created_at: 2020-03-19 17:03
updated_at: 2020-03-19 17:03
meta:
  - name: keywords
    content: js,api,promise
---

## Promise - 简介

`Promise` 是异步编程的一种解决方案。

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 250);
});

promise.then((msg) => {
  console.log(`Yay! ${msg}`);
});
```

## State - 状态

有三种状态：

* `pending` - 进行中
* `fulfilled` - 已成功
* `rejected` - 已失败

### 特点

1. `Promise` 的状态只会由异步操作的结果决定。
2. 状态变更，只能是：`pending` -> `fulfilled` 或 `pending` -> `rejected`

### 缺点

1. `Promise` 无法取消，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。
3. 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## Init - 初始化

```js
const promise = new Promise((resolve, reject) => {
  // 异步处理
  // 处理结束后、调用resolve 或 reject
});
```

## Methods - 方法

### then

```js
/**
 * @name    Promise.prototype.then
 * @desc    链式操作的回调函数
 * @params  {Function}  onResolve  成功回调
 * @params  {Function}  onReject   失败回调
 * @returns {Promise}   新的 Promise
 */

new Promise().then(onResolve, onReject);
```

### catch

```js
/**
 * @name    Promise.prototype.catch
 * @desc    链式操作的错误捕获函数
 * @desc    alias of Promise.prototype.then(null, onReject)
 * @params  {Function}  onError   错误
 * @returns {Empty}
 */

new Promise().then(onResolve).catch(onError);
```

### all

```js
/**
 * @name    Promise.prototype.all
 * @desc    将多个 Promise 实例，包装成一个新的 Promise 实例
 * @params  {Array}     [Promise(), ...]
 * @returns {Promise}   新的 Promise
 */

const asyncFn = (x) => new Promise((res, rej) => {
  const r = x * 1000;
  setTimeout(() => {
    console.log(x);
    x ? res(r) : rej(`err: ${x}`);
  }, r);
});

const ps = [2, 3, 5].map(id => asyncFn(id));

Promise.all(ps).then(r => {
  console.log('ok');
  console.log(r);
}).catch((err) => {
  console.error(err);
});

/* 输出结果 */

// Promise {<pending>}
// 2
// 3
// 5
// ok
// (3) [2000, 3000, 5000]
```

关于 Promise.all 的状态

```js
const p = Promise.all([p1, p2, p3]);
```

1. 只有 p1、p2、p3 的状态都变成 `fulfilled`，p 的状态才会变成 `fulfilled`，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数
2. 只要 p1、p2、p3 之中有一个被 `rejected`，p 的状态就变成 `rejected`，此时第一个被 `reject` 的实例的返回值，会传递给 p 的回调函数

***

waiting...

https://www.runoob.com/w3cnote/javascript-promise-object.html