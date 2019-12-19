---
view: post
layout: post
lang: zh-cn
author: realign
title: js 控制浏览器全屏和退出全屏
description: js 控制浏览器全屏和退出全屏
excerpt: js 控制浏览器全屏和退出全屏
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
  - full-screen
created_at: 2019-07-10 14:01
updated_at: 2019-07-10 14:01
meta:
  - name: keywords
    content: js,browser,tab,api,full-screen
---

***

## 场景

业务中，有些场景下需要调用 api 来控制页面全屏以及退出全屏。

## API

[MDN: visibilitychange](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/visibilitychange_event)

## 使用

<a href="/static-html-demo/notes/js/judgment_handle_of_browser_tab_show_or_hide/index.html" target="_blank">查看效果</a>

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
