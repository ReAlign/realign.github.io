---
view: post
layout: post
lang: zh-cn
author: realign
title: 宽搜和深搜的解析以及在前端中的典型应用
description: 广搜和深搜
excerpt: 广搜和深搜
cover: true
coverConfig:
  - type: algorithm
  - iconType: algorithm
  - title: Algorithm
  - subTitle: BFS / DFS / DOM Traverse
categories:
  - algorithm
  - js
tags:
  - algorithm
  - js
created_at: 2020-04-11 03:27
updated_at: 2020-04-11 03:27
meta:
  - name: keywords
    content: algorithm, js
---

## 概述

## DOM遍历

### 原始DOM结构

```html
<div class="root">
  <div class="container">
    <section class="sidebar">
      <ul class="menu"></ul>
      <ol class="tips"></ol>
    </section>
    <section class="main">
      <article class="post"></article>
      <p class="copyright"></p>
    </section>
  </div>
</div>
```

### 树形转换图形化展示

<lazy-load tag="iframe" :data="{ src: 'https://mermaid-js.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiZ3JhcGggVEJcbnJvb3QtLT5jb250YWluZXJcblx0Y29udGFpbmVyLS0-c2lkZWJhclxuXHRcdHNpZGViYXItLT5tZW51XG5cdFx0c2lkZWJhci0tPnRpcHNcblx0Y29udGFpbmVyLS0-bWFpblxuXHRcdG1haW4tLT5wb3N0XG5cdFx0bWFpbi0tPmNvcHlyaWdodCIsIm1lcm1haWQiOnsidGhlbWUiOiJuZXV0cmFsIn0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9' }" />

### CODEPEN所有代码展示

<lazy-load tag="iframe" :data="{ src: 'https://codepen.io/realign/embed/PoPwbEG?height=265&theme-id=dark&default-tab=result' }" />

## 工具函数

```js
const _ = {
  /**
   * 收集信息
   * @param arr 记录数组
   * @param node 节点
   * @param layer 层级
   */
  collectInfo(arr, node, layer) {
    const _fill = ''.padStart(layer * 2, '_');
    arr.push(`${_fill}${node.tagName}.${node.className}`);
  },
};
```

## BFS

### BFS分析

BFS采用队列的思想，采用出队的方式遍历节点，如果遍历到的节点有子节点，则将子节点入队（这里处理节点层级的方式比DFS更复杂一些，因为这里将所有节点都放到了同一个数组中进行处理）。

BFS则总是先遍历当前层级的所有节点，只有当当前层级所有节点都遍历结束后才会进入下一层级。对于上面例子BFS遍历结果应为：

root, container, sidebar, main, tips, menu, post, copyright

### BFS Recursive

```js
/**
 * 宽先搜-递归
 * @param arr 记录数组
 * @param roots 节点序列
 * @param rootLayer 节点层级
 * @description
 * 逐层递归，每一层收集起来，递归处理下一层时层级标记
 */
function BFS_R(arr, roots, rootLayer = 0) {
  // 子节点序列
  const children = [];
  // 循环处理节点序列
  Array.from(roots).forEach(item => {
    // 记录搜索结果
    _.collectInfo(arr, item, rootLayer);
    // 收集子节点
    if (item.children) {
      children.push(...item.children);
    }
  });

  // 递归处理子节点，层级 +1
  if (children.length) {
    BFS_R(arr, children, rootLayer + 1);
  }
}
```

### BFS Non-Recursive

```js
/**
 * 宽先搜-非递归
 * @param arr 记录数组
 * @param roots 节点序列
 * @param rootLayer 节点层级
 */
function BFS_NR(arr, roots, rootLayer = 0) {
  const rootsQueue = Array.from(roots);
  // 存放每个节点层级的数组
  const rootsLayer = [];
  // 记录层级           当前队列      层级数组      当前层级
  const recordLayer = (queue = [], layers = [], layer = 0) => {
    queue.forEach(() => {
      layers.push(layer);
    });
  };

  // 记录当前层级
  recordLayer(rootsQueue, rootsLayer, rootLayer);
  // 当前处理 rootsQueue 索引
  // 方便查找 rootsLayer 中对应的层级
  let rootIndex = 0;
  while (rootsQueue.length) {
    // 出队
    const node = rootsQueue.shift();
    // 记录搜索结果
    _.collectInfo(arr, node, rootsLayer[rootIndex]);

    // 如果有子节点
    if (node.children.length) {
      // 将子节点放到roots队列中
      rootsQueue.push(...node.children);
      // 将当前层级 +1，得到子节点的层级
      rootLayer = rootsLayer[rootIndex] + 1;
      // 记录子节点层级
      recordLayer(Array.from(node.children), rootsLayer, rootLayer);
    }
    // 处理下一个root节点
    rootIndex++;
  }
}
```

## DFS

### DFS分析

DFS主要采用递归实现，依次遍历节点，如果遍历到的节点有子节点，则开始遍历子节点。

DFS总是先进入下一级节点，只有当下一级没有未遍历的子节点时才会进入到当前层级的其它节点。对于上面例子DFS遍历结果应为：

root, container, sidebar, menu, tips, main, post, copyright

### DFS Recursive

```js
/**
 * 深先搜-递归
 * @param arr 记录数组
 * @param roots 节点序列
 * @param rootLayer 节点层级
 */
function DFS_R(arr, roots, rootLayer = 0) {
  const queue = Array.from(roots);
  // 队列不空
  while (queue.length) {
    // 出队列
    const node = queue.shift();
    // 记录搜索结果
    _.collectInfo(arr, node, rootLayer);
    // 如果有子节点
    if (node.children.length) {
      // 遍历子节点，同时将层级 +1
      DFS_R(arr, node.children, rootLayer + 1);
    }
  }
}
```

### DFS Non-Recursive

```js
/**
 * 深先搜-非递归
 * @param arr 记录数组
 * @param roots 节点序列
 */
function DFS_NR(arr, roots) {
  if (roots.length) {
    const stack = [];
    const mapArr = (list, layer) => {
      return Array.from(list).map(item => {
        return {
          layer,
          item
        };
      });
    };
    // 入栈
    stack.push(...mapArr(roots, 0));
    while (stack.length) {
      // 出栈
      const {
        item,
        layer
      } = stack.pop();
      // 记录搜索结果
      _.collectInfo(arr, item, layer);

      // 子节点
      if (item.children.length) {
        // 此处的倒序，很重要
        stack.push(...mapArr(item.children, layer + 1).reverse());
      }
    }
  }
}
```

## 树形对象展开全路径

多级分类树，搜索/路径匹配渲染，为提升效率，都需要展开一个全路径单层对象，末级 ID 为 key。

### 树数据

```js
const treeData = {
    id: 0,
    title: "0",
    children: [
      {
        id: 10,
        title: "10",
        children: []
      },
      {
        id: 11,
        title: "11",
        children: [
          {
            id: 110,
            title: "110",
            children: []
          },
          {
            id: 111,
            title: "111",
            children: []
          }
        ]
      }
    ]
  };
```

### 树数据结构图形化展示

<lazy-load tag="iframe" :data="{ src: 'https://mermaid-js.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiZ3JhcGggVERcbjAtLT4xMFxuMC0tPjExXG4gICAgMTEtLT4xMTBcbiAgICAxMS0tPjExMVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6Im5ldXRyYWwifX0' }" />

### CODEPEN_RESULT

<lazy-load tag="iframe" :data="{ src: 'https://codepen.io/realign/embed/BaoyVwL?height=265&theme-id=dark&default-tab=result' }" />

### 转换算法

> DFS 的前端典型应用场景

```js
/**
 * 变换树为全路径数组
 * @param {Array|Object} tree 树形对象【对象或数组】
 * @returns {Array} 路径数组
 */
function transformTree2FullPathArray(tree = {}) {
  // 路径数组
  const paths = [];
  // 缓存栈
  const cacheStack = [];

  const _ = {
    // 辅助函数：判断是否存在子节点
    hasChildren(root = {}) {
      return root.children && root.children.length;
    },
    // 遍历树
    travelTree(root) {
      // 节点入栈
      cacheStack.push(root);
      // 有子节点
      if (_.hasChildren(root)) {
        // 子节点循环入栈
        root.children.forEach(item => {
          _.travelTree(item);
        });
      } else {
        // 无子节点，是路径终点，收集路径
        paths.push(_.getPath(cacheStack));
      }
      // 将子节点出栈
      cacheStack.pop();
    },
    // 获取路径
    getPath(arr) {
      return arr.reduce((result, node) => {
        result.push(node.id);
        return result;
      }, []);
    },
    // 开始遍历
    start(tree = []) {
      (Array.isArray(tree) ? tree : [tree]).forEach(item => {
        _.travelTree(item);
      });
    }
  };

  _.start(tree);

  return paths;
};
```

## 参考

[DOM树遍历之JS实现DFS&BFS](https://www.cnblogs.com/homehtml/p/12512395.html)
