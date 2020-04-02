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

## bind

### 关于bind

* `bind()` 方法创建一个新的函数
* 在 `bind()` 被调用时
  * 这个新函数的 `this` 被指定为 `bind()` 的第一个参数
  * 其余参数将作为新函数的参数，供调用时使用

### bind-MDN实现

```js
Function.prototype.myBind = function() {
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

## call

### call-实现

思路，分三步：

```js
// 第一步：借方法
obj.fn = func
// 第二步：执行方法
obj.fn()
// 第三步：还方法
delete obj.fn
```

```js
Function.prototype.myCall = function (context) {
  // null => window
  var context = context || window;

  // 借方法
  // fn 可能已存在，此处严谨的写法是：uniqueName
  context.fn = this;

  // 取参数 - es5
  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  // 执行方法
  var result = eval('context.fn(' + args +')');

  // // 取参数 - es6
  // for (let i = 1, len = arguments.length; i < len; i++) {
  //   args.push(arguments[i]);
  // }
  // // 执行方法
  // var result = context.fn(...args);

  // 还方法
  delete context.fn;
  // 函数可以有返回值
  return result;
}
```

## apply

与 call 实现很相似，只需要考虑数参数。

```js
Function.prototype.myApply = function (context, arr) {
  // null => window
  var context = context || window;

  // 借方法
  // fn 可能已存在，此处严谨的写法是：uniqueName
  context.fn = this;

  var result;

  if (!arr) {
    result = context.fn();
  }
  else {
    // result = context.fn(...arr);
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  // 还方法
  delete context.fn;
  // 函数可以有返回值
  return result;
}
```

## Object.create

```js
Object.prototype.myCreate = function (obj) {
  function F () {};
  F.prototype = obj;
  return new F();
};
```

## new

### new做的事情

1. 创建一个空的简单JavaScript对象（即{}）
2. 链接该对象（即设置该对象的构造函数）到另一个对象
3. 将步骤1新创建的对象作为this的上下文
4. 如果该函数没有返回对象，则返回this

### new代码实现

```js
// myNew(Person, 'cxk', '18')

function myNew() {
  const obj = new Object();
  const Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}

// 2
function myNew() {
  //1.拿到传入的参数中的第一个参数，即构造函数名Func
  var Func = [].shift.call(arguments);
  //2.创建一个空对象obj,并让其继承Func.prototype
  var obj = Object.create(Func.prototype);
  //3.执行构造函数，并将this指向创建的空对象obj
  Func.apply(obj,arguments);
  //4.返回创建的对象obj
  return obj;
}
```

## instanceOf

```js
// 模拟 instanceof
function myInstanceof(L, R) {
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) {
      return false;
    }
    // 这里重点：当 O 严格等于 L 时，返回 true
    if (O === L) {
      return true;
    }

    L = L.__proto__;
  }
}
```
