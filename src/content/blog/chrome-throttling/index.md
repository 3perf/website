---
title: 'Chrome DevTools Throttling Is Not Accurate'
description: 'Chrome DevTools slows down requests, not packets. This means its throttling is often off.'
rssDescription: |
  The real network operates on packets. However, Chrome DevTools slows down requests, not packets. This means DevTools throttling is often pretty off.
date:
  published: 2026-04-14T00:00:00Z
  modified: 2026-04-14T00:00:00Z
---

I had several cases where someone complained about things being slow in Chrome with 3G or 4G throttling, and I had to explain why that’s not the case in real life. Here’s this argument so I can link to it in the future.

![{border: true, maxWidth: 477, caption: "One of the recent questions from a client at Framer"}](./client.png)

## Chrome Doesn’t Emulate A Slow Network Well

In the real world, the connection is usually slow for one of three reasons:

- _Bandwidth:_ This is what people usually mean when they say “network speed”. A network with low bandwidth (say, 3G with 780 kbps) can only let so many network packets through every second (~65, if each is 1500 bytes).
- _Latency:_ This is the delay between the server and the client. If each packet has to travel a long way (say, from the US to Australia), it will still take a while even when the network has enough bandwidth.
- _Packet loss:_ This is how many packets get lost on their way through the connection. If my `style.css` consists of 15 packets, but 4 of them get lost on the way to me, then the server has to re-send them again. Then, if one of those gets lost as well, the server has to re-send _that one_ again. All of this makes the file load slower.

:::note

**Packets? What the heck are packets?** When a server sends a file (like `style.css`) over the network, it splits it into several chunks, [attaches some metadata (“from: ..., to: ...”)](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_segment_structure), and sends those chunks one by one. These chunks are called packets, and they’re the smallest primitive a network operates on. If you’re interested in how this all works, you should read [High Performance Browser Networking](https://hpbn.co/) by Ilya Grigorik.

:::

Notice how all of these reasons are about _packets_. Chrome DevTools throttling doesn’t work with packets. Instead, it works with requests. Even though it’s designed to mimic the real network, this leads to a lot of inaccuracies:

- Bandwidth is split across all requests equally. It’s common for servers to [prioritize some requests over others](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/) – eg a more important image over a less important one – and send packets for the more important request first. DevTools throttling ignores that
- Stuff like [TCP slow start](https://calendar.perfplanet.com/2018/tcp-slow-start/), DNS lookup, [TCP handshake](https://hpbn.co/building-blocks-of-tcp/#three-way-handshake), and [TLS handshake](https://hpbn.co/transport-layer-security-tls/#tls-handshake) are either not emulated or not throttled
- :::sidenote[DevTools has [a setting for packet loss](https://developer.chrome.com/blog/new-in-devtools-124), but that’s for WebRTC only]
  Packet loss is impossible to simulate
  :::

As a consequence, DevTools throttling is often pretty approximate. [Per Google’s own documentation](https://github.com/GoogleChrome/lighthouse/blob/2b8caf21a3e9d03633b52e43e35e97291ae6553d/docs/throttling.md#types-of-network-throttling):

> Request-level throttling [...] is how throttling is implemented with Chrome DevTools. In real mobile connectivity, latency affects things at the packet level rather than the request level. <mark>As a result, this throttling isn’t highly accurate.</mark> It also has a few more downsides that are summarized in [Network Throttling & Chrome - status](https://docs.google.com/document/d/1TwWLaLAfnBfbk5_ZzpGXegPapCIfyzT4MWuZgspKUAQ/edit?tab=t.0#heading=h.buq49xxy577t). The TLDR: while it’s a [decent approximation](https://docs.google.com/document/d/10lfVdS1iDWCRKQXPfbxEn4Or99D64mvNlugP1AQuFlE/edit?tab=t.0#heading=h.xgjl2srtytjt), it’s not a sufficient model of a slow connection.

## Example: 12-second hero image

A Framer client recently asked why a 20 kB hero image would take 12-15 seconds to load on a 3G connection. They attached a screenshot from Chrome DevTools:

![](./client1-devtools.png)

:::sidenote[_Close-to-real?_ This test used [WebPageTest](https://www.webpagetest.org/), which does packet-level throttling.]
Upon investigation, it turned out that on a close-to-real 3G connection, the image would only take 300-500 ms to load:
:::

![](./client1-wpt.png)

:::sidenote[While writing this, I learned that [Chrome 117+ automatically prioritizes the first five large images it finds](https://web.dev/articles/fetch-priority#:~:text=As%20of%20Chrome%20117%2C%20the%20first%205%20large%20images%20are%20set%20to%20%22Medium%22%20to%20speed%20this%20up%2C%20and%20two%20of%20them%20can%20be%20fetched%20in%20parallel%20during%20the%20initial%20%22tight%20mode%22.).]
Why such a big difference? On a real network, the requests on this site are staggered. As the HTML arrives, the browser starts downloading images that it finds. High-priority images get requested first. Lower-priority images [get a little delay](https://web.dev/articles/fetch-priority#:~:text=For%20example%2C%20low%2Dpriority%20resources%20like%20images%20are%20often%20held%20back%20from%20being%20requested%20while%20the%20browser%20processes%20critical%20%3Chead%3E%20items.). The server [may also delay lower-priority resources](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/). As a result, the first few critical images on this site have a lot of bandwidth: it’s only split across a few requests.
:::

Chrome DevTools misses a lot of these details. They don’t actually throttle the network; under the hood, the connection is fast. On this fast connection, all images arrive at roughly the same time. And when they arrive, DevTools simulates the slow network by splitting the fake slow bandwidth [equally across all requests](https://www.debugbear.com/blog/chrome-devtools-network-throttling#limitations-of-devtools-bandwidth-throttling:~:text=However%2C%20DevTools%20bandwidth%20throttling%20divides%20available%20bandwidth%20equally%20across%20requests.%20That%20means%20a%20high%2Dpriority%20file%20might%20load%20early%20for%20real%20visitors%2C%20but%20load%20slowly%20in%20DevTools.). With several dozen images, that’s much less bandwidth for the critical one!

## What To Use Instead

Use tools that apply packet-level throttling:

- [WebPageTest](https://www.webpagetest.org/) is the gold standard for tests on specific networks and devices
- [Network Link Conditioner](https://nshipster.com/network-link-conditioner/) is an old-but-good Apple tool with a GUI to simulate slow networks on macOS
- [`@sitespeed.io/throttle`](https://www.npmjs.com/package/@sitespeed.io/throttle) is a CLI alternative for macOS and Linux
