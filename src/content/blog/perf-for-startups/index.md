---
title: 'Quick apps in 3 steps'
alternativeTitles:
  social: 'Quick apps in 3 steps'
  seo: 'Quick apps in 3 steps – a (short) guide into web performance for startups'
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: '100002052594007'
description: 'What to do if you want to have a quick app – but don’t have enough time for that'
rssDescription: |
  Ever been in a situation when you wanted to build a quick app – but didn’t have enough time to invest into the performance?

  We wrote about the three most significant things that help with web performance and don’t take a lot of time.
socialImage: './cover-facebook.png'
date:
  published: 2019-06-11T14:00:00
  modified: 2020-01-26T14:00:00
---

[Web performance is important.](https://wpostats.com) But often, you don’t have time for it.

So, what to do if you want a quick app but can’t invest into performance at the moment? From my experience, there’re three things that yield the best performance results without large investments of time.

## 1️⃣ Switch to Next.js (or Nuxt.js)

[Next.js](https://github.com/zeit/next.js/) is a lightweight framework for React apps that automatically applies lots of complex performance-relates optimizations (server-side rendering, per-route code splitting, proper webpack configuration, etc.). You just write the code as usual, whereas Next.js does a bunch of heavy tuning behind the scenes.

The only major requirement of Next.js – the one that helps it to do all these optimizations – is that you have to structure your routes on the file system. So, if your app has 4 pages:

```
/
/profile
/profile/settings
/about
```

you’ll need to create 4 files to render them:

```
pages/index.jsx
pages/profile/index.jsx
pages/profile/settings/index.jsx
pages/about/index.jsx
```

A good place to start is [a performance-oriented Next.js introduction at `web.dev`](https://web.dev/performance-as-a-default-with-nextjs/).

:::note
[Nuxt.js](https://nuxtjs.org/) is a similar framework for Vue.js.
:::

## 2️⃣ Connect Cloudflare (or another CDN service)

[Cloudflare](https://cloudflare.com/) is a CDN provider slash web-performance-as-a-service company. You sign up for Cloudflare, connect your site to it, and Cloudflare starts proxying your traffic and applying optimizations like image compression, Brotli, or HTTP/2 on the fly.

Cloudflare has free and paid plans; free plans work quite well, but paid plans allow doing more advanced optimizations. Start with a free plan – and make sure to enable [the most useful optimization toggles](https://gist.github.com/iamakulov/106264563793c5e47049ddcc60372ece).

<div class="note">

Cloudflare is the tool that I personally like the most. But if you want to explore alternatives, there’re a few other similar services:

- [Fastly](https://www.fastly.com/)
- [StackPath](https://www.stackpath.com/)
- [KeyCDN](https://www.keycdn.com/)

</div>

## 3️⃣ Review your dependencies every 3-6 months

I’ve seen a number of apps to get huge and slow because

- either it depends on a library that has a large unnecessary dependency under the hood;

- or it depends on several similar libraries (e.g., checkbox components) because they were added by different developers.

To avoid this, pick a day every 3-6 months to analyze your app bundle and understand what shouldn’t be there. [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) would help with this; and I also wrote [a guide about what to look on during the analysis](https://developers.google.com/web/fundamentals/performance/webpack/monitor-and-analyze#analyze_why_the_bundle_is_so_large).

## Summing up

- Next.js is very easy to start with. It will be harder to migrate if you already have an existing app, but it might still be worth the try

- Cloudflare and dependency review work great for both new and existing apps

- Use these practices if you don’t have time to invest into performance

- And check out [Web Performance 101](/talks/web-perf-101) if you want to learn more
