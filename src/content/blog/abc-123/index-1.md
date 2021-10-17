---
title: Why reexports are bad for performance
url-slug: abc-123
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: "100002052594007"
description: reexport
rssDescription: reexport
date:
  published: 2021-10-11T19:21:35.801Z
  modified: 2021-10-11T19:21:35.834Z
---
Okay, let’s talk about reexports – and why they’re bad for loading and runtime performance.

Thread 

https://twitter.com/iamakulov/status/1331551351214645251/photo/1



A pattern I see pretty often is when a single file re-exports stuff from lots of other files. 

If your project has a \`components/index.js\` file which re-exports all your components (and does nothing else), that’s one example. 

This is bad for performance – for two reasons.

1. It makes code splitting ineffective. 

   When you do 

   import { Button } from './components'

   you’re importing not only Button but the whole ‘./components’ file. Which means you’re \*bundling\* the whole file – with all the components it exports.



Example. Say, we have a huge Icon component. Icon is used only in code that you’re code-splitting using import() 

We’d want Icon to be code-split as well, right? 

Due to the above, that won’t happen! Because the main chunk imports Button from ./components – and takes Icon with it



And this adds up. 

For one of clients I worked with, replacing the \`./components/index.js\` file with direct imports dropped around 200 KBs off the main bundle (~10% of its size).

https://twitter.com/iamakulov/status/1331551364636413953/photo/1



2. It makes bundle initialization more expensive. \
   Every time a browser downloads the bundle, it has to execute it – and all its modules as well. If there’re a lot of modules, or some of them do something expensive, this can take a while.

https://twitter.com/iamakulov/status/1331551374639853568/photo/1



When you’re doing reexports, if you are importing \*all\* components into the main chunk – even the ones the chunk doesn’t need. 

As a result, you’re making the main chunk initialize for longer. 

This worsens your TTI/TBT.



And this also adds up. 

For the same client, dropping \`components/index.js\` reduced the bundle init time from 400 to 340 ms. 

So, reexport files are convenient – but performance-wise, I’d say you should avoid them. 

</thread>



“But shouldn’t tree shaking help?” 

Tree shaking still works as expected here – it still drops all unused components (“unused” as in “unused in the application”). 

Tree shaking just doesn’t apply to components that are used in the app but are unused in the current chunk.



And this appears to be a great workaround for webpack (+ ESBuild, + other bundlers that support sideEffects: false):

https://twitter.com/wSokra/status/1331909789207638017