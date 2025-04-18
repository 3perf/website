---
title: 'Preload, prefetch and other <link> tags'
alternativeTitles:
  social: 'Preload, prefetch and other <link> tags: what they do and when to use them'
  seo: 'Preload, prefetch and other <link> tags: what they do and when to use them'
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: '100002052594007'
description: ''
rssDescription: |
  Did you know HTML has as much as 5 different tags to preload something? We wrote a detailed deep-dive into each of them.<br /><br />

  🔬 How they look<br />
  ⚙️ What they do<br />
  🤷 And when to use each one<br />
socialImage: './cover-facebook.png'
date:
  published: 2019-03-18T20:00:00
  modified: 2021-05-11T12:00:00
---

There’re lots of ways to improve web performance (see [Web Performance 101](http://3perf.com/talks/web-perf-101) for a full overview). One of those ways is to preload content you’ll need later in advance. Prefetch a CSS file, prerender a full page, or resolve a domain ahead of time – and you won’t have to wait for it when it’s actually needed! Sounds cool.

What’s even cooler is that browsers have a simple built-in way to do all these things. There’re six `<link rel>` tags that instruct the browser to preload something:

```html
<link rel="prefetch" href="/style.css" as="style" />
<link rel="preload" href="/style.css" as="style" />
<link rel="preconnect" href="https://example.com" />
<link rel="dns-prefetch" href="https://example.com" />
<link rel="prerender" href="https://example.com/about.html" />
<link rel="modulepreload" href="/script.js" />
```

Here’s what they each of them does and when to use them.

![](./cover-facebook.png)

Jump to:

- [`preload`](#preload) – when you’re going to need a resource in a few seconds
- [`prefetch`](#prefetch) – when you need a resource for the next page
- [`preconnect`](#preconnect) – when you know you’ll need a resource soon, but you don’t know its full url yet
- [`dns-prefetch`](#dns-prefetch) – when you know you’ll need a resource soon, but you don’t know its full url yet (for older browsers)
- [`prerender`](#prerender) – when you’re certain most users will navigate to a specific page, and you want to speed it up
- [`modulepreload`](#modulepreload) – when you’re going to need an ES module script soon

# preload

`<link rel="preload">` tells the browser to download and cache a resource (like a script or a stylesheet) as soon as possible. It’s helpful when you need that resource a few seconds after loading the page, and you want to speed it up.

The browser doesn’t do anything with the resource after downloading it. Scripts aren’t executed, stylesheets aren’t applied. It’s just cached – so that when something else needs it, it’s available immediately.

## Example

```html
<link rel="preload" href="/style.css" as="style" />
```

`href` points to the resource you want to download.

`as` can be anything you can download in a browser:

- `style` for stylesheets,
- `script` for scripts,
- `font` for fonts,
- `fetch` for resources downloaded with `fetch()` or `XMLHttpRequest`,
- other values – see the full list [on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content#What_types_of_content_can_be_preloaded)

It’s important to specify the `as` attribute – it helps the browser to prioritize and schedule the download properly.

## When to use

**Use it when you’ll need a resource soon.** `<link rel="preload">` will help when you know you’ll need a resource soon after loading the page, and you want to start loading it earlier. For example:

- You use custom fonts. The `@font-face` rule that applies those fonts is in an external CSS file:

  ```html
  <!-- index.html -->
  <link rel="stylesheet" href="index.css" />
  ```

  ```css
  /* index.css */
  @font-face {
      src: url('comic-sans.woff2') format('woff2');
  }
  ```

  By default, `comic-sans.woff2` will start downloading only when `index.css` is fetched and applied. Instead of waiting for it that long, use `<link rel="preload">` to initiate the download sooner:

  ```html
  <link rel="preload" href="comic-sans.woff2" as="font" />
  ```

- You split your styles per [the Critical CSS approach](https://3perf.com/talks/web-perf-101/#css-block-rendering-1). With this approach, you’ll split your CSS into two parts – critical (required for immediate rendering) and non-critical:

  ```html
  <style>
    /* Inlined critical styles */
  </style>

  <script>
    /* Custom JS that starts downloading non-critical styles */
    loadCSS('/app/non-critical.css');
  </script>
  ```

  With this approach, non-critical styles will start downloading only when JavaScript starts executing – which can be a few seconds after the first render. Instead of waiting for JS to execute, use `<link rel="preload">` to initiate the download sooner:

  ```html
  <style>
    /* Inlined critical styles */
  </style>

  <link rel="preload" href="/app/non-critical.css" as="style" />

  <script>
    /* Custom JS that starts downloading non-critical styles */
    loadCSS('/app/non-critical.css');
  </script>
  ```

**Don’t overuse it.** Preloading everything won’t magically speed up the site – instead, it will likely prevent the browser from scheduling everything smartly.

**Don’t confuse with `prefetch`.** Don’t use `<link rel="preload">` if you don’t need a resource immediately after the page loads. If you only need it later – e.g., for a next page – use `<link rel="prefetch">`.

## More details

**It’s mandatory.** Unlike all other preload-related `<link>` tags (except [`modulepreload`](#modulepreload)), this tag is mandatory for the browser (if it supports the tag). A browser _has_ to download the resource specified in `<link rel="preload">`. With other tags described here, a browser is free to skip preloading the resource if it decides to – e.g. if the network is slow.

**Priorities.** For different kinds of resources (styles, scripts, fonts, etc.), browsers typically assign different priorities. This allows for downloading the most important resources first. For a resource fetched with `<link rel="preload">`, browsers use the `as` attribute to determine its priority. For Chrome, see [the full table of Chrome priorities](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc/edit#) for more details

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">2) How I find what to preload:<br><br>— Go to DevTools and run a performance recording of how the page loads<br>— Scroll through the Network section and find stuff that blocks page rendering but gets downloaded too late (= too much down in Network section). That’s usually CSS or JS<br><br>1/2 <a href="https://t.co/5Uem9U34jc">pic.twitter.com/5Uem9U34jc</a></p>&mdash; Ivan Akulov (@iamakulov) <a href="https://twitter.com/iamakulov/status/1080467599392206848?ref_src=twsrc%5Etfw">January 2, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# prefetch

`<link rel="prefetch">` asks the browser to download and cache a resource (like, a script or a stylesheet) in the background. The download happens with a low priority, so it doesn’t interfere with more important resources. It’s helpful when you know you’ll need that resource on a subsequent page, and you want to cache it ahead of time.

The browser doesn’t do anything with the resource after downloading it. Scripts aren’t executed, stylesheets aren’t applied. It’s just cached – so that when something else needs it, it’s available immediately.

## Example

```html
<link rel="prefetch" href="/style.css" as="style" />
```

`href` points to the resource you want to download.

`as` can be anything you can download in a browser:

- `style` for stylesheets,
- `script` for scripts,
- `font` for fonts,
- `fetch` for resources downloaded with `fetch()` or `XMLHttpRequest`,
- other values – see the full list [on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content#What_types_of_content_can_be_preloaded)

It’s important to specify the `as` attribute – it helps the browser to prioritize and schedule the download properly.

## When to use

**Use it for resources from other pages.** `<link rel="prefetch">` will help if you need a resource on a different page, and you want to preload it and speed up rendering of that page. For example:

- You have an e-commerce site, and 40% of your users go from the home page to a product page. Use `<link rel="prefetch">` to download CSS and JS files responsible for rendering product pages

- You have a single-page app, and you code-split it so that different pages load different bundles. When a user visits some page, ask your router what other pages it links to, and use `<link rel="prefetch">` to preload bundles for those pages

**It’s probably safe to use it as much as you want.** Browsers usually schedule prefetches with the lowest priority, so they don’t interfere with other resources. This means it’s probably safe to prefetch a lot of stuff. Keep in mind though that this will still use the user’s data – and there’s a chance that’ll cost them money!

**Don’t use for urgent resources.** Don’t use `<link rel="prefetch">` when you’ll need a resource in a few seconds. In this case, use `<link rel="preload">` instead.

## More details

**Not mandatory.** The browser is _not_ required to follow the `<link rel="prefetch">` instruction. This means it can decide not to fetch the resource – e.g. if the connection is slow.

**Priorities in Chrome.** In Chrome, `<link rel="prefetch">` downloads are usually prioritized with the lowest priority ([full table of priorities](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc/edit)). This means they are usually scheduled after everything else got loaded.

**`<link rel="next">` in Firefox.** In Firefox, `<link rel="next">` [behaves just like `<link rel="prefetch" as="document">`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ#what_are_the_prefetching_hints.3f) – it prefetches the linked HTML document. This is somewhat weird, and [there’s a bug from 2002](https://bugzilla.mozilla.org/show_bug.cgi?id=175418) arguing that this should be disabled to avoid unnecessary server requests. Thankfully, [there’s a way to disable this](https://stackoverflow.com/a/12312885/1192426) on a per-page basis. (Thanks to [Mike Harris](https://twitter.com/mikeyhaz) for letting me know about this!)

# preconnect

`<link rel="preconnect">` asks the browser to perform a connection to a domain in advance. It’s helpful when you know you’ll download something from that domain soon, but you don’t know what exactly, and you want to speed up the initial connection.

A browser has to set up a connection when it retrieves something from a new third-party domain. (A third-party domain is a domain that’s different from the one your app is hosted on.) This may happen when a site uses a font from Google Fonts, loads React from a CDN, or requests a JSON response from an API server.

Setting up a new connection typically takes several hundred milliseconds. It’s only needed once per domain, but it still takes time. If you set up a connection in advance, you’ll save that time and load resources from that domain faster.

## Example

```html
<link rel="preconnect" href="https://api.my-app.com" />
```

`href` points to the server you want to connect to.

## When to use

**Use it for domains you’ll need shortly.** `<link rel="preconnect" />` will help you when you have an important style, script, or image on a third-party domain, but you don’t know the resource URL yet. For example:

- Your app is hosted at `my-app.com`, and it makes AJAX requests to `api.my-app.com`. You don’t know what specific requests you’ll be making to that domain – because you make them dynamically from JS.

  Use `<link rel="preconnect">` to connect to `api.my-app.com` in advance and make the first data request faster

- Your app is hosted at `my-app.com`, and it uses Google Fonts. Google Fonts load fonts in two stages: first, a CSS file is downloaded from `fonts.googleapis.com`; then, that CSS file requests fonts from `fonts.gstatic.com`.

  You can’t know what specific font files from `fonts.gstatic.com` you’ll need until you download the CSS file from `fonts.googleapis.com`. Use `<link rel="preconnect">` to set up a connection in advance

**Use it to slightly speed up some third-party script or style.** If you have a third-party resource in the page that you really need to load sooner, add `<link rel="preconnect" />` for that domain. It will instruct the browser to setup connection for that domain sooner.

**Don’t overuse it.** Setting up and keeping a connection open is costly – both for a client and a server. The simple rule of thumb is: use this tag for 4-6 domains at most.

## More details

**Not mandatory.** The browser is _not_ required to follow a `<link rel="preconnect">` instruction. This means it can decide not to set up a new connection – e.g., if there’re already a lot of connections set up, or in some other case.

**What the connection process includes.** To connect to each site, a browser has to perform the following steps:

- _DNS resolution._ Find a server’s IP address (`216.58.215.78`) for a specified domain name (`google.com`)

- _TCP handshake._ Perform a roundtrip (a message goes client → server → client) to initiate a TCP connection to a server

- _TLS handshake (only for HTTPS sites)._ Perform two roundtrips (a message goes client → server → client → server → client) to initiate a secure TLS session

Note: this will change with HTTP/3 as it’s going to [improve and speed up the connection mechanism](https://http3-explained.haxx.se/en/feature-handshakes.html). That’s still far ahead though.

# dns-prefetch

`<link rel="dns-prefetch">` asks the browser to perform a DNS resolution of a domain in advance. It’s helpful when you know you’ll connect to that domain soon, and you want to speed up the initial connection.

A browser has to perform a DNS resolution when it connects to a new third-party domain. (A third-party domain is a domain that’s different from the one your app is hosted on.) This may happen when your site uses a font from Google Fonts, loads React from a CDN, or requests a JSON response from your API server.

For each new domain, resolving the DNS record usually [takes around 20-120 ms](https://www.keycdn.com/support/reduce-dns-lookups). It only affects the first resource downloaded from that domain, but it still matters. If you perform a DNS resolution in advance, you’ll save that time and load that resource faster.

## Example

```html
<link rel="dns-prefetch" href="https://api.my-app.com" />
```

`href` points to the domain name you want to resolve. The scheme doesn’t matter – both `https://api.my-app.com` and `//api.my-app.com` would work fine.

## When to use

**Use it for domains you’ll need shortly.** `<link rel="dns-prefetch" />` will help you when you have some important resources on third-party domains the browser doesn’t know about in advance. For example:

- Your app is hosted at `my-app.com`, and it makes AJAX requests to `api.my-app.com`. The browser doesn’t know that you’ll be making requests to that domain – because you make them from JS.

  Use `<link rel="dns-prefetch">` to resolve `api.my-app.com` and make the first data request faster

- Your app is hosted at `my-app.com`, and it uses Google Fonts. Google Fonts load fonts in two stages: first, a CSS file is downloaded from `fonts.googleapis.com`; then, that CSS file requests fonts from `fonts.gstatic.com`.

  The browser doesn’t know that you’ll load fonts from `fonts.gstatic.com`, so use `<link rel="dns-prefetch">` to resolve it in advance

**Use it to slightly speed up some third-party script or style.** If you have a third-party resource in the page that you really need to load sooner, add `<link rel="dns-prefetch" />` for that domain. It will instruct the browser to schedule DNS resolution for that domain sooner.

:::note

**Note on `<link rel="dns-prefetch" />` and `<link rel="preconnect" />`.** Using both of these tags for the same domain is not really useful – `<link rel="preconnect" />` already includes everything `<link rel="dns-prefetch" />` does, and more. However, it can still make sense in two cases:

- _You want to support older browsers._ `<link rel="dns-prefetch" />` is supported [starting from IE10 and Safari 5](https://caniuse.com/#feat=link-rel-dns-prefetch). `<link rel="preconnect" />` has been supported in Chrome and Firefox for a while, but was added to Safari only in 11.1, and [isn’t supported in IE/non-Chromium Edge](https://caniuse.com/#feat=link-rel-preconnect). If you need to support those browsers, use `<link rel="dns-prefetch" />` as a fallback for `<link rel="preconnect" />`.

- _You want to speed up more than 4-6 domains_. It’s not recommended to use `<link rel="preconnect" />` with more than 4-6 domains, as opening and keeping a connection is an expensive operation. `<link rel="dns-prefetch" />` is more lightweight, so use it for other third-party domains if you want to speed them up too.

:::

## More details

**Not mandatory.** The browser is _not_ required to follow a `<link rel="dns-prefetch">` instruction. This means it can decide not to perform the DNS resolve – e.g., if there's already a lot of them, or in some other case.

**What is DNS.** Each server on the internet is addressed by a unique IP address which looks like `216.58.215.78`. However, when you visit a site, you don’t type a server’s IP address – you use a site domain (like `google.com`). This works thanks to DNS (Domain Name System) servers – servers that map a domain (`google.com`) to a server’s IP address (`216.58.215.78`).

To resolve a domain name, the browser has to perform a request to a DNS server. This is what takes those 20-120 ms when you connect to a new third-party domain.

**DNS is cached, though not reliably.** Some operating systems and browsers cache your DNS requests. This would save time if you need to retrieve something from a third-party domain again – but don’t rely on it. Linux typically [doesn’t have DNS caching at all](https://stackoverflow.com/q/11020027/1192426). Chrome has a DNS cache, but [it only lives for a minute](https://unix.stackexchange.com/q/363498/19889). Windows caches DNS responses [for 5 days](https://www.itprotoday.com/cloud-computing/how-can-i-configure-how-long-dns-cache-stores-positive-and-negative-responses).

# prerender

`<link rel="prerender">` asks the browser to load a URL and render it in an invisible tab. When a user clicks on a link to that URL, the page should be rendered immediately. It’s helpful when you’re really sure a user will visit a specific page next, and you want to render it faster.

Despite (or because of?) its power, in 2019, `<link rel="prerender">` has bad support in major browsers. See [More details](#more-details-4) for more.

## Example

```html
<link rel="prerender" href="https://my-app.com/pricing" />
```

`href` points to the URL you want to render in the background.

## When to use

**When you’re really sure a user will go to some page next.** If you have a conversion funnel where 70% of visitors go from page A to page B, `<link rel="prerender" />` in page A might help to render page B super-quickly.

**Don’t overuse it.** Pre-rendering a page is extremely costly – both in terms of traffic and memory. Don’t use `<link rel="prerender" />` for more than one page.

## More details

**Not mandatory.** The browser is _not_ required to follow a `<link rel="prerender">` instruction. This means it can decide not to perform the prerender – e.g., if the memory is low, or the connection is slow.

**Chrome doesn’t do a full render.** Instead of a full render, Chrome [makes a _NoState Prefetch_](https://developers.google.com/web/updates/2018/07/nostate-prefetch) to save memory. This means Chrome downloads the page and all subsequent resources, but doesn’t render it or execute JavaScript.

**Firefox and Safari don’t support this tag at all.** This doesn’t break the specification, as browsers are not required to act on the tag; but this is still quite sad. Firefox has [an implementation bug](https://bugzilla.mozilla.org/show_bug.cgi?id=730101) which has been open for 7 years; and there are reports that state [Safari doesn’t support it too](https://twitter.com/bluesmoon/status/1108412360828563456).

# modulepreload

`<link rel="modulepreload">` tells the browser to download, cache, and compile a JS module script as soon as possible. It’s helpful when you use ES modules in production, and you want to load your app faster.

Why? Typically, if an app uses ES modules, browsers will load modules in several roundtrips. Imagine your app has a chain of imports:

```js
// /static/main.js
import Header from '/static/Header.js';
...

// /static/Header.js
import Logo from '/static/Logo.js';
import Link from '/static/Link.js';
...

// /static/Logo.js
import Img from '/static/Img.js';
...
```

If you simply add a `<script src="/static/main.js" type="module">` onto the page, the browser will discover

- that it needs `Header.js` – only after it downloads `main.js`

- that it needs `Logo.js` and `Link.js` – only after it downloads `Header.js`

- that it needs `Img.js` – only after it downloads `Logo.js`

and so on. And because the app can’t start working before all modules are downloaded, this makes the app load longer.

`<link rel="modulepreload">` solves this. With this tag, you tell the browser about each module your app has – and the browser discovers and downloads each module right away.

## Example

```html
<link rel="modulepreload" href="/static/Header.js" />
<link rel="modulepreload" href="/static/Logo.js" />
<link rel="modulepreload" href="/static/Image.js" />

<!-- Or if the module belongs to e.g. a service worker: -->
<link rel="modulepreload" href="/static/Header.js" as="serviceworker" />
```

`href` points to the module you want to preload.

`as` specifies which context the module belongs to:

- `script` – if the module is loaded by a regular `<script type="module">` tag
- `worker` – if the module is loaded by a web worker
- `serviceworker` – if the module is loaded by a service worker
- [and etc.](https://fetch.spec.whatwg.org/#request-destination-script-like)

`as` defaults to `script`, so, typically, you don’t need to specify it at all.

## When to use

**Use it to load your ES modules app faster.** As described above, this tag is only useful for preloading ES modules – i.e., modules you’re importing through `import ...` or `<script type="module">`.

If you want to preload a regular script, use [`<link rel="preload" as="script">`](#preload).

## More details

**Caching _and_ compiling.** `<link rel="modulepreload">` not only fetches the module and puts it into the network cache, but also compiles it into bytecode. This means when the module is needed, the browser can start executing it immediately.

This is unlike `<link rel="preload">` which caches a resource but doesn’t process it in any way.

**Why not `<link rel="preload" as="module">`?** `<link rel="modulepreload">` and `<link rel="preload">` seem very similar at first glance. But, it turns out, there are important low-level details that justified introducing a new keyword:

- `<link rel="modulepreload">` handles cross-origin requests (CORS) differently from `<link rel="preload">`

- `<link rel="preload">` re-fetches a resource if you change the `as` attribute whereas `<link rel="modulepreload">` doesn’t

and so on. For more details, see [a discussion in `whatwg/fetch`](https://github.com/whatwg/fetch/issues/486#issuecomment-282044172).

**Optional feature: loading dependencies.** The specification allows browsers to preload not only the module but all its imports as well. However, this is an optional feature; as of Sep 2020, no browsers implement this.

**Chrome only.** As of Sep 2020, `<link rel="modulepreload">` is only supported [in Chrome and Chromium-based browsers](https://caniuse.com/link-rel-modulepreload).

# Summing up

Preloading is great. It’s easy to enable it, and it gives you solid speed improvements if used right.

However, _right_ is the key word. If you `<link rel="preload">` a resource that’s not needed, you’ll steal bandwidth from other important resources. If you `<link rel="preconnect">` too many domains, you’ll occupy the CPU with opening connections – instead of doing other important work. It’s a powerful tool, so it has to be used carefully.

Preload wisely, stay cautious, and [test all your performance changes to make sure they actually help](https://github.com/davidsonfellipe/awesome-wpo#analyzers).

More links:

- [Preload, prefetch and priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf): Addy Osmani’s deep-dive into how Chrome handles preloading and how it affects performance
- [Prefetching, preloading, prebrowsing](https://css-tricks.com/prefetching-preloading-prebrowsing/): Robin Rendle’s overview of all preload-related tags on CSS-Tricks
