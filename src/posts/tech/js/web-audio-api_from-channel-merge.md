---
view: post
layout: post
lang: zh-cn
author: realign
title: Web Audio Api：由声道合并讲起
description: 从声道合并讲起，深入浅出学习 Web Audio Api，彻底搞懂 audio api
excerpt: 需求
cover: true
coverConfig:
  - type: browser
  - iconType: browser
  - title: Browser
  - subTitle: Web Audio Api from Channel Merging
categories:
  - js
  - api
tags:
  - js
  - audio
  - api
  - web
created_at: 2019-07-06 19:12
updated_at: 2019-07-06 19:10
meta:
  - name: keywords
    content: channel merge, 声道合并, web audio api
---

## 初识

> The Web Audio API provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning) and much more.

上面是 [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) `Web Audio API` 部分的第一段文字。翻译过来大致是：

Web Audio API 提供了在 Web 上控制音频的一个非常有效通用的系统，允许开发者来自选音频源，对音频添加特效，使音频可视化，添加空间效果 （如平移），等等。

好，我们再来看对于 `Web audio` 的概念介绍：

> The Web Audio API involves handling audio operations inside an audio context, and has been designed to allow modular routing. Basic audio operations are performed with audio nodes, which are linked together to form an audio routing graph. Several sources — with different types of channel layout — are supported even within a single context. This modular design provides the flexibility to create complex audio functions with dynamic effects.

翻译一下，大致意思是：

Web Audio API 使用户可以在音频上下文(`AudioContext`)中进行音频操作，具有模块化路由(`ModularRouting`)的特点。在音频节点(`AudioNodes`)上操作进行基础的音频， 它们连接在一起构成音频路由图(`AudioRoutingGraph`)。即使在单个上下文中也支持多源，尽管这些音频源具有多种不同类型通道布局。这种模块化设计提供了灵活创建动态效果的复合音频的方法。

上面的翻译，四个被标出的关键词就是基本概念。

## 基本概念

### 1. AudioContext

> 音频上下文

提到上下文，我们并不陌生，比如：[canvas context](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)。它包含了用来处理音频的 API，是 Web Audio API 处理音频的核心对象。在整个音频处理中，所有处理的过程，都由 audio context 管理。

<lazy-load
    tag="img"
    :data="{
        src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2019-07-09/img-1562603258065-7839.png',
    }"
/>

### 2、ModularRouting

> 模块化路由

待完善...
