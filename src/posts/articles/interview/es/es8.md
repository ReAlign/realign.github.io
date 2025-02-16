---
view: post
layout: post
lang: zh-cn
author: realign
title: ES8 总结
description: ES8 总结
excerpt: ES8 总结
cover: true
coverConfig:
  - type: js
  - iconType: js
  - title: ECMAScript
  - subTitle: ES8
categories:
  - api
  - js
tags:
  - api
  - js
created_at: 2020-03-23 10:32
updated_at: 2020-03-23 10:43
meta:
  - name: keywords
    content: js,api
---

## Function

### Async/Await

> Promise 的终极形态

```js
async function business() {
  const middle = await getMiddle();
  const result = await getResult();
}
```

### 函数参数结尾允许逗号

方便使用 `git` 等进行多人协作开发时修改同一个函数减少不必要的行变更。

```js
function process(a, b, ) {
  // do something
}
```

## Object

### Object.values()

```js
/**
 * @name    Object.values
 * @desc    返回 Object 自身所有属性的值的数组，不包括继承的值。
 * @params  {Object}
 * @returns {Array}
 */

const obj = { a: 1, b: 2, c: 3, };

// analogy

// es5
Object.keys(obj).map(key=>obj[key]); // => [1, 2, 3]

// es8
Object.values(obj); // => [1, 2, 3]
```

### Object.entries()

```js
/**
 * @name    Object.entries
 * @desc    返回一个给定对象自身可枚举属性的键值对的数组
 * @params  {Object}
 * @returns {Array}   [[k1, v2], [k2, v2], ...]
 */

const obj = { a: 1, b: 2, c: 3, };

// analogy

// es6
Object.keys(obj).forEach(k => {
  console.log(`key: ${k}, value: ${obj[k]}`);
})
// key: "a", value: 1
// key: "b", value: 2
// key: "c", value: 3

// es8
for(let [k, v] of Object.entries(obj)) {
  console.log(`key: ${k}, value: ${v}`);
}
// key: "a", value: 1
// key: "b", value: 2
// key: "c", value: 3
```

### Object.getOwnPropertyDescriptors()

```js
/**
 * @name    Object.getOwnPropertyDescriptors
 * @desc    获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。
 * @params  {Object}
 * @returns {Object}
 */

const obj = {
  name: 'ReAlign',
  get age() {
    return 18;
  }
};

Object.getOwnPropertyDescriptors(obj);

// return is:
const returns = {
  name: {
    value: "ReAlign",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  age: {
    get: ƒ age(),
    set: undefined,
    enumerable: true,
    configurable: true,
  }
}
```

### SharedArrayBuffer

> SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象，它们都可以用来在共享内存（shared memory）上创建视图。与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。

详情，暂时略。

### Atomics

> Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。
>
> 可以用来检测当前系统是否支持硬件级的原子操作。对于指定大小的数组，如果当前系统支持硬件级的原子操作，则返回 true；否则就意味着对于该数组，Atomics 对象中的各原子操作都只能用锁来实现。此函数面向的是技术专家。

详情，暂时略。

## String

### String.padStart()

```js
/**
 * @name    String.padStart
 * @desc    将空字符串或其他字符串添加到原始字符串的开头
 *            不会改变原字符串
 * @params  targetLength    当前字符串需要填充到的目标长度
 *            如果这个数值小于当前字符串的长度，则返回当前字符串本身
 * @params  padString       (可选)填充字符串
 *            如果字符串太长，使填充后的字符串长度超过了目标长度
 *            则只保留最左侧的部分，其他部分会被截断
 *            此参数的缺省值为 " "
 * @returns {String}
 */

'0.0'.padStart(10, '-'); // "-------0.0"
'0.0'.padStart(4, '10'); // "10.0"
```

### String.padEnd()

```js
/**
 * @name    String.padEnd
 * @desc    将空字符串或其他字符串添加到原始字符串的结尾
 *            不会改变原字符串
 * @params  targetLength    当前字符串需要填充到的目标长度
 *            如果这个数值小于当前字符串的长度，则返回当前字符串本身
 * @params  padString       (可选)填充字符串
 *            如果字符串太长，使填充后的字符串长度超过了目标长度
 *            则只保留最左侧的部分，其他部分会被截断
 *            此参数的缺省值为 " "
 * @returns {String}
 */

'0.0'.padEnd(10, '-'); // "0.0-------"
'0.0'.padEnd(4, '10'); // "0.01"
```
