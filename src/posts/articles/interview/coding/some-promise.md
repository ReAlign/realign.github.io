---
view: post
layout: post
lang: zh-cn
author: realign
title: Promise 的一些实现
description: Promise 的一些实现
excerpt: Promise
cover: true
coverConfig:
  - type: coding
  - iconType: coding
  - title: Coding
  - subTitle: Promise Pro
categories:
  - coding
  - js
  - notes
tags:
  - coding
  - js
  - notes
created_at: 2020-11-16 21:30
updated_at: 2020-11-16 21:30
meta:
  - name: keywords
    content: promise
---

## Limit

<a href="/static-html-demo/interview/coding/4-some-promise/index.html" target="_blank">查看效果</a>

- 调用器
  - 就是把真正的执行函数和参数传入，创建返回一个新的 Promise，而这个新 Promise 的什么时候返回，取决于这个异步任务何时被调度。Promise 内部主要就是创建一个任务，判断任务是执行还是入队。
- 任务创建
  - 实际上就是返回了一个函数，将真正的执行函数放在里面执行。这里利用了 Promise 的 finally 方法，在 finally 中判断是否执行下一个任务，实现任务队列连续消费的地方就是这里。

```js
class PromiseLimit {
  constructor(max) {
    /* 上限 */
    this._max = max;

    /* 当前在执行的数量 */
    this._count = 0;
    /* 等待执行的队列 */
    this._taskQueue = [];
  }
  /**
   * 调用器 函数，排布任务
   * @param caller 异步任务函数 async | promiseReturn
   * @param args 参数列表
   * @returns {Promise} 新的 Promise
   */
  call(caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = this.createTask(caller, args, resolve, reject);
      if (this._count >= this._max) {
        this._taskQueue.push(task);
      } else {
        task();
      }
    });
  }
  /**
   * 任务创建 函数
   * @param caller 实际执行函数
   * @param args 执行函数的参数
   * @param resolve
   * @param reject
   * @returns {Function} 任务函数
   */
  createTask(caller, args, resolve, reject) {
    return () => {
      caller(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this._count--;
          if (this._taskQueue.length) {
            this._taskQueue.shift()();
          }
        });
      this._count++;
    };
  }
}
```
