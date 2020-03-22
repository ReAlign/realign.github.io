---
view: post
layout: post
lang: zh-cn
author: realign
title: 判断浏览器的行为:关闭和刷新
description: 判断浏览器的行为:关闭和刷新
excerpt: 判断浏览器的行为:关闭和刷新
cover: true
categories:
  - js
  - node
tags:
  - js
  - notes
created_at: 2020-01-04 21:55
updated_at: 2020-01-04 21:55
meta:
  - name: keywords
    content: js,browser,close,refresh,behavior
---

先抛问题：

> 产品经理：技术小哥，我有个小需求，在用户退出我们页面的时候，做个【XXXXX】

## 分析

这个需求，翻译成技术能听得懂的话就是：在页面

## 流程分析

### 加载

```js
onload();
```

### 关闭

```js
onunload();
```

### 三级标题

当弹出浏览器级别的提示时，去点击「重新加载」或者「取消」，这时候浏览器的body失焦了，这时候定义的一切浏览器方法都失效了，只有再次点击让body获得焦点，才会继续执行所定义的方法。

[js可以区分刷新和关闭吗？](https://q.cnblogs.com/q/112946/)

[Check if page gets reloaded or refreshed in JavaScript](https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript)

[基于JavaScript判断浏览器到底是关闭还是刷新(超准确)](https://www.jb51.net/article/78977.htm)

[关闭窗口时onunload和onbeforeunload不起作用的解决办法](https://blog.csdn.net/wls666/article/details/89282244)

【未完待续】
