---
view: post
layout: post
lang: zh-cn
author: realign
title: Svelte——tutorial(1)
description: Svelte教程(1)
excerpt: Svelte教程(1)
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

## 比较特别的点

### 另类的响应式写法

[reactive-declarations](https://svelte.dev/examples#reactive-declarations)

```html
<script>
  let count = 1;

  // the `$:` means 're-run whenever these values change'
  // when count changed, doubled and quadrupled will follow
  $: doubled = count * 2;
  $: quadrupled = doubled * 2;

  // also be applied to statements
  $: if (count >= 10) {
    alert(`count is dangerously high!`);
    count = 9;
  }
</script>
```

### 将扩展运算符应用到 Props

[spread-props](https://svelte.dev/examples#spread-props)

```html
<script>
  import Info from './Info.svelte';

  const pkg = {
    name: 'svelte',
    version: 3,
    speed: 'blazing',
    website: 'https://svelte.dev'
  };
</script>

<Info {...pkg}/>

<!-- info.svelte -->
<script>
  export let name;
  export let version;
  export let speed;
  export let website;
</script>
```

### 唯一标记每个列表项

[keyed-each-blocks](https://svelte.dev/examples#keyed-each-blocks)

```html
<script>
  import Thing from './Thing.svelte';

  let things = [
    { id: 1, color: '#0d0887' },
    { id: 2, color: '#6a00a8' }
  ];
</script>

{#each things as thing (thing.id)}
  <Thing current={thing.color}/>
{/each}
```

### 将 Async/Await 与模板结合

[await-blocks](https://svelte.dev/examples#await-blocks)

```html
<script>
  // example function
  let promise = async () => {};
</script>

{#await promise}
  <p>...waiting</p>
{:then number}
  <p>The number is {number}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
```

### 组件间事件处理

[component-events](https://svelte.dev/examples#component-events)

* 父组件：`on:xxx`
* 子组件：`createEventDispatcher()('xxx', opts)`

```html
<!-- App.svelte -->
<script>
  import Inner from './Inner.svelte';

  function handleMessage(event) {
    alert(event.detail.text);
  }
</script>

<Inner on:message={handleMessage}/>

<!-- Inner.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sayHello() {
    dispatch('message', {
      text: 'Hello!'
    });
  }
</script>

<button on:click={sayHello}>
  Click to say hello
</button>
```

### (DOM)事件转发

待完善

