---
title: 'Hidden Cost of Hydration Mismatches'
description: 'A single hydration mismatch on a page tanks Largest Contentful Paint from green all the way to red'
rssDescription: |
  A single hydration mismatch on a page tanks Largest Contentful Paint from green all the way to red
date:
  published: 2026-06-27T00:00:00Z
  modified: 2026-06-27T00:00:00Z
---

I regularly help people with performance of their React apps. Here’s a common, but surprisingly obscure issue that I keep seeing over and over:

<mark>A single hydration mismatch on a page can tank Largest Contentful Paint from green all the way to red</mark>

To avoid it, it’s enough to avoid hydration mismatches. But to understand _why_ it’s an issue, you need to learn three separate facts that, together, form a puzzle.

:::note
**Refresher: what’s a hydration mismatch?** _[Hydration](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)_ is when React makes server-rendered DOM interactive, going over it, attaching all event listeners (`onClick` etc) to the right DOM nodes, and executing `useEffect`s. _Hydration mismatch_ happens when client-rendered DOM is different from server-rendered DOM – e.g.:

```javascript
function MyButton() {
  if (typeof window === 'undefined')
    return <div>Please wait for the app to load...</div>;

  return <button onClick={() => console.log('Clicked')}>Click me</button>;
}
```

In this situation, as React walks DOM, it expects to find a `button` and attach an `onClick` to it – but finds a `div` instead. This is a mismatch.
:::

## Fact 1: Hydration Mismatches Force a New DOM

:::sidenote[React used to just [patch hydration mismatches](https://legacy.reactjs.org/docs/react-dom-client.html#hydrateroot:~:text=It%20can%20patch%20up%20differences%20in%20text%20content%2C%20but%20you%20should%20treat%20mismatches%20as%20bugs%20and%20fix%20them.). But this was killed in React 18 [for correctness reasons](https://github.com/react/react/pull/22629).]
Hydration mismatches force React to recreate the DOM from scratch. If the server rendered `<span>Current time: 10:09</span>` but the client rendered `<span>Current time: 10:10</span>`, React would not simply patch the time, no. It would find the nearest `Suspense` boundary around this `<span>` and remount its whole DOM from scratch. If the app has no `Suspense` boundary, the entire page would remount.
:::

## Fact 2: Text Resizes When Fonts Load

Here’s another, unrelated piece of the puzzle.

If you use web fonts (and [`font-display: swap`](https://developer.chrome.com/docs/performance/insights/font-display)), it’s very common to see a behavior like this:

![{maxWidth: 300, border: true}](./assets/webpage-loading-example.mp4)

Different fonts usually have [different physical sizes even with the same `font-size`](https://type.today/en/journal/verticalmetrics). So when a web font loads, all text elements on the page usually change their size.

## Fact 3: LCP Measures Only New DOM Nodes

Here’s the third and final piece of this puzzle.

Largest Contentful Paint (LCP) is one of Google’s Core Web Vitals. It’s critical for SEO, and it measures how long it takes for the largest element on the page to render. [Here’s how it does that](https://web.dev/articles/lcp):

- _the first time the page becomes visible,_ the browser finds the largest text element or image on the page and records its size. This element becomes _the LCP candidate_, and the time when it appeared becomes _the LCP time_
- _whenever a new element gets added into DOM,_ the browser measures its size. If that element is larger than the previous LCP candidate, it becomes the new LCP candidate, and LCP time increases
  - this also happens whenever an image loads
- _as soon as the user interacts with the page,_ the browser stops new measurements

Critically for this puzzle, step 2 only runs when _new_ elements are added. If an existing element becomes larger, the browser [ignores that](https://web.dev/articles/lcp#how-are-element-layout-size-changes-handled):

![{clickable: true, caption: 'Click to enlarge', alt: 'A loading timeline of a “CurrentTime.com” page showing the clock at 10:09. When the text first becomes visible it’s 411×171 px (70,281 px²) and becomes the LCP candidate. After the web font loads, the same text grows to 411×180 px (73,980 px²), but because browsers don’t track size changes to existing elements, no new LCP candidate is recorded.'}](assets/lcp-candidates-without-mismatch.png)

## Resized Text + DOM Remount = 💥

Now let’s combine all pieces of the puzzle.

What happens when we have a) a text block that becomes larger when fonts load, and b) a hydration mismatch that remounts that text block? Here’s what:

![{clickable: true, caption: 'Click to enlarge', alt: 'The same loading timeline, but now hydration finds a mismatch (10:09 ≠ 10:10) and re-mounts the clock text as a brand-new DOM node at 411×180 px (73,980 px²). Because it’s a new element larger than the previous candidate, the browser records it as a new LCP candidate — pushing LCP all the way to the moment hydration completes.'}](assets/lcp-candidates-with-mismatch.png)

Ouch!

If it wasn’t for a hydration mismatch, LCP would occur when the text first becomes visible. On most web pages and an average 4G connection, this happens around the 1-2 second mark (safely in the green).

Unfortunately, in this case, hydration replaces all elements on the page. To the user, nothing changes: they still see the same text! But to the browser, React just deleted all DOM nodes and added a bunch of completely new nodes. Hence, the browser measures them, finds a text node that’s larger than previously recorded, and updates the LCP value.

Now, due to the mismatch, LCP is registered only when hydration completes. With an average 4G connection and a typical app, this would happen at the 5+ second mark (very much in the red).

## How to Deal With This

Avoid hydration mismatches. Fix them if you run into them.

If you can’t: wrap the element that causes a mismatch with `<Suspense>`. Then React would remount only that `<Suspense>` boundary (instead of the full DOM). Unless that element is also the LCP element, that would solve the issue.

_With thanks to [Andy Davies](https://andydavies.me/) who taught me to inspect LCP candidates in a Chrome trace and helped me discover this._
