---
view: post
layout: post
lang: zh-cn
author: realign
title: Svelte基础教程
description: Svelte基础教程
excerpt: Svelte基础教程)
cover: true
categories:
  - js
  - framework
  - svelte
tags:
  - js
  - framework
  - svelte
created_at: 2019-12-24 13:28
updated_at: 2019-12-24 13:28
meta:
  - name: keywords
    content: js, javascript, svelte, framework
---

> 没有特殊说明，下面的每个例子均是一个单独的 `.svelte` 文件。

## 基础篇

### 最基础的例子

输出 `Hello world`。

```html
<h1>Hello world!</h1>
```

### 动态数据

不想跟 `world` 打招呼了，想跟别人打招呼。

```html
<script>
  const name = 'realign';
</script>

<h1>Hello {name}!</h1>
```

### 动态属性

给打招呼的人加个头像。

```html
<script>
  const name = 'realign';
  const avatar = 'https://svelte.dev/favicon.png';
</script>

<h1>Hello {name}!</h1>
<img src={avatar} alt="" />
```

### 样式渲染

给头像设置大小跟边框。

```html
<script>
  const name = 'realign';
  const avatar = 'https://svelte.dev/favicon.png';
</script>

<h1>Hello {name}!</h1>
<img src={avatar} alt="" />

<style>
img {
  width: 30px;
  border: 1px solid #ff3e00;
}
</style>
```

### 头像单独放

想把头像单独抽离，给不欢迎的人的名单用。

```html
<!-- avatar.svelte -->
<script>
  const avatar = 'https://svelte.dev/favicon.png';
</script>

<img src={avatar} alt="" />

<style>
img {
  width: 30px;
  border: 1px solid #ff3e00;
}
</style>
```

```html
<!-- main.svelte -->
<script>
  import Avatar from './avatar.svelte';

  const name = 'realign';
</script>

<h1>Hello {name}!</h1>
<Avatar />
```

未完，待完善...
