---
view: post
layout: post
lang: zh-cn
author: realign
title: 手写代码(1)-EventBus
description: EventBus
excerpt: EventBus
cover: true
categories:
  - coding
  - js
tags:
  - coding
  - js
created_at: 2020-03-29 03:00
updated_at: 2020-03-29 03:00
meta:
  - name: keywords
    content: coding, js
---

## 概述

## 代码实现

```js
/**
 *  组件间通信
 *    Vue
 *      父子    Props&Refs / emit
 *      非父子  EventBus
 *      全局    Vuex
 *    React
 *      父子    Props / callback
 *      非父子  Event
 *      全局    Redux/Mobx
 *      new     Content Api
 */
/**
 * @name    EventBus    事件总线
 * @description
 * 1. 构造函数
 *      事件 Map
 * 2. emit
 */
class EventBus {
  constructor() {
    // 绑定的事件集合
    this._evts = {};
  }
  emit(type, ...args) {
    // 获取
    const evt = this._evts[type];
    const _emit_ = (_evt, _args) => {
      // 执行事件，有参数 / 无参数 区分处理
      _args.length ? _evt.apply(this, _args) : _evt.call(this);
    };

    // 不存在触发事件
    if (!evt) {
      console.error(`Event ${type} is not register.`);
      return false;
    }
    evt.forEach(item => {
      _emit_(item, args);
    });
    return true;
  }
  on(type, fn) {
    const evt = this._evts[type];
    if (!evt) {
      this._evts[type] = [fn];
    } else {
      evt.push(fn);
    }
  }
}

module.exports = new EventBus();
```
