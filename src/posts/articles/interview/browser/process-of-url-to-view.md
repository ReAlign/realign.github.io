---
view: post
layout: post
lang: zh-cn
author: realign
title: 浏览器之从url到页面
description: 浏览器之从url到页面
excerpt: 浏览器之从url到页面
cover: true
categories:
  - css
  - framework
  - http
  - js
  - notes
tags:
  - css
  - framework
  - http
  - js
  - notes
created_at: 2020-04-28 10:49
updated_at: 2020-04-28 10:49
meta:
  - name: keywords
    content: url, view, js, framework
---

## 概述

这是一个经典问题，先总结下，大致经历了以下过程：

* URL 解析
  * 地址解析
    * 判断输入的是一个合法的 URL 还是一个待搜索的关键词
    * 并且根据你输入的内容进行自动完成、字符编码等操作
  * HSTS
    * 由于安全隐患，会使用 HSTS 强制客户端使用 HTTPS 访问页面
  * 其他操作
    * 安全检查、访问限制【国内~】
  * 缓存检查
    * ~
* DNS 解析
  * 大致步骤是
    * browser -> OS -> router -> ISP -> RootDomain
* 发起 TCP 连接
* 发送HTTP请求
* 服务器处理请求并返回HTTP报文
* 浏览器解析渲染页面
* 连接结束

## 参考

* [在浏览器输入 URL 回车之后发生了什么（超详细版）](https://zhuanlan.zhihu.com/p/80551769)
* [史上最详细的经典面试题 从输入URL到看到页面发生了什么？](https://juejin.im/post/5cc573c85188252e741ccbb6)
* [从输入URL到页面加载的过程？如何由一道题完善自己的前端知识体系！](https://zhuanlan.zhihu.com/p/34453198?group_id=957277540147056640)
* [【前端词典】从输入 URL 到展现涉及哪些缓存环节(非常详细)](https://juejin.im/post/5c6e77da6fb9a049db73bb07)
