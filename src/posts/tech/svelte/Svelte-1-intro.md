---
view: post
layout: post
lang: zh-cn
author: realign
title: Svelte(1)——介绍
description: 介绍 Svelte
excerpt: 介绍 Svelte
cover: true
categories:
  - js
  - framework
tags:
  - js
  - framework
created_at: 2019-10-28 13:28
updated_at: 2019-10-28 13:28
meta:
  - name: keywords
    content: js, javascript, svelte, framework
---

## 什么是 Svelte?

先来看官网的描述：

<lazy-load tag="img" :data="{ src: 'https://haitao.nos.netease.com/9a310528-31fd-4040-bf5c-64472961ef07_1620_516.png', alt: 'Svelte-intro', style: { maxWidth: '700px'} }" />

简单翻译下：

> Svelte是一种构建用户界面的全新方法。传统框架(如React和Vue)的大部分工作是在浏览器中完成的，而Svelte将这些工作转换为编译步骤，这在构建应用程序时发生。
>
> Svelte没有使用虚拟DOM扩散之类的技术，而是编写代码，当应用程序的状态发生变化时，这些代码将对DOM进行更新。

上述描述总结有两点：

1. 没有 运行时（runtime），通过静态编译来减少框架运行时的代码量
    * 对应不需要引入大体积的框架运行时库（react.js or vue.js）
2. 没有 `Virtual DOM`，应用的状态更新是通过 `Svelte` 静态编译阶段静态分析提供的更新机制
    * 没有 `diff of Virtual DOM` 带来的时间、性能开销
    * 对应单页应用来说，首屏加载速度得到很大的提升

***

待续~