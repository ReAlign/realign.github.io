---
view: post
layout: post
lang: zh-cn
author: realign
title: Http(5) - Https 安全协议
description: 1
excerpt: 2
cover: true
categories:
  - http
  - js
  - notes
tags:
  - http
  - js
  - notes
created_at: 2020-03-30 18:57
updated_at: 2020-03-30 18:57
meta:
  - name: keywords
    content: http, js, https, notes
---

## Https 的产生

> 一个新技术的出现必定是为了解决某种问题的。

那么 HTTPS 解决了 HTTP 的什么问题呢？

### Http 的不足

HTTP 是不安全的。

1. HTTP 是明文传输的
    * 在 HTTP 的传输过程中，任何人都有可能从中截获、修改或者伪造请求发送
2. HTTP 传输过程中，不会验证通信方的身份
    * 因此 HTTP 信息交换的双方可能会遭到伪装，也就是没有用户验证
3. HTTP 传输过程中，接收方和发送方并不会验证报文的完整性

综上，HTTPS 应运而生。

## 什么是 Https

HTTPS（全称：Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的 HTTP 通道，在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性。

* HTTPS 在 HTTP 的基础下加入SSL 层，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL
* HTTPS 存在不同于 HTTP 的默认端口及一个加密/身份验证层（在 HTTP与 TCP 之间）。这个系统提供了身份验证与加密通讯方法
* HTTPS 是 HTTP 协议的一种扩展，它本身并不保证传输的安全性
* HTTPS 使用传输层安全性(TLS)或安全套接字层(SSL)对通信协议进行加密
* HTTPS = HTTP + SSL(TLS)

### Https 做了啥

* 加密(Encryption)
  * HTTPS 通过对数据加密来使其免受窃听者对数据的监听，这就意味着当用户在浏览网站时，没有人能够监听他和网站之间的信息交换，或者跟踪用户的活动，访问记录等，从而窃取用户信息。
* 数据一致性(Data integrity)
  * 数据在传输的过程中不会被窃听者所修改，用户发送的数据会完整的传输到服务端，保证用户发的是什么，服务器接收的就是什么。
* 身份认证(Authentication)
  * 是指确认对方的真实身份，也就是证明你是你（可以比作人脸识别），它可以防止中间人攻击并建立用户信任。

##