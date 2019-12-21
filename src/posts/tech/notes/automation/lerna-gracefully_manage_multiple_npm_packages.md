---
view: post
layout: post
lang: zh-cn
author: realign
title: Lerna-如何优雅地管理多个npm包
description: Lerna-如何优雅地管理多个npm包
excerpt: Lerna-如何优雅地管理多个npm包
cover: true
categories:
  - node
  - automation
  - notes
tags:
  - node
  - npm
  - lerna
  - multiple
created_at: 2019-12-19 11:03
updated_at: 2019-12-19 11:03
meta:
  - name: keywords
    content: node,automation,notes,npm,lerna,multiple
---

***

## 关于 Lerna

[lerna官网](https://lerna.js.org/) 对于 `lerna` 的两段描述：

> A tool for managing JavaScript projects with multiple packages.

> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

简单翻译下：

> `Lerna` 基于 **GIT**(主要是 commit) 和 **NPM**(工具链) 来**辅助**和**优化**开发者管理多包。

翻译之后，还是一脸懵吧 😂。那就对了，没有实际场景，鬼才知道这是干嘛的，来往下走~

## 场景

下面我们来通过一个典型场景来分析 `lerna` 能解决什么实际的痛点。

### 典型场景描述

* 有一个业务组件仓库，里边有 **N个** 业务组件
* 每个业务组件是一个 **单独** 的 npm 包
* 作为一个 **包管理者**
* 每一次仓库的更新，都意味极有可能需要发一遍包

那么，问题来了：

1. 怎么知道哪些包有改动？
2. 这些改动是否都需要发版？
3. 需要发版的包新的版本号谁来更新，版本号怎么处理？
    * major？
    * premajor？
    * minor？
    * others？
4. 开发者忘记维护除包核心逻辑之外的一些东西怎么办？比如：
    * version
    * changeLog
5. 发包需要机械地重复执行下面的命令吗？
    * `cd xxx`
    * `npm publish`
6. 等

看着这一堆问题，是不是觉得，这个包管理者，不当也罢~ 再次 😂

### 场景问题分析

这些问题，先看看 `lerna` 是基于什么解决的，然后，我们再开始深入了解 `lerna`。

1. 怎么知道哪些包有改动？
    * 不是有 git commit 嘛
2. 这些改动是否都需要发版？
    * 你可以在一个配置中指定需要关注的文件
3. 需要发版的包新的版本号谁来更新，版本号怎么处理？
    * 不就是拉取现有版本号，然后基于 npm semver 来更新嘛
4. 开发者忘记维护除包核心逻辑之外的一些东西怎么办？
    * 再说一遍，不是有 git commit 嘛
5. 发包需要机械地重复执行下面的命令吗？
    * 这么有规律的操作，不就是交给机器做的嘛

### Lerna 的处理机制

`Lerna` 对于包的管理，有两种模式：固定模式(fixed)、独立模式(independent)。有何区别呢？

#### 固定模式(fixed)

> 所有包是统一的版本号，每次升级，所有包版本统一更新，不管这个包内容改变与否

具体体现在，`lerna` 的配置文件 `lerna.json` 中永远会存在一个确定版本号：

```json
{
    "version": "0.0.1"
}
```

典型例子： `babel`、`vue`

#### 独立模式(independent)

> 每个包是单独的版本号，每次lerna 触发发布命令，每个包的版本都会单独变化

具体体现在，`lerna` 的配置文件 `lerna.json` 中没有一个确定版本号，而是：

```json
{
    "version": "independent"
}
```

## Lerna 初始化

### 安装

```bash
$ npm i lerna -g
$ lerna -v
```

### 初始化

代码结构要采用 `lerna` 提供的规范结构的话：

```bash
$ cd lerna-pro
# 默认是 fixed 模式
$ lerna init
# 要采用 independent 模式的话
$ lerna init -i $ lerna init --independent
```

生成的目录结构为：

```file
└── lerna-pro/
   ├── packages/
   ├── lerna.json
   └── package.json
```

如果代码结构已经存在，则只需要在根目录下新建 `lerna.json`，并补充相关字段。

### lerna.json 说明

```json
{
    "useWorkspaces": true, // 使用 workspaces 配置。此项为 true 的话，将使用 package.json 的 "workspaces"，下面的 "packages" 字段将不生效
    "version": "0.1.0", // 所有包版本号，独立模式-"independent"
    "npmClient": "cnpm", // npm client，可设置为 cnpm、yarn 等
    "packages": [ // 包所在目录，可指定多个
        "packages/*"
    ],
    "command": { // lerna 命令相关配置
        "publish": { // 发布相关
            "ignoreChanges": [ // 指定文件或目录的变更，不触发 publish
                ".gitignore",
                "*.log",
                "*.md"
            ]
        },
        "bootstrap": { // bootstrap 相关
            "ignore": "npm-*",  // 不受 bootstrap 影响的包
            "npmClientArgs": [ // bootstr 执行参数
                "--no-package-lock"
            ]
        }
    }
}
```

## Lerna 命令说明

> 基于官网文档的翻译，只展示部分，原版以及所有内容可查看 [lerna.js.org](https://lerna.js.org/)

### Init

`lerna init`

创建一个新的 `lerna` 仓库或将现有的仓库升级到 `lerna` 的当前版本。
