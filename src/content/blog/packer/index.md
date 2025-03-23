---
title: 'Performance Archaeology: Packer.js, a JS Minifier from 2004'
alternativeTitles:
  social: 'Performance Archaeology: Packer.js'
  seo: 'Performance Archaeology: Packer.js, a JS Minifier from 2004'
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://iamakulov.com
  twitterId: iamakulov
  facebookId: '100002052594007'
description: 'Reverse-engineering a surprisingly effective JS minifier from 2004'
rssDescription: |
  Back in 2018, while doing a performance audit for a client, I stumbled upon an unusually-looking piece of code:

  <code>eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String))...</code>

  This code was weird. Why an <code>eval()</code>? What’s with <code>p,a,c,k,e,r</code> which clearly combines into some name? I couldn’t help but dig into that, and the trip took me all the way back to 2004.
socialImage:
  facebook: './cover-facebook.jpg'
  twitter: './cover-twitter.jpg'
date:
  published: 2025-03-23T20:00:00
  modified: 2025-03-23T20:00:00
---

Back in 2018, when doing a performance audit for a client, I stumbled upon an unusually-looking piece of code:

```javascript{wordWrap: true}
/*!
 * Head JS
 * Copyright       Tero Piirainen
 * License         MIT
 * Version         1.0.3
 *
 * https://github.com/headjs/headjs
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(newRegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7(n,t){"1A 1B";7 r(n){a[a.A]=n}7 k(n){m t=31 32(" ?\\\\b"+n+"\\\\b");c.19=c.19.29(t,"")}7 p(n,t){C(m i=0,r=n.A;i<r;i++)t.J(n,n[i],i)}7 Y(){m t,e,f,o;c.19=c.19.29(/ (w-|Z-|V-|E-|K-|F-|1C|1a-1C|1D|1a-1D)\\d+/g,"");t=n.2a||c.33;e=n.2b||n.L.1E;u.L.2a=t;u.L.2b=e;r("w-"+t);p(i.2c,7(n){t>n?(i.Q.V&&r("V-"+n),i.Q.E&&r("E-"+n)):t<n?(i.Q.K&&r("K-"+n),i.Q.F&&r("F-"+n)):t===n&&(i.Q.F&&r("F-"+n),i.Q.Z&&r("e-q"+n),i.Q.E&&r("E-"+n))});f=n.2d||c.34;o=n.2e||n.L.1F;u.L.2d=f;u.L.2e=o;u.G("1C",f>t);u.G("1D",f<t)}7 12(){n.1b(b);b=n.14(Y,1G)}m y=n.1H,1c=n.35,1n=n.36,c=y.1I,a=[],i={2c:[37,38,39,3a,3b,3c,3d,3e,3f,3g,3h],Q:{V:!0,E:!1,K:!0,F:!1,Z:!1},1d:[{1o:{2f:6,2g:11}}],R:{V:!0,E:!1,K:!0,F:!1,Z:!0},2h:!0,1J:"-1J",1e:"-1e",M:"M"},v,u,s,w,o,h,l,d,f,g,15,e,b;x(n.S)C(v N n.S)n.S[v]!==t&&(i[v]=n.S[v]);u=n[i.M]=7()...'
```

This code was weird. Why an `eval()`? What’s that obfuscated code string? Luckily, the beginning of the file gave a hint where it came from:

```javascript
eval(function(p,a,c,k,e,r){...
```

:::sidenote[[GitHub mirror of Packer](https://github.com/evanw/packer/tree/master?tab=readme-ov-file)]
After a bit of research, I found the answer: this code was produced by a tool called [Packer](https://web.archive.org/web/20120929074838/http://dean.edwards.name/packer/)! (Duh.)
:::

Packer is a JavaScript minifier made by Dean Edwards, and it appears to be one of the very first tools of its kind. It was released [in 2004](https://web.archive.org/web/20040404032900/http://dean.edwards.name/packer/); for comparison, [Closure Compiler](https://googlecode.blogspot.com/2009/11/introducing-closure-tools.html) – a JS minifier made by Google and written in Java – was published in 2009, and [UglifyJS](https://github.com/mishoo/UglifyJS-old/tree/v1.0) – a minifier that was a de-facto standard in 2010s until it got replaced by its fork Terser – was released around 2011. The only minifier that precedes Packer (and that I’m aware of) is [JSMin](https://www.crockford.com/jsmin.html), from 2001.

A typical minifier compresses code by [removing whitespace, shortening variable names](https://esbuild.github.io/try/#dAAwLjI0LjIALS1taW5pZnkAZnVuY3Rpb24gc3VtKC4uLmFyZ3MpIHsKICBsZXQgcmVzdWx0ID0gMDsKICBmb3IgKGNvbnN0IGkgb2YgYXJncykgcmVzdWx0ICs9IGk7CiAgcmV0dXJuIHJlc3VsdDsKfQoKc3VtKDEsIDIsIDMp), and other similar tricks. Packer, however, does something completely different. How does it work?

# How Does Packer Work?

:::sidenote[[Live mirror of Packer 3.0](https://web.archive.org/web/20120929074838/http://dean.edwards.name/packer/)]
The latest available version of Packer is 3.0, published in Aug 2007. If you paste some example code into its UI:
:::

```javascript
function sum(arguments) {
  var result = 0;
  for (var i = 0; i < arguments.length; ++i) result += arguments[i];
  return result;
}

console.log(sum(10, 20, 30))
```

:::sidenote[With “Base62 encode” unchecked, Packer will simply remove the whitespace and skip the whole `eval(function(p,a,c,k,e,r)` thing. Boring!]
then check “Base62 encode” and click “Pack”, you’ll get code that starts exactly like the one from the beginning of this article:

<!-- prettier-ignore -->
```javascript{wordWrap: true}
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 4(2){5 3=0;7(5 1=0;1<2.8;++1)3+=2[1];9 3}a.b(4(c,d,e))',15,15,'|i|arguments|result|sum|var|function|for|length|return|console|log|10|20|30'.split('|'),0,{}))
```

:::

What does this code do? Let’s format it:

```javascript
eval(
  (function (p, a, c, k, e, r) {
    e = function (c) {
      return c.toString(a);
    };
    if (!''.replace(/^/, String)) {
      while (c--) r[e(c)] = k[c] || e(c);
      k = [
        function (e) {
          return r[e];
        },
      ];
      e = function () {
        return '\\w+';
      };
      c = 1;
    }
    while (c--)
      if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p;
  })(
    '6 4(2){5 3=0;7(5 1=0;1<2.8;++1)3+=2[1];9 3}a.b(4(c,d,e))',
    15,
    15,
    '|i|arguments|result|sum|var|function|for|length|return|console|log|10|20|30'.split(
      '|',
    ),
    0,
    {},
  ),
);
```

and try to understand what each of its parts does:

- **High-level structure**

  ```javascript
  eval(
    (function (p, a, c, k, e, r) {...})
    (...)
  )
  ```

  At the high level, the code declares a function (`function (p, a, c, k, e, r)`), immediately calls it with some arguments, and then passes the return value into `eval()`.

  `p`, `a`, `c`, `k`, `e`, and `r` are the function’s arguments, and they receive the following values:

- **Argument 1 (`p`)**

  ```javascript{wordWrap: true}
  /* p = */ '6 4(2){5 3=0;7(5 1=0;1<2.8;++1)3+=2[1];9 3}a.b(4(c,d,e))';
  ```

  This is the minified version of the original code! Note how

  - all special characters in the original code remain unchanged in the minified code: `for (var i = 0; i < arguments.length; ++i)` becomes `7(5 1=0;1<2.8;++1)`
  - but all keywords are replaced with numbers or letters: `function sum(arguments)` becomes `6 4(2)`, and `console.log()` becomes `a.b(...)`

  What do these numbers (`6`, `4`, `2`, etc) and letters (`a`, `b`, etc) correspond to? These seem to come from...

- **Argument 4 (`k`)**

  ```javascript
  /* k = */ "|i|arguments|result|sum|var|function|for|length|return|console|log|10|20|30"
    .split("|"),

  // Results in
  // ['', 'i', 'arguments', 'result', 'sum', 'var',
  //   'function', 'for', 'length', 'return', 'console',
  //   'log', '10', '20', '30']
  ```

  These are keywords extracted from the original code.

  When Packer minifies `function sum(arguments)`, it extracts each keyword, puts it into this array, and replaces each keyword with its index in the array (in [base-62 encoding](https://en.wikipedia.org/wiki/Base62)). So `function sum(arguments)` becomes `6 4(2)`, and `console.log(...)` becomes `a.b(...)`.

  Why is item 0 in this array empty? That’s because number `0` is already used in the original code (`var result = 0`). Keeping that number as-is results in smaller code than replacing it with an index.

- **Arguments 2 (`a`) and 3 (`c`)**

  ```javascript
  /* a = */ 15,
  /* c = */ 15,
  ```

  These arguments specify extra details about the keywords array above.

  Argument 2 is the base of the encoding used to index keywords. A few paragraphs above, I said keywords are encoded using base-62 encoding, but that’s not actually true. Technically, the base of the encoding is variable, and can be anything from 1 to 62. In practice, it always equals the number of keywords – unless there are more than 62 keywords, in which case it’s just 62. This is equivalent to fixed base-62 encoding, so I’m not sure why 62 isn’t just hard-coded.

  Argument 3 is the number of all keywords in the array.

- **Arguments 5 (`e`) and 6 (`r`)**

  ```javascript
  /* e = */ 0,
  /* r = */ {},
  ```

  Arguments 5 and 6 are always `0` and `{}`. They’re used to store some intermediate data.

- **Runtime**

  ```javascript
  function (p, a, c, k, e, r) {
    e = function (c) {
      return c.toString(a);
    };
    if (!"".replace(/^/, String)) {
      while (c--) r[e(c)] = k[c] || e(c);
      k = [
        function (e) {
          return r[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--)
      if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    return p;
  }
  ```

  Finally, this is the _runtime_ of Packer. It takes the minified code (<code>"6 4(2){5 3=0;<wbr />7(5 1=0;1<2.8;++1)<wbr />3+=2[1];<wbr />9 3}<wbr />a.b(4(c,d,e))"</code>) and the list of keywords (<code>"|i<wbr />|arguments<wbr />|result<wbr />|sum<wbr />|var<wbr />|function<wbr />|for<wbr />|length<wbr />|return<wbr />|console<wbr />|log<wbr />|10<wbr />|20<wbr />|30"</code>) – and replaces each identifier in the first string with the corresponding keyword from the second string. Once it’s done, it returns the unminified code string:

  ```javascript{wordWrap: true}
  'function sum(arguments){var result = 0;for(var i=0;i<arguments.length;++i)result+=arguments[i];return result;}console.log(sum(10, 20, 30))';
  ```

  which is then passed into `eval()` and executed.

  :::note
  The implementation becomes a little more complicated if the code is longer – mostly because `someNumber.toString(radix)` doesn’t accept radixes larger than 36, so it needs extra logic to handle more than 36 keywords. But it’s still essentially the same. Look, tho, dynamically generated runtime!
  :::

Yay! We’ve gotten through how Packer works. Now, the key question is:

# Is Packer Effective?

JavaScript tools went a long way since 2007. So how does Packer compare to the latest minifiers?

Let’s compare it by minifying jQuery 1.3.2. With the latest 2025 Terser, it gets down to 54 KB:

![Image.png](https://res.craft.do/user/full/2ece4b12-4ceb-0b26-7909-17063832b522/doc/035FFCB9-A8B2-447D-ABAB-5F009423C20E/B3E8A67D-5D47-448E-AFD9-8227ED881C42_2/hfiTiJCy28nkYqJb0Hsto0vAKtGaDVBxbhZ0UfCd1iIz/Image.png)

With Packer, however, it gets down to 40 KB (14 KB less):

![Image.png](https://res.craft.do/user/full/2ece4b12-4ceb-0b26-7909-17063832b522/doc/035FFCB9-A8B2-447D-ABAB-5F009423C20E/2B24D07D-1915-458C-87BA-73DA6434778C_2/1WMu28Afb9hyUAhihh0gqxKd5BlfnXPnCuYPxVxNMRUz/Image.png)

...What?

Let’s check with another library, Three.js. Terser gets it down to 358 KB:

![CleanShot 2025-03-01 at 20.58.35@2x.png](https://res.craft.do/user/full/2ece4b12-4ceb-0b26-7909-17063832b522/doc/035FFCB9-A8B2-447D-ABAB-5F009423C20E/C6EF4FAF-1DED-4EE6-90E8-B17527035229_2/5LwywNhRqEXOT5TfY2oaFZMhfaKkQrNPVZFNoSHLp8Yz/CleanShot%202025-03-01%20at%2020.58.352x.png)

Packer gets it down to 266 KB (almost 100 KB less):

![CleanShot 2025-03-01 at 20.58.51@2x.png](https://res.craft.do/user/full/2ece4b12-4ceb-0b26-7909-17063832b522/doc/035FFCB9-A8B2-447D-ABAB-5F009423C20E/ED7BA7DE-BDCB-44A6-B058-7F16C4589566_2/FEmEiidcWkkUssMXBwIy7xpwlIcA1LMqSA525x7w0bQz/CleanShot%202025-03-01%20at%2020.58.512x.png)

How is Packer so effective?!

It turns out this has to do with Packer minifying not only variable names (which Terser does excellently), but also keywords, object fields, and similar strings that are unminifiable with normal minifiers. E.g., if you take this code:

```javascript
const cat = { name: 'Biba', age: 3, color: 'black' };
const dog = { name: 'Rex', age: 4, color: 'brown' };
const bird = { name: 'Tweety', age: 2, color: 'yellow' };

console.log(cat, dog, bird);
```

and minify it with Terser, you’ll get something like this:

<!-- prettier-ignore -->
```javascript
const a={name:"Biba",age:3,color:"black"}
const b={name:"Rex",age:4,color:"brown"}
const c={name:"Tweety",age:2,color:"yellow"}
console.log(a,b,c)
```

Packer, however, will get you down to this:

```javascript
eval(function(p,a,c,k,e,r){...}(
  '0 7={1:"a",5:3,6:"b"}0 8={1:"c",5:4,6:"d"}0 9={1:"e",5:2,6:"f"}g.h(7,8,9)',
  18,
  18,
  'const|name||||age|color|cat|dog|bird|Biba|black|Rex|brown|Tweety|yellow|console|log'.split('|'),
  0,
  {}
))
```

Notice how `const`, `name`, `age`, and `color` (which are repeated over and over in the Terser version) get replaced with a single number in the Packer version? That‘s what ultimately helps the Packer version to be smaller.

:::sidenote[Of course, it’s not always Gzip – it [could also be Brotli or zstd](https://paulcalvano.com/2024-03-19-choosing-between-gzip-brotli-and-zstandard-compression/). But I’m not getting into the trenches here.]
Does this mean you should use Packer as your minifier of choice? Absolutely not. Every modern properly configured server applies yet another level of compression to any text file it sends. This compression is called Gzip, and it [does the same thing Packer does](https://3perf.com/talks/web-perf-101/#http-brotli-1): deduplicates repeated strings. Except it’s _much_ more effective at that:

```shell
# Terser
$ cat ./jquery-1.3.2.terser.min.js | wc -c  # Size before gzip
55120
$ cat ./jquery-1.3.2.terser.min.js | gzip-size  # Size after gzip
18.6 kB

# Packer
$ cat ./jquery-1.3.2.packer.min.js | wc -c  # Size before gzip
41022
$ cat ./jquery-1.3.2.terser.min.js | gzip-size  # Size after gzip
20.6 kB
```

And this is just the size aspect. Packer relies on `eval()`, and `eval()` is terrible because it’s unsafe, [incompatible with Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_eval_expressions), [disables some V8 optimizations](https://groups.google.com/g/v8-users/c/jlISWv1nXWU), and so on.

# Bonus: Packer is ES2015-Compatible

Fun fact: Packer is ES2015+-compatible! Packing

```javascript
function* getAnimals() {
  yield { name: 'Biba', age: 3, color: 'black' };
}

for await (const animal of getAnimals()) {
  console.log(animal);
}
```

produces:

```javascript
eval(function(p,a,c,k,e,r){...}(
  '2*0(){4{5:"6",7:3,8:"9"}}a b(c 1 d 0()){e.f(1)}',
  16,
  16,
  'getAnimals|animal|function||yield|name|Biba|age|color|black|for|await|const|of|console|log'.split('|'),
  0,
  {}
))
```

which evaluates with no issues. This is surprising for a tool from 2007, and is also pretty amusing given that [it took years](https://github.com/mishoo/UglifyJS/issues/448) for UglifyJS – the then-most-popular minifier – to support ES2015.

How does Packer support ES2015+? Modern minifiers work by parsing a JavaScript file into [an abstract syntax tree](https://astexplorer.net/). Any new syntax they don’t recognize breaks that process. Packer, however, is incredibly simple; its implementation takes [less than a thousand lines of code](https://github.com/tholu/php-packer/blob/master/src/Packer.php), and the only thing it does is string manipulation. For this tool, any keywords – no matter if from ES3 or from ES2018 – are just words to replace! So as long as you don’t rely on [automatic semicolon insertion](https://en.wikibooks.org/wiki/JavaScript/Automatic_semicolon_insertion) a bit too much:

```javascript
function* getAnimals() {
  yield { name: 'Biba', age: 3, color: 'black' };
}

for await (const animal of getAnimals()) {
  console.log(animal);
}

// Gets packed into (roughly)
//
// function*getAnimals(){yield{name:"Biba",age:3,color:"black"}}
// for await(const animal of getAnimals()){console.log(animal)}
//
// and works.
//
// But

function* getAnimals() {
  yield { name: 'Biba', age: 3, color: 'black' }; // no semicolon here
  yield { name: 'Rex', age: 4, color: 'brown' }; // no semicolon here either
  yield { name: 'Tweety', age: 2, color: 'yellow' };
}

for await (const animal of getAnimals()) {
  console.log(animal);
}

// gets packed into (roughly)
//
//   function*getAnimals(){yield{name:"Biba",age:3,color:"black"}yield{name:"Rex",age:4,color:"brown"}yield{name:"Tweety",age:2,color:"yellow"}}
//   for await(const animal of getAnimals()){console.log(animal)}
//
// and crashes with
//
//   Uncaught SyntaxError: Unexpected identifier 'yield'
//
// because you need a `;` after the `yield`s
```

...Packer will just work.
