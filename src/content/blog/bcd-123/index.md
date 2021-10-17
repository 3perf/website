---
title: /*#​__PURE__*/
url-slug: bcd-123
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: "100002052594007"
description: PURE
rssDescription: PURE
date:
  published: 2021-10-11T20:33:36.020Z
  modified: 2021-10-11T20:33:36.040Z
---
If you ever looked inside a non-minified bundle, you might’ve seen a lot of automatically generated comments that look like this: 

/\*#​\_\_PURE\_\_\*/ 

Even wondered what they are for? Here’s a short thread

https://twitter.com/iamakulov/status/1353650608750825472/photo/1



1) In 2016, folks noticed that when you transpile a JS class with Babel, the class isn’t removed during tree-shaking. Even if it’s not used anywhere. 

React was heavily relying on classes back then, so this was a pretty huge deal for React apps.

<https://github.com/mishoo/UglifyJS/issues/1261>

https://twitter.com/iamakulov/status/1353650617437270017/photo/1



2) Why was this happening? 

Back then, classes were just a syntactic sugar around functions. So, to transpile a class, Babel was converting it into a function – and wrapping that function into an IIFE (immediately invoked function expression):

https://twitter.com/iamakulov/status/1353650624731222020/photo/1



3) Well, a problem with an IIFE is that UglifyJS (which did tree shaking in webpack back then) doesn’t know whether it’s safe to remove it. 

An IIFE may simply create a class and do nothing else, like above. But it also may send a request to the server. UglifyJS doesn’t know!

https://twitter.com/iamakulov/status/1353650631454691329/photo/1



4) To solve this, /\*#​\_\_PURE\_\_\*/ was born. 

Babel started to add /\*#​\_\_PURE\_\_\*/ comments in front of IIFEs it generates (as it knows they don’t have any side effects). 

And UglifyJS started to recognize these comments – and dropping pure function calls if their result isn’t used.

https://twitter.com/iamakulov/status/1353650639662952448/photo/1



5) Fast forward to 2021: 

— Terser replaced UglifyJS in webpack (and is still responsible for most of tree shaking)

 — A lot of other tools adopted /\*#​\_\_PURE\_\_\*/ comments (eg babel-preset-react – for React.createElement – or babel-plugin-styled-components – for styled.whatever)

https://twitter.com/iamakulov/status/1353650650438119424/photo/1

— /\*#​\_\_PURE\_\_\*/ annotations were documented on the Terser website, along with a couple others: [https://terser.org/docs/api-reference.html#annotations…](https://t.co/ieCyZdFq3R?amp=1) 

— This topic remains my favorite conference trivia (because /\*#​\_\_PURE\_\_\*/ plays a huge role today, and I rarely meet people who know about it!)

https://twitter.com/iamakulov/status/1353650657799110656/photo/1