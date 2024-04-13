---
layout: post
title: 以 OneBot V11 协议为例了解 Web 通信
categories: ['教程']
date: 2024-04-11
updated: 2024-04-12
---

<!-- markdownlint-disable MD033 -->

[OneBot V11](https://github.com/botuniverse/onebot-11) 是一个机器人协议，一般针对即时通信平台 QQ。虽然其有很多缺陷，但应用很广泛。  
本文将以 OneBot V11 协议为例，尽量以易懂的方式引导大家了解 Web 通信的基本知识。

这是本博客的第一篇文章，本人才疏学浅，如果有不足或建议，欢迎 评论 或 <a href="https://github.com/lgc2333/blog/pulls" target="_blank">发起 PR</a>。

感谢 GitHub Copilot、ChatGPT 辅助编写本文。

<!-- more -->

## 网络端口、服务器软件与客户端

在网络通信中，我们通常会把提供服务的一方称为 **服务器**，而请求服务的一方称为 **客户端**。

服务器软件通常会监听操作系统中的一个端口，等待客户端与这个端口通信。

::: tip 畅想
想象操作系统是一个大型商场，服务器软件是一家公司，服务器监听的端口则是这家公司在商场中租下并且派人运营的店面，而客户端则是商场中要光顾这家店的顾客。
:::

当客户端向服务器监听的端口发送请求后，服务器需要接受这个请求并发送客户端需要的响应数据或错误信息。

::: tip 畅想
这家店的员工在店铺里等啊等，终于等到了一位顾客光顾，这位顾客告诉了员工自己要购买的商品，员工马上就找到了顾客需要的东西，收下了顾客的给出的钱款，打印了小票，并把小票和对应的物品都交给了顾客。

接着来了另一位顾客，他向员工说明了自己的需求，但是员工告诉顾客，这里并没有他想要的东西，并打印了一张写着 “404 Not Found” 的纸条递给了顾客让他拿回去交差，这位顾客只好带着这张纸条失望的离开。
:::

服务器通常监听 `0.0.0.0` 地址，这代表服务器会接受来自来自任何网络接口的请求。  
假如你想让服务器只监听来自本机的请求，请让它监听 `127.0.0.1` 地址。

::: tip 畅想
店员告诉大型商场的工作人员：“外面好多奇奇怪怪的顾客，我好害怕，我只想接待自己这家大商场里的顾客，请只让我接待来自地址 `127.0.0.1` 的顾客吧！”工作人员把这件事转告给了商场保安，保安马上到店铺门口为这家店拦下了所有不属于自己商场的顾客。
:::

## HTTP 与 WebSocket 协议

> 参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview" target="_blank">HTTP 概述</a>

HTTP 是一种 客户端——服务器 协议，也就是说，请求由客户端发起，服务器收到客户端的请求后，向客户端发送它所需要的数据。  
服务器永远是被动的一方，只有客户端主动发起请求，服务器才会响应。

::: tip 畅想
想象 HTTP 服务器是从来不主动找你聊天的的朋友，只有在你主动去找他的时候，他才会给予一次回应。
:::

之后 WebSocket 协议出现了，它允许服务器与客户端建立长连接并进行双向通信，这样服务器就可以向客户端主动推送数据了，同时客户端也可以在这条连接上向服务器发送数据。客户端需要主动连接服务器，发送一次特殊的 HTTP 请求（握手），服务器接受后，就可以建立 WebSocket 连接了。

::: tip 畅想
WebSocket 服务器就像是一个添加上好友之后会主动找你聊天的朋友，他们可以随时向你发送消息，而你也可以随时向他们发送消息。
:::

::: info
在 WebSocket 诞生之前，聪明的开发者们也想到了 定时轮询（短轮询） 与 长轮询 等方式实现类似服务器主动向客户端推送数据的做法，不过这两种方式并没有在 OneBot V11 中使用到，有兴趣可以 <a href="https://www.bilibili.com/video/BV1Rh4y167Uh"  target="_blank">自己了解</a>。
:::

## 认识 URL

> 参考：<a href="https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL" target="_blank">什么是 URL？</a>

::: tip 畅想
作为你所在的操作系统大商场中任职的一员，你的上司给了你一张叫做 URL 的带着笔记的地图，让你去地图上指定的大商场内的一家店铺购买笔记中提到的他所需要的东西。
:::

以下面这段 URL 为例，我们可以把它拆分为以下几个部分：

<div class="language-txt vp-adaptive-theme">
  <pre class="shiki shiki-themes github-light github-dark vp-code"><code v-pre><span class="line"><span class="bg-emerald-300! dark:bg-emerald-700! px-2px rounded-2px mx-1px">ws</span><span>://</span><span class="bg-cyan-300! dark:bg-cyan-700! px-2px rounded-2px mx-1px">127.0.0.1</span><span>:</span><span class="bg-purple-300! dark:bg-purple-700! px-2px rounded-2px mx-1px">8000</span><span class="bg-yellow-300! dark:bg-yellow-700! px-2px rounded-2px mx-1px">/onebot/v11/ws</span></span></code></pre>
</div>

其中：

- **协议**（Protocol）- <code><span class="bg-emerald-300! dark:bg-emerald-700! px-2px rounded-2px mx-1px">ws</span><span>:<!---->//</span></code>  
  这部分内容中的 `ws` 表示这个 URL 是一个 WebSocket 连接。  
  假如这里是 `http://`，那么这个 URL 代表一个 HTTP 请求。  
  ::: tip 畅想
  这段笔记记录了到达地点后你需要以怎样的方式与店员沟通。旁边还以备注的形式写上了如果不遵守的话会挨一顿臭骂。
  :::

- **主机**（Host）- <code><span class="bg-cyan-300! dark:bg-cyan-700! px-2px rounded-2px mx-1px">127.0.0.1</span></code>  
  它表示要连接的服务器地址。  
  有时候这里是一个域名，形似 `lgc2333.top`，这时程序会自动把这里的域名解析为 IP 地址以供连接。
  ::: tip 畅想
  你看着地图上的这个 `127.0.0.1` 的地址，开始思考该怎么去到这个地方。突然想到，这个地址是不是有点眼熟？原来这个地址就是自己所在的大商场！
  :::

- **端口**（Port）- <code><span>:</span><span class="bg-purple-300! dark:bg-purple-700! px-2px rounded-2px mx-1px">8000</span></code>  
  它表示要连接目标服务器的 `8000` 端口。  
  如果没有特殊需求，可以省略这段内容，程序会自动使用默认端口。在 `ws` 协议中，默认的端口是 `80`。  
  端口范围应为 `0` ~ `65535`。
  ::: tip 畅想
  你看着笔记上特别标注的店铺编号 `8000`，心想，这次可不是去 `80` 号店铺，别走错了。
  :::

- **路径**（Path）- <code><span class="bg-yellow-300! dark:bg-yellow-700! px-2px rounded-2px mx-1px">/onebot/v11/ws</span></code>  
  表示要向服务器请求的目标资源的路径。
  ::: tip 畅想
  到达目的地之后，你成功让店员按照笔记上的路径找到了对应的商品，并结账带回给了上司。
  :::

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

OneBot V11 协议就基于 HTTP 与 WebSocket 这两种 Web 通信协议进行协议端与应用端的通信，根据使用的连接方式，由某一方充当服务器，另一方充当客户端，进行通信。  
注意两方中哪方会充当服务器由你使用的连接方式决定，并不是所有情况下协议端一定会充当服务器，例如反向 WebSocket 就需要客户端来充当服务器（详细内容下方会讲）。

## Work in progress
