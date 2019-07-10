---
view: post
layout: post
lang: zh-cn
author: realign
title: 浏览器tab页隐藏/显示的判断和处理
description: 浏览器tab页隐藏/显示的判断和处理
excerpt: 浏览器tab页隐藏/显示的判断和处理
cover: true
categories:
  - js
  - api
  - notes
  - 随手记
tags:
  - js
  - browser
  - tab
  - api
  - visibilitychange
created_at: 2019-07-10 14:01
updated_at: 2019-07-10 14:01
meta:
  - name: keywords
    content: js,browser,tab,api,visibilitychange
---

***

## 场景

业务中，有些场景下需要知道当前页面(浏览器tab)是否是处于激活(显示)状态，来做对应的处理。

## API

[MDN: visibilitychange](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

## 使用

👉 切换当前 tab 来查看效果

```js
let _title;

//浏览器切换事件
document.addEventListener('visibilitychange', function() {
  //状态判断
  if(document.visibilityState == 'hidden') {
    // 缓存原来的标题
    _title = document.title;
    document.title = '页面被隐藏后的标题';
    // 隐藏状态
    // 你可以做其他操作
  } else {
    // 标题还原
    document.title = _title;
    // 显示状态
    // 你可以做其他操作
  }
});
```

<script>
  let _title;

  //浏览器切换事件
  document.addEventListener('visibilitychange', function() {
    //状态判断
    if(document.visibilityState == 'hidden') {
      // 缓存原来的标题
      _title = document.title;
      document.title = '页面被隐藏后的标题';
      // 隐藏状态
      // 你可以做其他操作
    } else {
      // 标题还原
      document.title = _title;
      // 显示状态
      // 你可以做其他操作
    }
  });
</script>
