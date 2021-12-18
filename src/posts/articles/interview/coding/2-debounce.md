---
view: post
layout: post
lang: zh-cn
author: realign
title: 手写代码(3)-Debounce
description: Debounce
excerpt: Debounce
cover: true
categories:
  - coding
  - js
tags:
  - coding
  - js
created_at: 2021-07-27 14:46
updated_at: 2021-07-27 15:21
meta:
  - name: keywords
    content: coding, js
---

## 概述

### 概念

* 防抖，即短时间内大量触发同一事件，只会执行一次函数
* 实现原理为：
  * 设置一个定时器，约定在xx毫秒后再触发事件处理
  * 每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作
* 防抖常用于搜索框/滚动条的监听事件处理，如果不做防抖，每输入一个字/滚动屏幕，都会触发事件处理，造成性能浪费。

## 代码实现

```js
const debounce = function(fn, delay) {
  let timer = null;
  return function() {
    const cxt = this;
    const args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function() {
      fn.call(cxt, args);
    }, delay);
  };
};

module.exports = debounce;
```
