---
view: post
layout: post
lang: zh-cn
author: realign
title: ES7 总结
description: ES7 总结
excerpt: ES7 总结
cover: true
coverConfig:
  - type: js
  - iconType: js
  - title: ECMAScript
  - subTitle: ES7
categories:
  - api
  - js
tags:
  - api
  - js
created_at: 2020-03-21 15:03
updated_at: 2020-03-21 15:03
meta:
  - name: keywords
    content: js,api
---

## Array

### Array.prototype.includes()

```js
/**
 * @name    Array.prototype.includes
 * @desc    查找某个值是否存在于数组
 * @params  {*}
 * @returns {Boolean}
 */

const arr = [1, 2, 3];
const x = 2;

// analogy

// es5
arr.indexOf(x) !== 0 // => true

// es7
arr.includes(x) // => true

// special

// es5
[NaN].indexOf(NaN) !== 0 // => false

// es7
[NaN].includes(NaN) // => true
```

## Number

### 指数运算符 \*\*

`**`，与 `Math.pow()` 等效的计算效果。

```js
// es5
Math.pow(2, 3) // => 8

// es7
2 ** 3 // => 8
```
