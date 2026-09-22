# Hydration mismatch LCP playground

```sh
npm install
npm start
```

Open <http://localhost:4173>, start a Chrome DevTools Performance recording,
and reload the page. Stop after “Hydration complete” appears.

The client bundle is intentionally delayed by four seconds. Before it arrives,
the heading paints and then switches to a larger font. Its time differs between
the server and client renders, so React replaces the server DOM during
hydration. The trace should contain an early
`LargestContentfulPaint::Candidate` and another around the four-second mark.
