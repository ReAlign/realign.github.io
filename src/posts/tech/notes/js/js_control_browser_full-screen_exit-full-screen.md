---
view: post
layout: post
lang: zh-cn
author: realign
title: js 控制浏览器全屏和退出全屏
description: js 控制浏览器全屏和退出全屏
excerpt: js 控制浏览器全屏和退出全屏
cover: true
coverConfig:
  - type: js
  - iconType: js
  - title: Full Screen
  - subTitle: Request & Cancel
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
created_at: 2019-12-18 14:01
updated_at: 2019-12-18 14:01
meta:
  - name: keywords
    content: js,browser,tab,api,full-screen
---

***

## 场景

业务中，有些场景下需要调用 api 来控制 **页面** 和 **元素** 全屏以及退出全屏。

## API

[MDN: Element.requestFullScreen](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen)

## 使用

<a href="/static-html-demo/notes/js/js_control_browser_full-screen_exit-full-screen/index.html" target="_blank">查看效果</a>

## 源码实现

### 全屏

```js
function fullScreen(el) {
    el = el || document.documentElement;
    const rfs = el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
    // 非 ie
    if (typeof rfs !== 'undefined' && rfs) {
        rfs.call(el);
        return;
    }
    // ie
    if (typeof window.ActiveXObject !== 'undefined') {
        const wscript = new ActiveXObject('WScript.Shell');
        if (wscript) {
            wscript.SendKeys('{F11}');
        }
    }
}
```

### 退出全屏

```js
function exitFullScreen() {
    const el = document;
    const cfs = el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;

    if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(el);
        return;
    }

    if (typeof window.ActiveXObject !== 'undefined') {
        const wscript = new ActiveXObject('WScript.Shell');
        if (wscript != null) {
            wscript.SendKeys('{F11}');
        }
    }
}
```
