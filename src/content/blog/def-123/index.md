---
title: How to find and fix unnecessary rerenders
url-slug: def-123
author:
  id: iamakulov
  name: Ivan Akulov
  link: https://twitter.com/iamakulov
  twitterId: iamakulov
  facebookId: "100002052594007"
description: unnecessary rerender
rssDescription: unnecessary rerender
date:
  published: 2021-10-17T08:00:35.416Z
  modified: 2021-10-17T08:00:35.464Z
---
Ever had a case when you type something in a React app, and it reacts super super slowly? 

One of the reasons that may happen is unnecessary rerenders. Here’s how to find and fix them (a thread)

https://twitter.com/i/status/1362397450456154114



1) First, note: \*not all rerenders are bad\*. 

Rerenders aren’t bad per se. If a component is small, a rerender would be cheap and won’t really affect performance. 

It only makes sense to optimize rerenders that actually make the app slower. How to find these?



2) My favorite way to do this is with React DevTools → Settings → “Highlight updates when components render”: [https://twitter.com/iamakulov/status/1275783591293857792…](https://twitter.com/iamakulov/status/1275783591293857792) 

Now, every time anything rerenders, you’ll see it highlight with green/yellow/red. The hotter the color, the more frequently it rerenders.

https://twitter.com/iamakulov/status/1275783591293857792



Eg here, at AirBnB, every time you type into the “Destination” field, the whole header rerenders. If the header is complex, this can make the app slow!

https://twitter.com/i/status/1362397462502244360



3) Another useful tool is React Profiler. Unlike “Highlight updates” (which highlights components that are rerendering too \*often\*) it finds what’s slow. 

Here’s how to use it.

1. Start the recording → do something → stop the recording. You’ll get a list of all rerenders:

https://twitter.com/iamakulov/status/1362397469552820227/photo/1



2. In every rerender, you’ll see each component’s self time¹. The higher’s self time, the yellower’s the component.

 (¹ — self time = the time it took for render() to execute. useEffect()/componentDidUpdate()/etc are not included!)

https://twitter.com/iamakulov/status/1362397476104331265/photo/1



3. And if you hover or click any component, you’ll also see \*why\* it rerendered. 

(This has to be enabled in Settings → Profiler → “Record why each component rendered while profiling”.)

https://twitter.com/iamakulov/status/1362397483243081734/photo/1



4) Now. You’ve found a component that rerenders too frequently or too slowly. How do you fix it? 

There are a few common patterns where a component rerenders unnecessarily. Here’s each one.



5) Not memoizing a component. 

By default, \*every\* component rerenders \*every\* time its parent rerenders. Even if its props don’t change. 

This is fine in most cases (see pt. 1), but if it’s slow, you may want to wrap it with React.memo (or use React.PureComponent).

https://twitter.com/iamakulov/status/1362397489047994369/photo/1



6) Passing a new function to a prop every time. 

This is common with event listeners: 

<Button onClick={() => ...} /> 

() => ... creates a new function every time. This makes \`onClick\` change with every rerender. 

To fix this, wrap the function with \`useCallback\`.

https://twitter.com/iamakulov/status/1362397494345420802/photo/1



7) Passing a new object or array every time. 

There’re a few cases when this can happen. Here’s one: 

<Avatar user={user || {}} /> 

If \`user\` is falsy, \`Avatar\` will receive a new object on every render. 

To fix this, store the {} outside of the component – to keep it constant.

https://twitter.com/iamakulov/status/1362397499328200706/photo/1



Here’s another: 

<Users ids={[http://users.map](https://t.co/RnxrmZ0Gie?amp=1)(user => [http://user.id](https://t.co/vtm9pdZT44?amp=1))} /> 

This calls \`.map()\` on every rerender – and \`.map\` returns a new array every time. This makes \`Users\` rerender every time. 

To fix this, wrap the \`.map\` operation with \`useMemo\`.

https://twitter.com/iamakulov/status/1362397504105496581/photo/1



8) Passing a new React element every time: 

<Header icon={<HamburgerIcon />} /> 

This recreates the <HamburgerIcon /> element on every render. 

To fix this: 

— pass HamburgerIcon instead of <HamburgerIcon /> 

— or store <HamburgerIcon /> outside this component – to keep it constant

https://twitter.com/iamakulov/status/1362397510254424068/photo/1



9) Returning a new object/array in react-redux’s useSelector(): 

const smth = useSelector(state => \[state.a, state.b]) 

react-redux rerenders the component when \`useSelector\` returns a new value. If that happens every time (like above), the component will also rerender every time



To fix this, 

a) split the single selector into multiple selectors, or 

b) use \`createSelector()\` from reselect.

https://twitter.com/iamakulov/status/1362397520362618881/photo/1

https://twitter.com/iamakulov/status/1362397520362618881/photo/2

10) Returning a new object/array in react-redux’s mapStateToProps. 

The previous issue affects \`mapStateToProps\` as well. The only difference is that react-redux compares fields of the returned object, not the object itself. 

The fix is similar!

https://twitter.com/iamakulov/status/1362397525169291264/photo/1



11) “Should I go over my codebase and fix all these issues now?” 

No. You don’t need to optimize every unnecessary rerender. A lot of rerenders are cheap and are not an issue at all. 

Find what’s slow. Then optimize that.



12) “But why can’t I just wrap every component with React.memo()?” 

You can, but you shouldn’t! React.memo() (or PureComponent) has a cost: it compares props every time anything changes. 

This may get expensive. And this increases complexity:

https://twitter.com/kentcdodds/status/940448899344433152