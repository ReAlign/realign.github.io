---
view: post
layout: post
lang: zh-cn
author: realign
title: 函数柯里化
description: 函数柯里化
excerpt: 函数柯里化
cover: true
categories:
  - js
tags:
  - js
created_at: 2020-04-15 23:53
updated_at: 2020-04-15 23:53
meta:
  - name: keywords
    content: js
---

## 概述

### 柯里化

> 参考：[百度百科-柯里化](https://baike.baidu.com/item/%E6%9F%AF%E9%87%8C%E5%8C%96/10350525)

在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术

### 简单例子

```js
function multiply(x, y, z) {
  return x * y * z;
}

function curryingMultiply(x) {
  return (y) => {
    return (z) => {
      return x * y * z;
    };
  };
}

const es6CM = x => y => z => x * y * z;

multiply(2, 3, 4);          // 24
curryingMultiply(2)(3)(4);  // 24
es6CM(2)(3)(4);             // 24
```

## 柯里化的作用

柯里化函数在使用上更为简洁，可以帮助你更好的处理和抽象代码的逻辑。

参考加法函数 add 的特点，如果每次一传参都是一个流程的执行，那么实现一个柯里化方法，在调用时就很清晰的显示的流程执行的顺序。

根据柯里化的特点，被总结出了如下几个主要作用/优点：

* 参数复用
* 延迟计算/运行

### 参数复用

> 利用柯里化，我们可以固定住其中的部分参数，在调用时这个参数就不需要再次传递。

```js
function locationCPC(country) {
  return (province) => {
    return (city) => {
      return `${country}-${province}-${city}!`;
    };
  };
}
const China = locationCPC('中国');
const ZJ = China('浙江');
const GS = China('甘肃');

ZJ('杭州'); // 中国-浙江-杭州
GS('天水'); // 中国-甘肃-天水
```

## 如何柯里化

### 参数任意的柯里化函数实现

对于这个需求，从执行效果来看：

1. 当后续还有参数时，函数返回值应当是一个函数
2. 当后续没有了参数时，函数返回值应当是一个值

问题转化为：

* 如何能够让函数返回值既可以作为函数继续传参执行，又可以在取值时输出为值

解决了这个，那么任意参数的柯里化就解决了~

### 延迟计算/运行

> 使用通用的实现 currying 方法来实现加法函数，即可看到延迟计算的效果。

同样是上面的例子，没有最后执行到「市」参数的时候，前面的「国」「省」是不会拼接到一起的。

再往上看例子，3 个数据相乘，没有收到第三个参数的时候，是不会计算前两个相乘的结果的。

## 参考

* [javaScript 中的函数柯里化(Currying)简述](https://lzw.me/a/javascript-currying.html)
* [[翻译]JavaScript中的柯里化（Currying in JavaScript）](https://baijiahao.baidu.com/s?id=1616921113794110190&wfr=spider&for=pc)
* [详解JS函数柯里化](https://www.jianshu.com/p/2975c25e4d71)
* [高级函数技巧-函数柯里化](https://segmentfault.com/a/1190000018265172)
