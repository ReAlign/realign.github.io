---
view: post
layout: post
lang: zh-cn
author: realign
title: Http(1) - Methods
description: Http(1) - Methods
excerpt: Http(1) - Methods
cover: true
categories:
  - api
  - http
  - notes
tags:
  - api
  - http
  - notes
created_at: 2020-03-26 01:00
updated_at: 2020-03-26 01:00
meta:
  - name: keywords
    content: http, api, notes
---

## 概述

HTTP 定义了一组请求方法，以表明要对给定资源执行的操作。指示针对给定资源要执行的期望动作。虽然他们也可以是名词，但这些请求方法有时被称为 HTTP 动词。
每一个请求方法都实现了不同的语义，但一些共同的特征由一组共享，例如：一个请求方法可以是 safe、idempotent 或 cacheable。

### HTTP 1.0

`GET`、`HEAD`、`POST`

### HTTP 1.1

`PUT`、`DELETE`、`CONNECT`、`OPTIONS`、`TRACE`、`PATCH`

## 作用

### GET

请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据

### HEAD

请求一个与 GET 请求的响应相同的响应，但没有响应体

> 一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源

### POST

用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用

### PUT

请求有效载荷替换目标资源的所有当前表示

### DELETE

删除指定的资源

### CONNECT

建立一个到由目标资源标识的服务器的隧道

### OPTIONS

描述目标资源的通信选项

### TRACE

沿着到目标资源的路径执行一个消息环回测试

### PATCH

对资源应用部分修改

### 整体比较

|     | 请求是否有主体 | 成功的响应是否有主体 | 安全 | 幂等 | 可缓存 | HTML 表单 是否支持 |
| --- | ------------ | ---------------- | ---- | --- | ----- | ---------------- |
| GET     | ❌       | ⭕️               | ⭕️   | ⭕️ | ⭕️     | ⭕️              |
| HEAD    | ❌       | ❌               | ⭕️   | ⭕️ | ⭕️     | ❌              |
| POST    | ⭕️       | ⭕️               | ❌   | ❌ | Only if <br>freshness <br>information <br>is included | ⭕️ |
| PUT     | ⭕️       | ❌               | ❌   | ⭕️ | ❌     | ❌              |
| DELETE  | May      | May              | ❌   | ⭕️ | ❌     | ❌              |
| CONNECT | ❌       | ⭕️               | ❌   | ❌ | ❌     | ❌              |
| OPTIONS | ❌       | ⭕️               | ⭕️   | ⭕️ | ❌     | ❌              |
| TRACE   | ❌       | ❌               | ❌   | ⭕️ | ❌     | ❌              |
| PATCH   | ⭕️       | ⭕️               | ❌   | ❌ | ❌     | ❌              |

## 一些常见的比较

### GET-POST

* 数据传输方式不同
  * GET请求通过URL传输数据，而POST的数据通过请求体传输。
* 安全性不同
  * POST的数据因为在请求主体内，所以有一定的安全性保证，而GET的数据在URL中，通过历史记录，缓存很容易查到数据信息。
* 数据类型不同
  * GET只允许 ASCII 字符，而POST无限制
* GET无害
  * 刷新、后退等浏览器操作GET请求是无害的，POST可能重复提交表单
* 特性不同
  * GET是安全（这里的安全是指只读特性，就是使用这个方法不会引起服务器状态变化）且幂等（幂等的概念是指同一个请求方法执行多次和仅执行一次的效果完全相同），而POST是非安全非幂等

### PUT-POST

> 都是给服务器发送新增资源

PUT 和POST方法的区别是：PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用），而POST方法是非幂等的。

除此之外还有一个区别，通常情况下，PUT的URI指向是具体单一资源，而POST可以指向资源集合。

举个例子，我们在开发一个博客系统，当我们要创建一篇文章的时候往往用POST https://www.jianshu.com/articles，这个请求的语义是，在articles的资源集合下创建一篇新的文章，如果我们多次提交这个请求会创建多个文章，这是非幂等的。

而PUT https://www.jianshu.com/articles/820357430的语义是更新对应文章下的资源（比如修改作者名称等），这个URI指向的就是单一资源，而且是幂等的，比如你把『刘德华』修改成『蔡徐坤』，提交多少次都是修改成『蔡徐坤』

### PUT-PATCH

> 都是给服务器发送修改资源

PUT和PATCH都是更新资源，而PATCH用来对已知资源进行局部更新。

比如我们有一篇文章的地址https://www.jianshu.com/articles/820357430,这篇文章的可以表示为:

```js
article = {
  author: 'dxy',
  creationDate: '2019-6-12',
  content: '我写文章像蔡徐坤',
  id: 820357430
}
```

当我们要修改文章的作者时，我们可以直接发送PUT https://www.jianshu.com/articles/820357430，这个时候的数据应该是:

```js
{
  author:'蔡徐坤',
  creationDate: '2019-6-12',
  content: '我写文章像蔡徐坤',
  id: 820357430
}
```

这种直接覆盖资源的修改方式应该用put，但是你觉得每次都带有这么多无用的信息，那么可以发送PATCH https://www.jianshu.com/articles/820357430，这个时候只需要:

```js
{
  author:'蔡徐坤',
}
```
