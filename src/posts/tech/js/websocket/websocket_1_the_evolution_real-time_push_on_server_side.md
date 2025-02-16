---
view: post
layout: post
lang: zh-cn
author: realign
title: WebSocket(1):服务端实时“推送”的演变
description: 从轮询讲起，了解服务端推送的历史演变进程
excerpt: 从轮询讲起，了解服务端推送的历史演变进程
cover: true
coverConfig:
  - type: http
  - iconType: http
  - title: Websocket
  - subTitle: Server-Push History
categories:
  - js
  - websocket
tags:
  - js
  - websocket
  - push
  - server side push
created_at: 2019-08-05 09:30
updated_at: 2019-08-05 09:30
meta:
  - name: keywords
    content: websocket, socket, push, server side push, SSE
---

> 任何事物的演变，都是为了解决无法满足的需求，或者更好地满足需求。

## 引子

**一个都能看懂的日常：**

1. （僵硬、重复、无聊...的）日常：画页面、发请求拿数据、写逻辑处理数据、发请求更新数据、...
2. 突然有一天：
   - “这个请求你不一定能拿到数据，多发几次拿数据的请求吧，拿到数据算”
   - “为啥不一定能拿到数据？”
   - “处理数据很慢，我也不知道啥时候处理完”
   - “好吧，那我循环发请求吧”
3. 然后，（僵硬、重复、无聊...的）日常各自码代码
4. 突然，（内心深处挣扎了一下）觉得循环发请求太 low，想着怎么有 big 一些
5. 然后，\*\* 了一下，发现实现这个需求有好几种方式，然后就凌乱了...

- 轮询
- 长轮询
- 长连接 Streaming
  - iframe
  - htmlfile
  - multi-part
  - Flash Socket
- 服务端发送事件 SSE
- WebSocket

😭，我该怎么办？？？

## 演变过程

> 1、一趟一趟跑

### 轮询（Polling）

- C：有数据了没？（第 1 趟）
- S：没
- C：有数据了没？（第 2 趟）
- S：没
- ...
- C：（喘气.jpg）有数据了没？（第 n 趟）
- S：（黑脸.jpg）没~
- ...
- C：（生无可恋.jpg）有数据了没？（第 n+m 趟）
- S：有了，给你给你

<lazy-load tag="img" :data="{ src: 'https://kaola-haitao.oss.kaolacdn.com/9416731d-e770-476a-a637-e1024ba8a779_1466_1566.png', alt: 'polling', style: { maxWidth: '700px'} }" />

---

> 2、跑过去等一会儿，万一拿到了呢，少跑一趟是一趟

### 长轮询（Long-Polling）

- C：有数据了没？（第 1 趟）
- S：没
- C：我等会吧，你快点
- S：好
- ...
- S：我们要打烊了，你先走吧，明天再来
- C：（MMP.jpg）好吧
- ...
- C：有数据了没？（第 n 趟）
- S：有了，给你给你

<lazy-load tag="img" :data="{ src: 'https://kaola-haitao.oss.kaolacdn.com/4b5584a3-45eb-4fa8-8807-da220166483a_1490_1630.png', alt: 'Long-Polling', style: { maxWidth: '700px'} }" />

---

> 3、跑过去预定，天黑前，还有新数据的话，让伙计送过来吧

### 长连接 Streaming / 服务端发送事件 EventSource

> 长连接 Streaming：iframe/htmlfile/multi-part/Flash Socket
>
> 服务端发送事件 EventSource：SSE（Server Sent Events）

- C：我预定下今天的数据。有数据没？
- S：没
- C：好，天黑前，有新数据，让伙计送过来吧
- S：（不情愿.jpg）行吧
- ...
- S：有 数据 1 了，伙计，送过去
- ...
- S：有 数据 n 了，伙计，噢，下班了呀。天都黑了，算了吧，等他再来吧

<lazy-load tag="img" :data="{ src: 'https://kaola-haitao.oss.kaolacdn.com/cde8e718-d3a6-4322-8bc7-26b8f9f8aa71_1408_1632.png', alt: 'streaming', style: { maxWidth: '700px'} }" />

---

> 4、签个双向合同吧，你有数据随时给我，我有数据随时给你

### WebSocket

- C：我们的合同执行吧，麻烦有数据的时候，推记得给我噢。。
- S：ok
- S：我这有数据给你
- C：👌，我这也有数据给你
- S：👌，给你
- ...

<lazy-load tag="img" :data="{ src: 'https://kaola-haitao.oss.kaolacdn.com/0a97058b-50e7-4cc6-935d-9fab045bd8bb_1290_1562.png', alt: 'websocket', style: { maxWidth: '700px'} }" />

---

1. 一趟一趟跑
2. 跑过去等一会儿，万一拿到了呢，少跑一趟是一趟
3. 跑过去预定，天黑前，还有新数据的话，让伙计送过来吧
4. 签个双向合同吧，你有数据随时给我，我有数据随时给你

> 这个演变过程，看着很像双方地位从不平等到平等的过程。

---

## 做个对比吧

> 总结不太全，欢迎补充

| 方式                                    | 类型            | 技术实现                                                                                                                        | 优点                                                                    | 缺点                                                                                                               |
| --------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 轮询<br>Polling                         | client→server   | 客户端循环请求                                                                                                                  | 1、简单<br />2、很容易理解<br />3、实现无额外技术成本<br />4、 支持跨域 | 1、浪费带宽和服务器资源<br />2、 一次请求信息大半是无用（完整 http 头信息）<br />3、 有延迟<br />4、大部分无效请求 |
| 长轮询<br>Long-Polling                  | client→server   | 服务器 hold 住请求，一直到有数据或者超时才返回，减少重复请求次数                                                                | 1、简单<br />2、不会频繁发请求<br />3、节省流量<br />4、延迟低          | 1、服务器 hold，会消耗资源<br />2、维护多个线程<br />3、很容易占满 TCP 连接数                                      |
| 长连接：iframe/htmlfile                 | client→server   | 在页面里嵌入一个隐蔵 iframe/htmlfile，将这个 iframe 的 src 属性设为对一个长连接的请求，服务器端就能源源不断地往客户端输入数据。 | 1、数据实时送达<br />2、不发无用请求，一次链接，多次“推送”              | 1、服务器增加开销<br />2、无法准确知道连接状态<br />3、IE、FF 一直会处于 loading 状态                              |
| 长连接：multi-part                      | client→server   | 采用 xhr 请求，服务器端就能源源不断地往客户端输入数据。                                                                         | 1、数据实时送达<br />2、不发无用请求，一次链接，多次“推送”              | 1、 并非所有的浏览器都支持 multi-part 标志                                                                         |
| Flash Socket                            | server→client   | 使用了 Socket 的 Flash                                                                                                          | 1、真·实时推送                                                          | 1、必须安装 Flash 插件<br />2、非 http 协议，无法自动穿越防火墙                                                    |
| SSE（Server Sent Events）服务器发送事件 | server→client   | SSE【!IE】：new EventSource()                                                                                                   | 1、服务端主动<br />2、数据流<br />3、支持断线重连                       | 1、只是长连接<br />2、还是单向<br />3、IE 不支持                                                                   |
| WebSocket                               | server ⇌ client | new WebSocket()                                                                                                                 | 1、双向协议<br />2、可发送二进制文件                                    | 1、浏览器支持程度不一致<br />2、不支持断开重连                                                                     |

未完待续。。。
