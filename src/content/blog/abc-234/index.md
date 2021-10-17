---
title: How to improve Cumulative Layout Shift
url-slug: abc-234
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: "100002052594007"
description: Cumulative Layout Shift
rssDescription: Cumulative Layout Shift
date:
  published: 2021-10-17T08:22:58.363Z
  modified: 2021-10-17T08:22:58.387Z
---
Have an issue with Cumulative Layout Shift? Here’re a few tips on how to find and fix it:



1) Layout shift frequently occurs when you have a responsive image. 

Before the image is loaded, its size is unknown, so the browser keeps its container at 0. After the image starts loading, the browser learns it size – and resizes the container. 

Boom! Layout shift.

https://twitter.com/i/status/1377605419254870023



To fix this, make sure you always set \`width\` and \`height\` attributes on all images. These attributes tell the browser the image’s aspect ratio – and allows it to reserve the correct amount of space ahead of time.

https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/





2) Layout shift frequently occurs when you use a custom font with font-display: swap. 

The custom font loads → text switches to it and becomes smaller/larger → boom! layout shift 

To avoid this, tune the fallback font size to match the custom font with [https://meowni.ca/font-style-matcher/…](https://t.co/8VRDfykXC3?amp=1)

https://twitter.com/i/status/1377605426913632258

3) If CLS is high, how can you find the cause? 

My favorite way is through WebPageTest. 

Open [http://webpagetest.org](https://t.co/sx3ZwlC7vj?amp=1) → run a test of your page → click “Filmstrip view” → click “Highlight layout shifts” 

You’ll see how the page loads – with layout shifts highlighted in red:

https://twitter.com/iamakulov/status/1377605436883533825/photo/1



But note: not all layout shifts are equal! Some move the layout by 1 px, whereas others move it by 500. 

To find layout shifts that actually matter, look below each frame. WebPageTest will show each shift’s score (+ the total CLS value). 

Focus on shifts with the highest score.

https://twitter.com/iamakulov/status/1377605446152896514/photo/1



4) Want even more data on layout shifts? Use Chrome DevTools. 

Go to the Performance tab. Start recording → reload the page → stop recording. 

In the “Experience” row, you’ll see all captured shifts. And if you click one, you’ll see concrete pixels & nodes that were shifted:

https://twitter.com/iamakulov/status/1377605453316775938/photo/1



You can even move your mouse between “Moved from” and “Moved to” rows and see how exactly an element shifted:

https://twitter.com/i/status/1378467382130311170



5) And here’s my recent discovery. 

There’re two ways to get the CLS score: by running the page through Lighthouse, or by looking into “field data” (CrUX/Google Search Console). 

Sometimes, field data gives you a large value, but you can’t reproduce it with Lighthouse:

https://twitter.com/iamakulov/status/1378467756702633984/photo/1



This is a problem: you can’t fix what you can’t reproduce. 

The reason this happens is that in Lighthouse, CLS is measured during page loading. Whereas in field data, it’s measured until the page is closed. 

So if a shift happens after the page loads, Lighthouse won’t catch it.



What to do in this situation? Once the page is loaded, try scrolling it. 

Sometimes, layout shift is triggered by a block that pops up during scrolling. 

Sometimes, by a lazy-loaded image without concrete dimensions. 

Lighthouse can’t catch that, but you \*will\* see it.

https://twitter.com/i/status/1378467805155229712