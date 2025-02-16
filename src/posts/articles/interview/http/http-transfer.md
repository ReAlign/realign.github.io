---
view: post
layout: post
lang: zh-cn
author: realign
title: Http(4) - Transfer 传输
description: 此部分，会分析 http 层面数据的几种传输方式。
excerpt: 此部分，会分析 http 层面数据的几种传输方式。
cover: true
coverConfig:
  - type: http
  - iconType: http
  - title: Http
  - subTitle: Transfer
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
created_at: 2020-03-28 15:19
updated_at: 2020-03-28 17:15
meta:
  - name: keywords
    content: http, js, api, notes
---

## 概述

此部分，会分析 http 层面数据的几种传输方式。

## 定长数据传输

对于定长包体而言，发送端在传输的时候一般会带上 `Content-Length`, 来指明包体的长度。

### 正常设置长度

```js
// nodejs 模拟服务
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    const str = 'hello world!';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', str.length);
    res.write(str);
  }
});

server.listen(8084, () => {
  console.log('http://localhost:8084');
});
```

将上面的 `node` 代码本地跑起来，访问 [http://localhost:8084](http://localhost:8084)：

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585383018876-7458.png', alt: 'Content-Length normal' }" />

### 设置长度较实际小

试着将长度设置小一些：

```js
res.setHeader('Content-Length', str.length - 2);
```

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585383180656-9750.png', alt: 'Content-Length short' }" />

可以看到，在 http 的响应体中直接被截去了超出指定长度的部分。

### 设置长度较实际大

那要是将长度设置大一些呢？

```js
res.setHeader('Content-Length', str.length + 2);
```

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585383553186-9460.png', alt: 'CONTENT_LENGTH_MISMATCH' }" />

报错：内容长度不匹配

### 不显式设置长度

那要是不显式设置长度呢？

```js
// res.setHeader('Content-Length', str.length);
```

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585383710924-8224.png', alt: 'INCOMPLETE_CHUNKED_ENCODING' }" />

报错：不完整的分块编码

可见，`Content-Length` 对于 http 传输过程起到了十分关键的作用，如果设置不当可以直接导致传输失败。

## 不定长数据传输

对于不定长包体，是如何传输的呢？

```http
传输编码            分块
Transfer-Encoding: chunked
```

设置这个字段后会自动产生两个效果:

1. `Content-Length` 字段会被忽略
2. 基于长连接持续推送动态内容

看一个例子：

```js
// nodejs 模拟服务
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    // 设置长度，不会起作用
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('<p>预备</p>');
    setTimeout(() => {
      res.write('<li>第一次数据</li>');
    }, 1000);
    setTimeout(() => {
      res.write('<li>第二次数据</li>');
      res.end()
    }, 2000);
  }
});

server.listen(8084, () => {
  console.log('http://localhost:8084');
});
```

效果如下：

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-03-28/img-1585384676547-3386.gif', alt: 'chunked' }" />

## 大文件传输

对于大文件(100+ M、N+ G)来说，如果要一次性全部传输过来显然是不现实的，会有大量的等待时间，严重影响用户体验。

HTTP 针对这一场景，采取了 `范围请求` 的解决方案，允许客户端仅仅请求一个资源的一部分。

```http
# Server 需要先支持 非 none
接受范围        bytes[start-end] | none
Accept-Ranges: none

# Client
Range: bytes=0-9[, 30-39 ...]
```

### 单段数据

对于单段数据的请求，返回的响应如下：

```http
HTTP/1.1 206 Partial Content
Content-Length: 10
Accept-Ranges: bytes
Content-Range: bytes 0-9/100

i am xxxxx
```

值得注意的是 `Content-Range` 字段，0-9 表示请求的返回，100 表示资源的总大小，很好理解。

### 多段数据

多段请求得到的响应会是下面这个形式：

```http
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000010101
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000010101
Content-Type: text/plain
Content-Range: bytes 0-9/96

i am xxxxx
--00000010101
Content-Type: text/plain
Content-Range: bytes 20-29/96

eex jspy e
--00000010101--
```

这个时候出现了一个非常关键的字段：

* `Content-Type: multipart/byteranges; boundary=00000010101`

它代表了信息量是这样的:

* 请求一定是多段数据请求
* 响应体中的分隔符是 `00000010101`

因此，在响应体中各段数据之间会由这里指定的分隔符分开，而且在最后的分隔末尾添上 -- 表示结束。
以上就是 http 针对大文件传输所采用的手段。
