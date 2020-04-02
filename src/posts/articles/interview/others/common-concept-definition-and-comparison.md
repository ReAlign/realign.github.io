---
view: post
layout: post
lang: zh-cn
author: realign
title: 常见概念定义以及对比
description: 常见概念定义以及对比
excerpt: 常见概念定义以及对比
cover: true
categories:
  - api
  - js
  - css
tags:
  - api
  - js
  - css
created_at: 2020-04-02 14:43
updated_at: 2020-04-02 16:41
meta:
  - name: keywords
    content: js, css, api, 常见概念, 概念对比
---

## call-apply-bind

一句话：都是为了改变某个函数运行时的上下文（context）而存在的。

### call-apply-bind相似点

1. 都是用来改变函数体 this 的指向
2. 第一个参数都是 this 要指向的对象
3. 都可以利用后续参数传参

### call-apply-bind不同点

一个通用的例子：

```js
const X = {
    name: 'xxx',
    gender: 'male',
    age : 18,
    say() {
        console.log(`${this.name}, ${this.gender}, ${this.age} years old.`);
    },
};
```

对于 `X` 的 `say` 方法，执行接入如下：

```js
X.say(); // xxx, male, 18 years old.
```

现在有个 `Y`，定义如下：

```js
const Y = {
    name: 'yyy',
    gender: 'female',
    age: 16,
};
```

那，如何复用 `X` 的 `say` 方法来显示 `Y` 的数据呢？

```js
// call
X.say.call(Y); // yyy, female, 16 years old.

// apply
X.say.apply(Y); // yyy, female, 16 years old.

// bind
X.say.bind(Y)(); // yyy, female, 16 years old.

// bind
X.say.bind(Y); //
```

直接写 `X.say.bind(Y)` 是不会有任何结果的！！！

看到区别了吗？

* `call` 和 `apply` 都是对函数的直接调用
* `bind` 返回的仍然是一个函数，需要显式调用

把通用例子稍改写一下：

```js
const X = {
    name: 'xxx',
    gender: 'male',
    age : 18,
    say(food, sport) {
        console.log(`${this.name}, ${this.gender}, ${this.age} years old.
Like to eat ${food} and ${sport}.`);
    },
};
```

同样，`Y` 复用 `X` 的 `say` 方法：

```js
// call
X.say.call(Y, 'noodles', 'running');
// yyy, female, 16 years old.
// Like to eat noodles and running.

// apply
X.say.apply(Y, ['noodles', 'running']);
// yyy, female, 16 years old.
// Like to eat noodles and running.

// bind
X.say.bind(Y)('noodles', 'running');
// yyy, female, 16 years old.
// Like to eat noodles and running.
```

例子很清楚了，`call` 和 `apply` 的区别也就有了：

* `call` 的非第一个参数，与 `say` 方法的参数是一一对应的
* `apply` 的第二个参数是一个数组，数组的元素是和 `say` 方法中一一对应的
* `bind`返回的是一个函数，正常函数传参即可
