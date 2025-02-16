---
view: post
layout: post
lang: zh-cn
author: realign
title: Fetch:一些知识点【更新中】
description: Fetch:一些知识点
excerpt: Fetch:一些知识点
cover: true
coverConfig:
  - type: js
  - iconType: js
  - title: Fetch
  - subTitle: Some features
categories:
  - api
  - js
tags:
  - api
  - js
created_at: 2020-02-15 16:35
updated_at: 2020-02-15 17:51
meta:
  - name: keywords
    content: fetch js api
---

## 异步请求的来源

> 页面局部刷新 | 数据更新、用户无感知

基于这个要求，就需要有一种技术，来实现不刷新页面来更新数据。

从有了 `IE5` 之后，局部更新数据是通过 `XMLHttpRequest`（即：`XHR`）实现的。

不久普遍使用之后，有了一个特定的名字：**A**synchronous **J**avaScript **A**nd **X**ML，缩写为：`AJAX`。

## XHR 的简单示例

一个使用原生对象实现的请求过程

```js
// 新建
var xhr = new XMLHttpRequest();

// 状态发生变化时，函数被回调
xhr.onreadystatechange = function () {
    // 成功完成
    if (xhr.readyState === 4) {
        // 响应结果
        if (xhr.status === 200) {
            // 成功
            return success(xhr.responseText);
        } else {
            // 失败
            return fail(xhr.status);
        }
    } else {
        // Loading...
    }
}

// 发送
xhr.open('GET', '/api/...');
xhr.send();
```

## 比较通用的封装

这种基于原生对象的实现，一般不需要自己从原生去实现，都会有通用的封装出来。

### jQuery.ajax()

`jQuery` 对 `XHR` 的封装，具体：[jQuery 参考手册 - Ajax](https://www.w3school.com.cn/jquery/jquery_ref_ajax.asp)

### Axios()

`Axios` 是基于 `Promise` 对 `XHR` 的封装，具体：[Axios - Promise based HTTP client for the browser and node.js](https://github.com/axios/axios)

### Fetch()

`Fetch` 是基于 `Promise` 全新实现的异步网络请求的标准方法。

## Fetch

`Fetch` 是基于 `Promise` 全新实现的异步网络请求的标准方法。

### 基本使用

fetch(url)

```js
fetch(`${url}`)
```

### 通用处理

fetch( ***Request()*** ).then( ***Response()*** ).then( ***ResolveFn()*** )

* [***🔗 Request()***](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)
* [***🔗 Response()***](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

```js
fetch(`${url}`, {})
    .then(response => response.json())
    .then(data => console.log(data))
```

### 常规特性/配置

省略...

### 特殊用法 - 取消请求

在 `Fetch` 刚问世的几年内，是没有办法取消一个已经发出的请求的。

自从浏览器支持了 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController)，取消 `Fetch` 变成可能了。

一个完整的例子：[abort-api/fetchVideo](https://github.com/mdn/dom-examples/blob/master/abort-api/index.html#L66)

简单实现下：

```js
const AC = new AbortController()

const signal = AC.signal;

fetch(`${url}`, { signal, ... })
```

### 一些缺点

1. `fetch` 只对网络请求报错
    * 对 400、500 都当做成功的请求
    * 服务器返回 400、500 错误码时并不会 `reject`，只有网络错误才会被 `reject`
    * 需要在 `Response` 的时候自己实现 `response-status` 的判断
2. `fetch` 默认不会带 `cookie`，需要添加配置
    * fetch(url, {credentials: 'include'})
3. ~~`fetch`不支持 `abort`~~
    * `AbortController` 已经在草案中，除 `IE` 外，其他主流浏览器均支持
4. `fetch` 无法监测请求的进度
