---
view: post
layout: post
lang: zh-cn
author: realign
title: 手写代码(2)-深拷贝
description: 深拷贝
excerpt: 深拷贝
cover: true
categories:
  - coding
  - js
tags:
  - coding
  - js
created_at: 2020-03-29 03:29
updated_at: 2020-03-29 03:29
meta:
  - name: keywords
    content: coding, js, deep-clone
---

## 概述

深拷贝：将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

## 说明

### 测试用数据

```js
const testData = {
  name: "xxx",
  book: {
    title: "You Don't Know JS",
    price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123
};
```

### 功能函数

```js
const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase();

const isSimple = o => {
  const t = typeOf(o);

  return t === 'undefined'
    || t === 'null'
    || t === 'string'
    || t === 'number'
    || t === 'boolean';
};
```

## 一行代码-库函数版本

```js
JSON.parse(JSON.stringify());
```

简单，就一行代码，可以应对大部分的简单数据应用场景。

但是它还是有很多缺陷，比如：

* 拷贝其他引用类型
* 拷贝函数
* 循环引用
* 等

## 基础版本

解决处理了：

1. 简单数据直接返回
2. 数组和对象的区分处理
3. 多层级数据-递归

```js
function deepClone(target) {
  // isSimple => 判断是否是简单数据类型，略
  if(isSimple(target)) {
    return target;
  } else {
    const isArr = Array.isArray(target);
    let cloneTarget = isArr ? [] : {};
    const loopArr = isArr
      ? Array.from(new Array(target.length).keys())
      : Object.keys(target);

    loopArr.forEach(key => {
      cloneTarget[key] = deepClone(target[key]);
    });

    return cloneTarget;
  }

  return cloneTarObj;
}
```

## 解决循环引用版本

有这样的数据：

```js
const target = {
  x: 'x',
  age: 18,
  tags: ['a', 'b']
};
target.target = target;
```

对象存在循环引用的情况，对象的属性间接或直接的引用了自身。

解决方案很简单，其实就是循环检测当前对象是否已拷贝过。

我们设置一个哈希表存储已拷贝过的对象，当检测到当前对象已存在于哈希表中时，取出该值并返回即可。

但是，哈希表存储的 `key` 是个引用类型数据，所以哈希表本身不能是 `Object`，得是 `Map`。

于是，新一版的如下：

```js
function deepClone(target, hashMap = new Map()) {
  // isSimple => 判断是否是简单数据类型，略
  if(isSimple(target)) {
    return target;
  } else {
    const isArr = Array.isArray(target);
    let cloneTarget = isArr ? [] : {};

    if (hashMap.get(target)) {
      return hashMap.get(target);
    }
    hashMap.set(target, cloneTarget);

    const loopArr = isArr
      ? Array.from(new Array(target.length).keys())
      : Object.keys(target);

    loopArr.forEach(key => {
      cloneTarget[key] = deepClone(target[key], hashMap);
    });

    return cloneTarget;
  }

  return cloneTarObj;
}
```

## 其他数据类型

* 可继续遍历类型
* 不可继续遍历类型
* 函数
* Buffer

[暂 略]
