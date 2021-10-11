---
title: How to optimize a bundle by removing duplicates
url-slug: cde-123
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: "100002052594007"
description: optimize a bundle
rssDescription: optimize a bundle
date:
  published: 2021-10-11T21:00:37.489Z
  modified: 2021-10-11T21:00:37.508Z
---
Okay, let’s talk about bundle duplicates. A common issue in JS bundles is duplicated dependencies. E.g., lodash, core-js, some polyfill libs are frequently bundled multiple times. Here’s how to detect and solve this issue: a thread

https://twitter.com/iamakulov/status/1262391881364897796/photo/1



Why does a dependency gets duplicated? 

— Sometimes, different libraries use different versions of this dep. E.g., your app uses core-js v3 but fbjs uses core-js v1

 — Sometimes, there’re different \*editions\* of the dep. E.g., your app uses lodash-es but babel uses lodash



1) How to check if you have duplicated dependencies: 

a) Run webpack-bundle-analyzer and look around for similar library names (eg lodash/lodash-es). Example: [https://twitter.com/iamakulov/status/1223681798489759752…](https://twitter.com/iamakulov/status/1223681798489759752) 

b) Install duplicate-package-checker-webpack-plugin, do a build, and check the output. Example:

https://twitter.com/iamakulov/status/1262391884804231169/photo/1



5) It looks like some lodash methods are (unnecessarily) bundled as separate packages – which adds some duplicate code. See \`lodash\`, \`lodash.clonedeep\` & \`lodash.uniqby\` in the pic

2) How to understand why a package is bundled multiple times: 

a) Run yarn why <package-name>. This will show you all versions of the package – and why they are installed:

https://twitter.com/iamakulov/status/1262391886716776449/photo/1



How to understand why a package is bundled multiple times: 

b) Use [http://webpack.github.io/analyse/](https://t.co/oEL288iaKR?amp=1) 

— Run a webpack build with \`--profile --json\`

 — Upload the JSON

 — Find your module, click on it, and you’ll see the reason it’s bundled:

https://twitter.com/i/status/1262391889048764421



How to deduplicate duplicated packages: 

a) Use webpack’s resolve.alias to deduplicate dependencies: [https://webpack.js.org/configuration/resolve/#resolvealias…](https://t.co/6CrsumEDla?amp=1) 

Example:

https://twitter.com/iamakulov/status/1262391891359866890/photo/1



How to deduplicate duplicated packages: 

b) Use yarn resolutions to force Yarn to install only a single version of the package: [https://classic.yarnpkg.com/en/docs/selective-version-resolutions/…](https://t.co/2lTTK6tbPk?amp=1) 

Example:

https://twitter.com/iamakulov/status/1262391893549252617/photo/1