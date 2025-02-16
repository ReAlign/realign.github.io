---
view: post
layout: post
lang: zh-cn
author: realign
title: 业务组件的最佳设计实践
description: 一些关于业务组件的最佳设计实践想法的记录参考
excerpt: 一些关于业务组件的最佳设计实践想法的记录参考
cover: true
coverConfig:
  - type: biz
  - iconType: biz
  - title: Components
  - subTitle: Best design
categories:
  - api
  - coding
  - notes
  - react
  - svelte
  - vue
tags:
  - api
  - coding
  - notes
  - react
  - svelte
  - vue
created_at: 2025-02-15 19:18
updated_at: 2025-02-15 19:18
meta:
  - name: keywords
    content: codeing, best-design, component, biz
---

## 基于业务的设计理念

**基于业务**，在这个前提下，一些以前设计公共组件的想法思路，用来设计业务组件，大部分是不利于维护的，需要从业务的维度来思考设计方向。

### 被多处引用的组件属性设计

多处引用的组件，属性枚举/场景枚举 区分

- ❌ 属性枚举: size="xs" | size="md"
  - 后续业务升级，无法直接知道这个组件都被用在了哪些业务场景
  - 某些场景下，需要调整尺寸等，这种设计下没办法快速响应，且需要重构组件

```js
// 使用函数来举例，代替组件
const avatar = ({ size }: { size: 'xs' | 'md' }) => {
  // ...
  return {
    // ...
    className: `bz-avatar-size-${size}`,
  };
};
```

- ✅ 场景枚举: scene="home-list-card" | scene="detail"
  - 任何时候，都能从 scene 知道有哪些业务场景使用了这个组件
    - 可快速找到筛选出需要升级处理的场景，解耦开发
  - 迭代过程中任何场景需要调整，只需要调整中间映射关系就行

```js
// 使用函数来举例，代替组件
const avatar = ({ scene }: { scene: 'home-list-card' | 'detail-top' }) => {
  // ...
  const sceneSizeMap = {
    'home-list-card': 'xs',
    'detail-top': 'md',
  };
  return {
    // ...
    className: `bz-avatar-size-${sceneSizeMap[scene]}`,
  };
};
```

### Todo...
