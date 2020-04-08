---
view: post
layout: post
lang: zh-cn
author: realign
title: Git-别名
description: git alias 设置
excerpt: git alias 设置
cover: true
categories:
  - git
  - notes
tags:
  - git
  - notes
created_at: 2020-04-07 19:01
updated_at: 2020-04-07 19:01
meta:
  - name: keywords
    content: git, notes, alias
---

## 合并多条命令

对比：

```git
# Before
# 1、暂存
git add -a
# 2、附加说明，提交本地
git commit -m "xxx"
# 3、提交远程
git push

# After
# 配置别名 `acp` 之后，只需要下面一行搞定
git acp "xxx"
```

那么，如何配置呢？

```git
# 配置别名
# 命令配置
git config --global alias.acp "!f() { git add -A && git commit -m \"$1\" && git push; }; f"

# 编辑 .gitconfig 配置文件
vi /Users/[your_name]/.gitconfig
...
[alias]
  pl = pull
  acp = "!f() { git add . && git commit -am \"$1\" && git push; }; f"
...
```
