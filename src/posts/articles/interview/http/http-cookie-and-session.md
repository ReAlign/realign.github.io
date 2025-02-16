---
view: post
layout: post
lang: zh-cn
author: realign
title: Http(6) - Cookie and Session
description: http 的 cookie 和 session 的区别、实现
excerpt: http 的 cookie 和 session 的区别、实现
cover: true
coverConfig:
  - type: http
  - iconType: http
  - title: HTTP
  - subTitle: Cookie & Session
categories:
  - http
  - js
  - notes
tags:
  - http
  - js
  - notes
created_at: 2020-10-28 11:27
updated_at: 2020-10-28 11:27
meta:
  - name: keywords
    content: http, cookie, session
---

## 高度总结性对比

- `session` 是一个抽象概念。
  - 开发者为了实现中断和继续等操作，将 `user agent` 和 `server` 之间一对一的交互，抽象为 `会话`，进而衍生出 `会话状态`，也就是 `session` 的概念。
- `cookie` 是一个实际存在的东西。
  - `cookie` 是 `http` 协议中定义在 `header` 中的字段，可以认为是 `session` 的一种后端无状态实现。
  - 而我们今天常说的 `session`，是为了绕开 `cookie` 的各种限制，通常借助 `cookie` 本身和后端存储实现的，一种更高级的会话状态实现。
- 所以 `cookie` 和 `session`，你可以认为是同一层次的概念，也可以认为是不同层次的概念。
- 具体到实现，`session` 因为依赖 `session id`，通常要借助 `cookie` 实现，但这并非必要，只能说是通用性较好的一种实现方案。

## 其他

- [参考 1](https://www.cnblogs.com/l199616j/p/11195667.html)
- [参考 2](https://www.zhihu.com/question/19786827/answer/84540780)
