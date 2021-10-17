---
title: How to make third parties faster
url-slug: abc-345
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: "100002052594007"
description: third parties
rssDescription: third parties
date:
  published: 2021-10-17T08:34:35.035Z
  modified: 2021-10-17T08:34:35.062Z
---
One of the reasons your Lighthouse score might be bad is third parties. 

Many (not all, though!) third parties execute a lot of JavaScript. This blocks the main thread & worsens your JS-related Lighthouse metrics (TTI/TBT). 

Here’re several ways to optimize them – a thread



1) Check if all third parties are needed 

Sometimes, we add an analytics script, experiment with it, and then forget to remove it. 

Go to DevTools → Network, filter away your domain, then go over “Domains” and see if there’s anything you (or the marketing team) don’t recognize.

https://twitter.com/iamakulov/status/1313258121037574149/photo/1



2) Use a timer 

Some third-parties can be delayed without hurting the business. Eg marketing is often fine with delaying Facebook Pixel – they don’t care about retargeting to users that spent less than 10s on the site. 

In this case, just tune the script code to use a timer:

https://twitter.com/iamakulov/status/1313258125433221132/photo/1



3) Delay until the app is initialized 

JS-heavy third parties can steal the CPU capacity from your app – and make the app initialize longer. 

To avoid this, load third parties after the app has finished initializing. E.g., in React, wrap the third-party code into useEffect():

https://twitter.com/iamakulov/status/1313258130009137152/photo/1



4) Delay till a relevant button is clicked 

When you use a chat widget (like Intercom), the widget typically loads in the background – but often stays fully hidden until the user clicks “Chat with support”. 

In this case, load the widget only when the button is actually clicked:

https://twitter.com/iamakulov/status/1313258134295773193/photo/1



5) Replace with server-side tools 

Cloudflare, Netlify, and many other CDNs have server-side analytics. It has less data compared to a client-side one – but if you simply want to track pageviews, it’s more than enough. 

Bonus: server-side analytics doesn’t miss adblock users!

https://twitter.com/iamakulov/status/1313258140956229638/photo/1



6) Remove from unnecessary pages 

Do you only show ads on desktop but hide them on mobile? Or do you only care about retargeting users who visit /cart/ but not /? 

If so, load the script only when it’s needed. E.g., here’s how to configure a GTM tag to fire only on /cart/:

https://twitter.com/iamakulov/status/1313258147621089281/photo/1



7) “What about delaying till the first interaction?” 

Some folks load third parties only when the user scrolls/clicks for the first time. 

This improves the Lighthouse score but doesn’t actually improve the UX. For real users, third parties still execute, so the page still lags.



This probably won’t improve your SEO either. 

As far as I know, SEO ranking relies on Chrome UX report – not on Lighthouse. And CrUX data is collected from real visitors – who actually interact with your page and whom this trick won’t affect.



8) “What about requestIdleCallback()?” 

requestIdleCallback sounds like it’s perfect for delaying CPU-heavy third parties. However, in practice, it fires way too early (after ~50-100 ms of idleness). This means it can fire while your app is still initializing. Use tip 2) or 3).