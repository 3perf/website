---
blog:
  title:
    visible: 'How to load polyfills only when needed'
    social: 'How to load polyfills only when needed'
    seo: 'How to load polyfills only when needed'
  author:
    id: iamakulov
    name: Ivan Akulov
    link: https://twitter.com/iamakulov
    twitterId: iamakulov
    facebookId: '100002052594007'
  description: 'I was asked: “How does one serve polyfills only to browsers that need them?”'
  rssDescription: |
    We’ve been asked:

    “These days, how do you typically serve polyfills only to browsers that need them?”

    Turns out the answer is large enough for a full article!
  socialImage:
    facebook: './cover-facebook.png'
    twitter: './cover-twitter.png'
  date:
    published: 2020-02-13T19:00:00
    modified: 2020-02-13T19:00:00
---

A colleague asked me:

> These days, how do you typically serve polyfills only to browsers that need them?

I know three ready-to-use approaches for that:

- [_polyfill.io_](#polyfillio)
- [the `module`/`nomodule` pattern](#modulenomodule)
- [the `useBuiltIns` option in `@babel/preset-env`](#babels-usebuiltins)


# polyfill.io

[_polyfill.io_](https://polyfill.io/) is a service that inspects the browser’s `User-Agent` and serves a script with polyfills targeted specifically at that browser.

With _polyfill.io_, you add a single script in front of your bundle:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
<script src="/bundle.min.js"></script>
```

and the script serves exactly the polyfills the visitor needs.

<div class="note">

_polyfill.io_ also [supports picking a subset of polyfills.](https://polyfill.io/v3/url-builder/) This is useful when, out of all modern JS features, you only use a few – e.g. `Map` and `Promise` – and don’t want to burden IE11 users with extra code.

</div>

## Tricky parts

<div class="list-wrapper_multiparagraph">

1. The _polyfill.io_ script will add 50-300 ms to your [Time to Interactive](https://web.dev/tti/). The script is (obviously) hosted on a server different from yours, and [loading stuff from a different server is costly](https://csswizardry.com/2019/05/self-host-your-static-assets/). The browser will have to spend extra 50-300 ms to setup a connection to the server, and this means adding 50-300 ms to your Time to Interactive.

   (Well, unless you resort to [self-hosting](https://github.com/Financial-Times/polyfill-library) or [complex CDN hacks](https://blog.annamalai.me/posts/replicating-polyfill.io-using-cloudflare-workers/).)

2. The _polyfill.io_ script might add these 50-300 ms to your [First Contentful Paint](https://web.dev/fcp/) as well – if you put it into `<head>` without an `async` or a `defer` attribute.

3. In the (unlikely) event of a _polyfill.io_ outage, your site will either get very slow, or will break in older browsers. The outage is unlikely because _polyfill.io_ relies on a CDN and has never gone down so far; but keep this in mind.

</div>

# module/nomodule

`module`/`nomodule` is a pattern when you serve scripts for modern browsers with `<script type="module">`, and scripts for older browsers with `<script nomodule>`:

```html
<!-- Full polyfill bundle for old browsers -->
<script nomodule src="/polyfills/full.min.js"></script>

<!-- Smaller polyfill bundle for browsers with ES2015+ support -->
<script type="module" src="/polyfills/modern.min.js"></script>

<!-- Bundle script. `defer` is required to execute
     this script after the `type="module"` one -->
<script src="/bundle.min.js" defer></script>
```

This pattern relies on the fact that old browsers – ones that don’t support ES2015 – will not load `type="module"` scripts – and _will_ load `nomodule` ones. Which means you can use `nomodule` to serve ES2015 polyfills exactly to browsers that need them!

So, in the snippet above:

- the `/polyfills/full.min.js` script will only load in browsers that don’t support ES2015 and don’t recognize the `nomodule` attrubute – e.g., IE11;
- the `/polyfills/modern.min.js` script will only load in browsers that support ES2015 and recognize `type="module"` scripts – [Chrome 61+, Firefox 60+, Safari 10.1+](https://caniuse.com/#feat=es6-module);
- the `/bundle.min.js` script will load in all browsers.

<div class="note">

Philip Walton wrote [a great detailed article about the `module`/`nomodule` approach](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/).

</div>

<div class="note">

There’s a bunch of guides and plugins for bundles and frameworks that help to implement the `module`/`nomodule` pattern, e.g.:

<div class="list-wrapper_oneline">

- [for webpack](https://dev.to/thejohnstew/differential-serving-3dkf)
- [for Babel](https://babeljs.io/docs/en/babel-preset-env#targetsesmodules)
- [for Next.js](https://github.com/zeit/next.js/issues/7563#issuecomment-568569235)

</div>

</div>

## Tricky parts

1. Safari 10.1 is a quirk. It supports `type="module"` but doesn’t support the `nomodule` attribute. If you support this Safari version, [you’ll have to work around that](https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc).

2. The `module`/`nomodule` patters draws a split only between ES5 and ES2015+ browsers. ES2016 and newer standards added a bunch of other polyfillable features like `Array.prototype.includes()` or `Object.values()`. You’ll have to serve their polyfills to all ES2015+ browsers – even though most of these browsers won’t need them.

3. `type="module"` scripts [are always deferred](https://javascript.info/modules-intro#module-scripts-are-deferred). If you want to execute a `type="module"` polyfill before the regular bundle script, you have to add the `defer` tag to the bundle as well.

# Babel’s `useBuiltIns`

[`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) has an option called `useBuiltIns`. With this option, you can make Babel cherry-pick polyfills for specific browsers:

<!-- prettier-ignore -->
```js
// .babelrc
{
  "presets": [
    ["env", {
      // Specify browsers you’re targeting... 
      "targets": "> 0.25%, not dead",
      // ...and either...
      "useBuiltIns": "entry",
      // ...or
      "useBuiltIns": "usage"
    }]
  ]
}
```

With [`useBuiltIns: "entry"`](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-entry), Babel will replace the import of [`core-js`](https://github.com/zloirock/core-js) – the most common polyfill library – with specific polyfills required for browsers you’re targeting. So if you’re targeting only the latest Chrome and Firefox, `@babel/preset-env` will strip unnecessary polyfills for you:

```js
// Before → 293 polifylls bundled
import 'core-js';

// After → 87 polyfills bundled
import 'core-js/modules/es.array.unscopables.flat';
import 'core-js/modules/es.array.unscopables.flat-map';
// ...
```

With [`useBuiltIns: "usage"`](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage), Babel will go even further and only add polyfills for methods you actually use:

<!-- prettier-ignore -->
```js
// Before → no polyfills bundled
console.log([5, 6, 7].includes(5));


// After → with `targets: "IE 11"` → 1 polyfill bundled
import 'core-js/modules/es.array.includes';
console.log([5, 6, 7].includes(5));


// After → with `targets: "Chrome >=70"` → 0 polyfills bundled
console.log([5, 6, 7].includes(5));
```

## Tricky parts

<div class="list-wrapper_multiparagraph">

1. `useBuiltIns: "entry"` is not very useful if you’re targeting old browsers, like IE 11. It might remove _some_ polyfills, like `Object.getPrototypeOf`, but most of them will stay in the bundle and would still be downloaded by everyone.

2. If you use _core-js 2_, `useBuiltIns: "usage"` will fail to add some of the newer polyfills. For example, it won’t polyfill this code:

   ```js
   [].flat();
   ```

   because it won’t know that `.flat()` is a method that requires polyfilling.

   To solve this, upgrade to _core-js 3_ which includes the latest polyfills.

3. `useBuiltIns: "usage"` will not add polyfills for your dependencies – unless you pipe `node_modules` through Babel. So if you aren’t cautious enough, you might get runtime error in older browsers.

4. In some cases, `useBuiltIns: "usage"` will add excessive polyfills. For example, with this code:

   ```js
   import { myVar } from './myModule';
   myVar.includes();
   ```
   
   `@babel/preset-env` has no way of knowing whether `myVar` is an array or a string – so it’d bundle polyfills both for `Array.prototype.includes` and `String.prototype.includes`.

</div>

# Summing up

All three widely supported solutions have their benefits and drawbacks:

- _polyfill.io_ → very easy to setup and doesn’t ship anything to modern browsers – but costly in terms of TTI (and, sometimes, FCP)
- _module/nomodule_ → has wide tooling support but only strips ES2015− polyfills
- _Babel’s `useBuiltIns`_: easy to setup for everyone who’s already using `@babel/preset-env`; but either not very useful if you’re targeting older browsers, or requires you to complile `node_modules` as well

The best solution would be a custom one: something that combines benefits of _polyfill.io_ and Babel’s `useBuiltIns` but doesn’t incur their costs. To do this, you may:

- build multiple bundles using Babel’s `useBuiltIns` and different target browsers – and serve the right bundle based on the user agent;
- or follow a Philip Walton’s [approach with client-side conditional loading](https://philipwalton.com/articles/loading-polyfills-only-when-needed/). 

<br>

_Thanks to [Nicoló Ribaudo](https://twitter.com/nicoloribaudo) for helping with the Babel section._
