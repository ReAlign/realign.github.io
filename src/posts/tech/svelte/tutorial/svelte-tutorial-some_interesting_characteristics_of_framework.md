---
view: post
layout: post
lang: zh-cn
author: realign
title: Svelte教程：框架一些有趣的特性
description: Svelte教程：框架一些有趣的特性
excerpt: Svelte教程：框架一些有趣的特性
cover: true
coverConfig:
  - type: svelte
  - iconType: svelte
  - title: Svelte
  - subTitle: Interesting features
categories:
  - js
  - framework
  - svelte
tags:
  - js
  - framework
  - svelte
  - characteristics
created_at: 2019-12-24 13:28
updated_at: 2021-01-20 16:14
meta:
  - name: keywords
    content: js,javascript,svelte,framework,characteristics
---

> 没有特殊说明，下面的每个例子均是一个单独的 `.svelte` 文件。

## 有趣的特性

### 另类的响应式写法

[reactive-declarations](https://svelte.dev/examples#reactive-declarations)

```html
<script>
  let count = 1;

  // $: 表示这个变量在它的右值变化的时候会重新计算
  // count 变化, doubled 和 quadrupled 这俩值也会跟着变
  // 很类似 vue 的 computed
  $: doubled = count * 2;
  $: quadrupled = doubled * 2;

  // $: 也可以是一段逻辑
  $: if (count >= 10) {
    alert(`count is dangerously high!`);
    count = 9;
  }
</script>
```

### 数组和对象的更新

[updating-arrays-and-objects](https://svelte.dev/tutorial/updating-arrays-and-objects)

```html
<script>
  // 数组
  let numbers = [1, 2, 3, 4];
  $: sum = numbers.reduce((t, n) => t + n, 0);

  // 不起作用
  function addNumber() {
    numbers.push(numbers.length + 1);
  }
  // 只有显式用等号赋值，才能触发响应式
  // 需要多操作一下
  function addNumber() {
    numbers.push(numbers.length + 1);
    // 显式赋值
    numbers = numbers;
  }
  // 更简单地写法
  function addNumber() {
    numbers = [...numbers, numbers.length + 1];
  }
  // 再来一种
  function addNumber() {
    numbers[numbers.length] = numbers.length + 1;
  }

  // 对象
  let obj = {
    x: {
      k: 'k',
    },
  };
  $: ks = JSON.stringify(obj, null, 2);
  // 不生效
  function addProp() {
    const x = obj.x;
    x.c = 'k';
  }
  // 生效
  function addProp() {
    obj.x.c = 'k';
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

### 事件修饰符

[event-modifiers](https://svelte.dev/tutorial/event-modifiers)

```html
<button on:click|once|capture={handleClick}>
  Click me
</button>
```

所有修饰符：

* preventDefault
  * 运行事件句柄之前先调用 event.preventDefault()
* stopPropagation
  * 调用 event.stopPropagation()
* passive
  * 改善触摸/滚轮事件的滚动性能
* capture
  * 捕获阶段处理事件句柄
* once
  * 句柄触发一次
* self
  * 只有在 event.target 是元素本身时才触发句柄

### 组件间事件处理

[component-events](https://svelte.dev/examples#component-events)

* 父组件：`<Child on:xxx={handleXxx} />`
* 子组件：
  * `const dispatch = createEventDispatcher()`
  * `dispatch('xxx', opts)`

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

* [event-forwarding](https://svelte.dev/tutorial/event-forwarding)
* [event-forwarding](https://svelte.dev/tutorial/dom-event-forwarding)

待完善

### 组合输入

[group-inputs](https://svelte.dev/tutorial/group-inputs)

待完善

### This

[bind-this](https://svelte.dev/tutorial/bind-this)

待完善

### 父子组件可直接绑定值

[component-bindings](https://svelte.dev/tutorial/component-bindings)

待完善

### 极简的生命周期

[onmount](https://svelte.dev/tutorial/onmount)

* onMount
* onDestroy
* beforeUpdate&afterUpdate
* tick

### Stores

[writable-stores](https://svelte.dev/tutorial/writable-stores)

待完善

### ContextApi

[context-api](https://svelte.dev/tutorial/context-api)

待完善

### 一些特殊标签

[svelte-self](https://svelte.dev/tutorial/svelte-self)

待完善

### Module ontext

[sharing-code](https://svelte.dev/tutorial/sharing-code)

待完善
