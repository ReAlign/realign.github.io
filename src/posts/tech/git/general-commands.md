---
view: post
layout: post
lang: zh-cn
author: realign
title: GIT-常用指令
description: GIT-常用指令
excerpt: GIT-常用指令
cover: true
categories:
  - git
  - http
  - notes
tags:
  - git
  - http
  - notes
created_at: 2020-06-01 10:17
updated_at: 2020-06-01 10:17
meta:
  - name: keywords
    content: git http command
---

## 概述

列出来常见的指令。

## stash

> 「藏起来」，将当前的改动加到缓冲区。

### 应用场景

1. 需要临时切分支，但是正在开发的内容只是完成一半，还不想提交
2. 代码写错了分支，本应该在dev，却在master上

### 功能描述

* 总的来说，`stash` 命令的作用就是将目前还不想提交的但是已经修改的内容进行保存至堆栈中，后续可以在某个分支上恢复出堆栈中的内容。
  * 这也就是说，`stash` 中的内容不仅仅可以恢复到原先开发的分支，也可以恢复到其他任意指定的分支上。
* `stash` 作用的范围包括工作区和暂存区中的内容，也就是说没有提交的内容都会保存至堆栈中。

### 详解

常规的，常看命令支持的内容，直接 `xx -h`，对应到 `git`，如下：

```bash
git stash -h

usage: git stash list [<options>]
   or: git stash show [<stash>]
   or: git stash drop [-q|--quiet] [<stash>]
   or: git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]
   or: git stash branch <branchname> [<stash>]
   or: git stash save [--patch] [-k|--[no-]keep-index] [-q|--quiet]
           [-u|--include-untracked] [-a|--all] [<message>]
   or: git stash [push [--patch] [-k|--[no-]keep-index] [-q|--quiet]
           [-u|--include-untracked] [-a|--all] [-m <message>]
           [-- <pathspec>...]]
   or: git stash clear
```

对应解释如下：

```bash
# 查看当前 stash 中的内容
git stash list [<options>]

# 查看堆栈中最新保存的 stash 和当前目录的差异
git stash show [<options>] [<stash>]

# 从堆栈中移除某个指定的 stash
git stash drop [-q|--quiet] [<stash>]

# 将当前 stash 中的内容弹出，并应用到当前分支对应的工作目录上
# pop: 将堆栈中最近保存的内容删除
# apply: 不会将内容从堆栈中删除，也能够将堆栈的内容多次应用到工作目录中
#        适应于多个分支的情况
git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]

# 从最新的stash创建分支
git stash branch <branchname> [<stash>]

# 保存当前的修改，将工作区或者暂存区储藏起来
git stash save

# 保存当前的修改，将工作区或者暂存区储藏起来
git stash [push [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet]
       [-u|--include-untracked] [-a|--all] [-m|--message <message>]
       [--pathspec-from-file=<file> [--pathspec-file-nul]]
       [--] [<pathspec>…​]]

# 清除堆栈中的所有内容
git stash clear
```
