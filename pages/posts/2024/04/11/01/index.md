---
layout: post
title: 以 OneBot V11 协议为例了解 Web 通信
categories: ['教程']
draft: true
date: 2024-04-11
updated: 2024-04-11
---

<!-- markdownlint-disable MD033 -->

[OneBot V11](https://github.com/botuniverse/onebot-11) 是一个机器人协议，一般针对即时通信平台 QQ。虽然其有很多缺陷，但应用很广泛。  
本文将以 OneBot V11 协议为例，尽量以易懂的方式引导大家了解 Web 通信的基本原理。

<!-- more -->

## 认识 URL

> 参考：[什么是 URL？](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)

让我们先来简要认识 URL 的部分结构。

以下面这段 URL 为例，我们可以把它拆分为以下几个部分：

<div class="language-txt vp-adaptive-theme">
  <pre class="shiki shiki-themes github-light github-dark vp-code"><code v-pre><span class="line"><span class="bg-emerald-300! dark:bg-emerald-700! px-2px rounded-2px mx-1px">ws</span><span>://</span><span class="bg-cyan-300! dark:bg-cyan-700! px-2px rounded-2px mx-1px">127.0.0.1</span><span>:</span><span class="bg-purple-300! dark:bg-purple-700! px-2px rounded-2px mx-1px">8000</span><span class="bg-yellow-300! dark:bg-yellow-700! px-2px rounded-2px mx-1px">/onebot/v11/ws</span></span></code></pre>
</div>

其中：

- `ws://` 表示这是一个 WebSocket 连接。  
  假如这里是 `http://`，那么这代表一个 HTTP 请求。
- `127.0.0.1` 表示要连接的服务器地址。  
  有时候这里是一个域名，形似 `lgc2333.top`，这时程序会自动把这里的域名解析为 IP 地址以供连接。
- 服务器地址后的 `:8000` 表示要连接目标服务器的 `8000` 端口。  
  如果没有特殊需求，可以省略这段内容，程序会自动使用默认端口。在 `ws` 协议中，默认的端口是 `80`。  
  端口范围应为 `0` ~ `65535`，其中 `0` ~ `1023` 为系统保留端口，一般不会用于普通应用。
- `/onebot/v11/ws` 表示要向服务器请求的目标资源的路径。

## Web 服务器、HTTP 与 WebSocket 协议

> 参考：[HTTP 概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)

OneBot V11 协议基于 Web 通信，Web 通信的基础是 HTTP 协议。

HTTP 是一种 客户端——服务器 协议，也就是说，请求由客户端发起，服务器收到客户端的请求后，向客户端发送它所需要的数据。  
服务器永远是被动的一方，只有客户端主动发起请求，服务器才会响应。

那当我们需要服务器主动向客户端推送数据时，该怎么办呢？聪明的开发者们想到了 定时轮询（短轮询） 与 长轮询 这两种方式，不过这两种方式效率较低，资源耗费较大，并没有在 OneBot V11 中使用到，有兴趣可以 [自己了解](https://www.bilibili.com/video/BV1Rh4y167Uh)，这里就不介绍了。

之后 WebSocket 协议出现了，它允许服务器与客户端在单个连接上进行双向通信，这样服务器就可以向客户端主动推送数据了，同时客户端也可以在这条连接上向服务器发送数据。客户端需要主动连接服务器，发送一次特殊的 HTTP 请求（握手），服务器接受后，就可以建立 WebSocket 连接了。

## 关于协议端与应用端

在 OneBot V11 协议中：

- **协议端**会直接接入聊天平台，将聊天平台的各种接口转为 OneBot V11 规范，以间接提供应用端使用该平台接口的一方。  
  例如：
  - [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)
- **应用端**会使用 OneBot V11 协议与协议端通信，以实现对聊天平台的操作。  
  例如：
  - [nonebot-adapter-onebot](https://onebot.adapters.nonebot.dev/)（基于 [NoneBot2](https://nonebot.dev/)）
  - [koishi-plugin-adapter-onebot](https://github.com/koishijs/koishi-plugin-adapter-onebot)（基于 [Koishi](https://koishi.chat/)）

**协议端** 与 **应用端** 并不是标准中的叫法，但是为了日常交流中表述方便，我们使用了这两个词汇。

## Work in progress
