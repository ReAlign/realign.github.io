---
view: post
layout: post
lang: zh-cn
author: realign
title: ES9 总结
description: ES9 总结
excerpt: ES9 总结
cover: true
coverConfig:
  - type: js
  - iconType: js
  - title: ECMAScript
  - subTitle: ES9
categories:
  - api
  - js
tags:
  - api
  - js
created_at: 2020-03-24 15:33
updated_at: 2020-03-24 16:17
meta:
  - name: keywords
    content: js,api
---

## Function

### Async-for-await

> [如何在 JS 循环中正确使用 async 与 await](https://www.jianshu.com/p/5b8c695474f0)

```js
var doSomething = (i) => {
  return new Promise(res => {
    setTimeout(() => {
      console.log(i);
      res();
    }, i * 1000);
  });
};
var doFinal = () => { console.log('final') };

// Error-1
async function process(array) {
  array.forEach(async i => {
    await doSomething(i);
  });
  doFinal();
}
process([1,2, 3]);

// Error-2
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
  doFinal();
}
process([1,2, 3]);

// Ok
async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
  doFinal();
}
process([1,2, 3]);
```
