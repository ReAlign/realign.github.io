---
view: post
layout: post
lang: zh-cn
author: realign
title: svelte:真正的响应式
description: svelte:真正的响应式
excerpt: svelte:真正的响应式
cover: true
categories:
  - framework
  - js
  - svelte
tags:
  - framework
  - js
  - svelte
created_at: 2020-12-29 00:04
updated_at: 2020-12-29 00:04
meta:
  - name: keywords
    content:
---
<!-- https://www.infoq.cn/article/OCzmPGBj*pWPGMkFR4aN -->

## 概览

<lazy-load tag="img" :data="{ src: 'https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-11-24/1c43ffa4552c890fe1e6a27e5a793c60.jpg', alt: 'React is not fully reactive.' }" />

上面那句话究竟是什么意思？这对我们现在写代码的方式有什么影响？要回答这个问题，我先简单介绍一下 React 的工作机制吧。

* 当你呈现一个 React 应用时：
  * React 会在所谓虚拟 DOM 中保留 DOM 的副本。
  * 虚拟 DOM 充当你的 React 代码与浏览器绘制到 DOM 的内容之间的中间层。
* 然后当你的数据出现变动时（比如：this.setState、useState），React 会做一些工作来确定如何在屏幕上重新绘制 UI。
* 它会对比虚拟 DOM 与真实的 DOM，以确定数据更新导致了哪些更改。然后它会仅重新绘制与虚拟 DOM 中的新副本不匹配的 DOM 部分，这样就无需在每次数据更新时重新绘制整个 DOM 了。

这就显著提升了性能，因为： **更新虚拟 DOM 比更新真实 DOM 要节省很多资源**，对应 React 只更新真实 DOM 中需要改变的部分。

但你可能会发现这个实现有点问题。如果你没有告诉 React 你的数据已经改变了（比如：this.setState、useState），那么虚拟 DOM 就不会有变化，React 也不会随之响应。

这就是上面所说的，React 并不是完全的响应式设计的意思。

**React 需要你手动跟踪应用数据，并在数据变化时告诉 React，这也意味着你得做更多工作。**

好了，现在该谈 Svelte 了。

## Svelte

Svelte 是一种构建 UI 的全新途径，它速度极快、效率极高，是真正的响应式设计，还不需要虚拟 DOM；用 Svelte 写的代码比其它任何框架或库都更加简洁。

说得这么好听，可你肯定会问它和其它一大堆 JavaScript 库和框架究竟有什么区别呢？我来逐一说明吧。

### 真正的响应式设计

Svelte 既不是库也不是框架；相反，Svelte 是一个编译器，它吃进你的代码并吐出与你的 DOM 直接交互的原生 JavaScript，不需要中间层。

等等，什么？编译器？是的——编译器。这个思路太强悍了，我都不知道为什么以前没人想得到呢？为什么这个主意这么棒，听我细细道来吧。

引一句 Rich Harris 在 YGLF 2019 大会上的讲话：

Svelte 3.0 将响应设计从组件 API 移到了编程语言中。

这说的是啥？别急，我们已经看到 React 和大多数其他前端框架，要求你在更新其虚拟 DOM 之前，使用 API 来告诉它数据已更改（再次通过调用 this.setState 或 useState）。

在 React 以及大多数 UI 框架和库中，调用 this.setState 意味着你的应用的响应能力是与特定的 API 绑定的，没有 API 它就没法知道数据什么时候变动了。

Svelte 采取了另一种方法解决这个问题。

它从运行代码的方式中获取了 Observable 的灵感。 它不是从上到下运行代码，而是以拓扑顺序运行它。 查看下面的代码片段，我们将了解以拓扑顺序运行它的含义。

```js
(() => {
  const square = number => number * number;

  const secondNumber = square(firstNumber);
  const firstNumber = 42;

  console.log(secondNumber);
})();
```

现在如果你按从上到下的顺序运行这几行代码的话就会在第 4 行遇到错误，因为 secondNumber 依赖 firstNumber，而这时候 firstNumber 尚未初始化。

如果以拓扑顺序运行这段代码则不会出现任何错误。为啥呢？编译器并不会按从上到下的顺序运行这段代码；相反，它会查看所有变量并生成依赖图（比如说 A 依赖 B 才能工作之类）。

这算是对编译器如何以拓扑顺序编译代码的简化解释了。

1. 这个新变量"square"是否依赖其它变量？ - 它没有，所以我会初始化它
2. 这个新变量"secondNumber"是否依赖其它变量？ - 它依赖"square"和"firstNumber"。我已初始化"square"，但我还没有初始化"firstNumber"，马上就会做。
3. 好的，我已初始化"firstNumber"。现在我可以使用"square"和"firstNumber"初始化"secondNumber"了 - 我是否拥有运行此 console.log 语句所需的所有变量？ - 是的，所以我会运行它了。

乍看上去代码好像是从上到下的运行顺序，但仔细观察就会发现它的确是跳着执行的。

跑到第 4 行时，编译器发现它没有 firstNumber，因此会暂停执行并查看代码，找出它是不是在别的地方定义了。一看，原来它是在第 5 行定义的，所以编译器会先运行第 5 行，然后返回第 4 行继续执行。

如果语句 A 依赖于语句 B，则语句 B 会先运行，运行顺序与声明的顺序无关。

那么这和 Svelte 实现真正的响应式设计又有什么关系？具体来说，你可以在 JavaScript 中用标识符标记一个语句，如下所示：$: foo = bar。它会在 foo = bar 语句中添加一个名为 $ 的标识符（如果之前未定义 foo，则严格模式下会出错）。

所以在这种情况下，当 Svelte 看到任何带有 $: 前缀的语句时，它就知道左边的变量要从右边的变量中获取值。我们现在有了一种方法可以将一个变量的值绑定到另一个变量。

响应！这意味着我们现在正在使用 JavaScript 的 API 核心部分来实现真正的响应设计，无需摆弄像 this.setState 这样的第三方 API。

实践中是这个样子：

```js
// vanilla js
let foo = 10;
let bar = foo + 10; // bar is now 20
foo = bar // bar is still 20 (no reactivity)
bar = foo + 10 // now bar becomes 30

// svelte js
let foo = 10;
$: bar = foo + 10; // bar is now 20
foo = 15 // bar is now 25 because it is bound to the value of foo
```

请注意，在上面的代码中我们不需要将 bar 重新分配给 foo 的新值——比如直接通过 bar = foo + 10；或者通过调用像 this.setState({ bar = foo + 10 }); 这样的 API 方法，现在都用不着了。它会自动为我们处理好的。

这意味着当你将 foo 更改为等于 15 时，bar 会自动更新为 25，并且你不必调用 API 来为你更新它。Svelte 已经知道了。

上面的 Svelte 代码的编译版本如下所示：

```js
// ... omitted for brevity ...
function instance($$self, $$props, $$invalidate) {
  let foo = 10; // bar is now 20
  $$invalidate('foo', foo = 15) // bar is now 25 because it is bound to the value of foo
  let bar;
  $$self.$$.update = ($$dirty = { foo: 1 }) => {
    if ($$dirty.foo) { $$invalidate('bar', bar = foo + 19); }
  };
  return { bar };
}
// ... omitted for brevity ...
```

好好花点时间研究一下上面这段代码吧，慢慢来，不要着急。

看到在 bar 被定义之前 foo 是如何更新的了吗？ 那是因为编译器正在以拓扑顺序，而非严格的自上而下的顺序在解析 Svelte 代码。

Svelte 会自己响应数据变化。它用不着你操心更改的内容和时间；它自己就会知道。

注意： 在第 4 行里，bar 的值到下一个 Event Loop 之前都不会更新的，这样一切都会干净又整洁。

这样你就不必在数据发生变化时手动更新状态了。你可以专注于你的代码逻辑，而 Svelte 可以帮助你将 UI 与最新状态协调好。

### 简洁

前面我不是说 Svelte 可以用更少的代码来完成更多工作吗？事实确实如此。下面我拿 React 中一个简单的组件和 Svelte 中的对应组件举个例子，你自己看：

17 行对 29 行代码，这俩应用的功能完全相同，看看我们在 React.js 中编写了很多的代码吧——这我还没开始用 Angular 呢。

Svelte 代码除了更简洁耐看外也更容易理解，因为它的活动部件比 React 代码少。我们不需要事件处理程序来更新输入元素的值——只需绑定值即可。

回想你刚刚开始学习网页开发的时候。哪边的代码会让你更难理解？左边的还是右边的？

虽然这看起来没那么重要，但当你开始构建更大、更复杂的应用时，很快就会发现不用写那么多代码是多么有用。我曾花了好几个小时试图理解同事编写的大型 React 组件是如何工作的。

我确实相信 Svelte 的简化 API 能使我们更快地阅读和理解代码，从而提高整体工作效率。

### 性能

好了，现在我们已经知道 Svelte 是真正的响应式设计，可以让你用更少的投入做更多的事情。那么它的性能如何？完全用 Svelte 编写的应用能有很好的用户体验吗？

React 之所以如此强大，其原因之一在于它使用虚拟 DOM 来更新应用程序的 UI，一次只更新一部分，无需在每次更改内容时重新构建整个 DOM（这非常消耗资源）。

但这种方法的缺点是，如果组件的数据发生变化，React 将重新渲染该组件及其所有子组件，哪怕子组件不需要重新渲染也得这么干。这就是为什么 React 会有 shouldComponentUpdate、useMemo、React.PureComponent 一类的 API。

只要使用虚拟 DOM 在状态更改时渲染 UI，这个问题就没法解决。

Svelte 不使用虚拟 DOM，那么它如何解决重新绘制 DOM 以匹配应用程序状态的问题呢？这里我再次引用 Rich Harris 在 YGLF 上的精彩演讲：

框架不是用于组织代码的工具。它们是组织你思想的工具。

Rich 认为框架可以在构建步骤中运行，从而让代码在运行时无需中间层。这也就是为什么 Svelte 是编译器而非框架的原因。

这就是为什么 Svelte 速度飞快的原因。Svelte 将你的代码编译为一个直接与 DOM 交互的高效底层代码。但 Svelte 是如何解决数据更改时重新绘制整个 DOM 的问题呢？

像 React 这样的框架需要你调用 API 方法，在数据发生变化时告诉它；但使用 Svelte 时，只需使用赋值运算符 = 就足够了。

如果状态变量——比如说 foo ——使用 = 运算符更新，则 Svelte 将仅更新依赖 foo 的其它变量，如前所示。这让 Svelte 可以仅绘制 DOM 的一部分内容，这些部分以某种方式从 foo 中获取它们的值。

我将省略实际的实现方式，因为这篇文章已经足够长了。

### 结语

Svelte 3.0 是最近软件开发业的福音之一。有些人可能会说这是夸大其词，但我不这么认为。Svelte 背后的理念及其实现将使我们能向浏览器发送更少的 JS 模版，却做更多的事情。

反过来，这会带来性能更强、更轻量的应用程序，并生成更易阅读的代码。那么现在，Svelte 将很快取代 React、Angular 或其它流行前端框架吗？

现在我可以说答案是否定的。与它们相比 Svelte 相对年轻，所以它需要时间来成长、成熟，并解决一些我们可能还没发现的问题。

就像 React 诞生后改变了软件开发产业一样，Svelte 也有可能改变我们对框架的看法，以及我们开发新事物时的思路。

