---
view: post
layout: post
lang: zh-cn
author: realign
title: 设置 letter-spacing 后文字不居中
description: 设置 letter-spacing 之后，文字不居中的解决方案
excerpt: 设置 letter-spacing 后文字不居中，原始场景...
cover: true
categories:
  - css
  - notes
  - 随手记
tags:
  - css
  - letter-spacing
  - text-align
  - text-intent
  - center
created_at: 2019-07-07 13:51
updated_at: 2019-07-07 13:51
meta:
  - name: keywords
    content: css,letter-spacing,不居中,text-align,text-intent
---

***

## 原始场景

<lazy-load
    tag="iframe"
    :data="{
        src: '//codepen.io/realign/embed/ZdqGGZ/?height=265&theme-id=dark&default-tab=css,result',
    }"
/>

## 原因分析

* `letter-spacing` 是给所有 `字` 添加间距【`字`：包括 `汉字单字` 和 `单个字母`】
* 间距是添加到每个 `字` 的后面
* 所以，添加了属性之后，所有文本的位置整体是往左边偏移了 `${letter-spacing}`
* 所以，文本整体需要在左边添加对应的 `${letter-spacing}`，来平衡布局

## 解决

```less
// less
@letter-spacing: 10px;

.u-text {
    letter-spacing: @letter-spacing;
    text-indent: @letter-spacing;
}
```

<lazy-load
    tag="iframe"
    :data="{
        src: '//codepen.io/realign/embed/XLxbNW/?height=265&theme-id=dark&default-tab=css,result',
    }"
/>
