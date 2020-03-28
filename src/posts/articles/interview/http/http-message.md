---
view: post
layout: post
lang: zh-cn
author: realign
title: Http(2) - Message 报文
description: TCP 协议，在传输的时候分为两个部分：TCP头 和 数据。HTTP 类似，是 header + body 的结构
excerpt: TCP 协议，在传输的时候分为两个部分：TCP头 和 数据。HTTP 类似，是 header + body 的结构
cover: true
categories:
  - api
  - http
  - js
  - notes
tags:
  - api
  - http
  - js
  - notes
created_at: 2020-03-28 09:01
updated_at: 2020-03-28 11:52
meta:
  - name: keywords
    content: http, js, api, notes, message
---

## 概述

`TCP` 协议，在传输的时候分为两个部分：`TCP头` 和 `数据`。

HTTP 类似，是 `header` + `body` 的结构，具体:

```http
报文首部   + 空行    + 报文实体
[header] [(CR+LF)] [body]
```

### 说明

由于 `http` 的 `请求报文-requestMessage` 和 `响应报文-responseMessage` 是有区别的，因此下面每部分会同时将请求和响应分开介绍。

## 报文首部 - header

### 概览

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585333771780-1683.png', alt: 'http message' }" />
<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585334647656-1305.png', alt: 'http message request' }" />
<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585334650287-6346.png', alt: 'http message response' }" />

—— *配图来自《图解 HTTP》*

### 起始行 - 请求行

对应到请求报文的起始行：

```http
方法 路径  http版本
GET /home HTTP/1.1
```

### 起始行 - 状态行

对应到响应报文的起始行：

```http
http版本 状态码 状态码原因短语
HTTP/1.1 200 OK
```

### 起始行 - 注解

需要注意的是，在起始行中：

1. 每两个部分之间用空格隔开
2. 最后一个部分后面应该接一个换行，严格遵循 [🔗ABNF](https://baike.baidu.com/item/%E6%89%A9%E5%85%85%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F) 语法规范

### 首部字段

[暂 略]

## 空行 - (CR+LF)

看名称觉得可有可无，但是实际很重要，空行用来区分开头部和实体。

如果说在头部中间故意加一个空行，那么空行后的内容全部被视为实体，会引发解析异常。

## 报文实体 - body

[暂 略]
