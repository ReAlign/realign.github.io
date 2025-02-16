---
view: post
layout: post
lang: zh-cn
author: realign
title: 浏览器之从url到页面
description: 浏览器之从url到页面
excerpt: 浏览器之从url到页面
cover: true
coverConfig:
  - type: browser
  - iconType: browser
  - title: Browser
  - subTitle: URL <- - -> Screen
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

1. URL 解析
2. DNS 解析
3. 发起 TCP 连接
4. 发送 HTTP 请求
5. 服务器处理请求并返回 HTTP 报文
6. 浏览器解析渲染页面
7. 连接结束

每个过程简单分析如下：

1. URL 解析

- 地址解析
  - 判断输入的是一个合法的 URL 还是一个待搜索的关键词
  - 并且根据你输入的内容进行自动完成、字符编码等操作
- HSTS
  - 由于安全隐患，会使用 HSTS 强制客户端使用 HTTPS 访问页面
- 其他操作
  - 安全检查、访问限制【国内~】
- 缓存检查
  - (Expires + cache-control / if-xxx)

2. DNS 解析

- 大致步骤是
  - browser -> OS -> router -> ISP -> RootDomain
  - DNS 劫持
    - DNS 劫持就是 dns 系统被入侵或人为的修改某些记录,如 A 记录,用专业的术语来讲就是通过某些手段取得某域名的解析记录控制权，进而修改此域名的解析结果，导致对该域名的访问由原 IP 地址转入到修改后的指定 IP，其结果就是对特定的网址不能访问或访问的是假网址。
    - DNS 污染的原理: 现行标准中 DNS 查询通常使用 UDP 协议并且没有任何验证机制，并且根据惯例查询者会接受第一个返回的结果而抛弃之后的。因此只需监控 53 端口（DNS 标准端口）的 UDP 查询数据报并分析，一旦发现敏感查询，则抢先向查询者返回一个伪造的错误结果，从而实现 DNS 污染。 DNS 污染并无法阻止正确的 DNS 解析结果返回，但由于旁路产生的数据包发回的速度较国外 DNS 服务器发回的快，操作系统认为第一个收到的数据包就是返回结果，从而忽略其后收到的数据包，从而使得 DNS 污染得逞。
  - dns-prefetch 优化
    - `<meta http-equiv="x-dns-prefetch-control" content="on">`
    - `<link rel="dns-prefetch" href="//www.zhix.net">`

3. 发起 TCP 连接
4. 发送 HTTP 请求
5. 服务器处理请求并返回 HTTP 报文
6. 浏览器解析渲染页面
7. 连接结束

## 参考

- [在浏览器输入 URL 回车之后发生了什么（超详细版）](https://zhuanlan.zhihu.com/p/80551769)
- [史上最详细的经典面试题 从输入 URL 到看到页面发生了什么？](https://juejin.im/post/5cc573c85188252e741ccbb6)
- [从输入 URL 到页面加载的过程？如何由一道题完善自己的前端知识体系！](https://zhuanlan.zhihu.com/p/34453198?group_id=957277540147056640)
- [【前端词典】从输入 URL 到展现涉及哪些缓存环节(非常详细)](https://juejin.im/post/5c6e77da6fb9a049db73bb07)
