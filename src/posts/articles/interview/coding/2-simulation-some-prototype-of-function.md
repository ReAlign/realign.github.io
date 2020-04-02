---
view: post
layout: post
lang: zh-cn
author: realign
title: 模拟实现函数-Function.prototype.xxx
description: 模拟实现函数-Function.prototype.xxx
excerpt: 模拟实现函数-Function.prototype.xxx
cover: true
categories:
  - coding
  - js
  - notes
tags:
  - coding
  - js
  - notes
created_at: 2020-04-02 15:04
updated_at: 2020-04-02 15:04
meta:
  - name: keywords
    content: coding, js, notes
---

## bind2

### 关于bind

* `bind()` 方法创建一个新的函数
* 在 `bind()` 被调用时
  * 这个新函数的 `this` 被指定为 `bind()` 的第一个参数
  * 其余参数将作为新函数的参数，供调用时使用

### mdn实现

```js
Function.prototype.bind = function() {
  var thatFunc = this;
  var thatArgs = arguments[0];
  var args = [].slice.call(arguments, 1);
  if (typeof thatFunc !== 'function') {
    throw new TypeError('Function.prototype.bind - ' +
      'what is trying to be bound is not callable');
  }
  return function() {
    var funcArgs = args.concat([].slice.call(arguments))
    return thatFunc.apply(thatArgs, funcArgs);
  };
};
```
