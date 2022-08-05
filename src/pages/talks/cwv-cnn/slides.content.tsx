import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { ImageFluid } from '../../../components/Image';
import { SlideGatsbyImage } from '../../../components/talks/Slide';
import {
  LiveDemo,
  Mark,
  SectionHeader,
  Slide,
  BlockVideo,
  Contents,
  ContentsInner,
} from '../styled';
import demo1 from './live-demos/demo1.mp4';
import demo2 from './live-demos/demo2.mp4';
import demo3 from './live-demos/demo3.mp4';
import demo4 from './live-demos/demo4.mp4';
import demo5 from './live-demos/demo5.mp4';
import demo6 from './live-demos/demo6.mp4';
import demo7 from './live-demos/demo7.mp4';
import demo8 from './live-demos/demo8.mp4';
import slide14Video from './slides/slide14.mp4';

// TODO: audience. Apart this for engineers (more links, technical content, etc.)

const SlidesContent = ({
  allSlides,
  sectionHeaders,
}: {
  allSlides: Record<string, ImageFluid | undefined>;
  sectionHeaders: Record<string, ImageFluid | undefined>;
}) => {
  const getSlideSafe = (
    slides: Record<string, ImageFluid | undefined>,
    slideId: string,
  ): ImageFluid => {
    const slide = slides[slideId];
    if (slide) {
      return slide;
    }

    throw new Error(`Slide ${slideId} not found`);
  };

  return (
    <>
      <Slide
        slideId="cnn-home"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide2')} />
        }
      >
        <p>
          To learn about Core Web Vitals, let’s take a look at the CNN site!
        </p>
        <p>
          CNN is a large American media company. For media, performance matters
          because the faster the site is, the better is typically the engagement
          and the search traffic.
        </p>
        <Contents>
          Jump to:
          <ContentsInner>
            <ol>
              <li>
                <a href="#lcp">Largest Contentful Paint</a>
                <ol>
                  <li>
                    <a href="#server-response-time">Server Response Time</a>
                  </li>
                  <li>
                    <a href="#render-blocking-resources">
                      Render-Blocking Resources
                    </a>
                  </li>
                  <li>
                    <a href="#late-hero-image">Late Hero Image</a>
                  </li>
                </ol>
              </li>
              <li>
                <a href="#fid">First Input Delay</a>
                <ol>
                  <li>
                    <a href="#third-parties">Third Parties</a>
                  </li>
                  <li>
                    <a href="#hydration">Hydration</a>
                  </li>
                </ol>
              </li>
              <li>
                <a href="#cls">Cumulative Layout Shift</a>
                <ol>
                  <li>
                    <a href="#ad-video">Ads or Videos</a>
                  </li>
                  <li>
                    <a href="#image-dimensions">Image Width And Height</a>
                  </li>
                  <li>
                    <a href="#font-display-swap">font-display: swap</a>
                  </li>
                </ol>
              </li>
            </ol>
          </ContentsInner>
        </Contents>
      </Slide>
      <Slide
        slideId="cases"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide3')} />
        }
      >
        <p>
          Like, for example, Financial Times redesigned their website in 2017 –
          and tests showed that{' '}
          <a href="https://wpostats.com/2017/03/10/ft-engagement.html">
            the new site gets up to 30% more engagement
          </a>
          . Or GQ, a fashion magazine, in 2015, made their site 5 times faster –{' '}
          <a href="https://wpostats.com/2015/11/20/gq-load-time.html">
            and their traffic increased by 80%
          </a>
          .{/* TODO: link to 3perf client as well */}
        </p>
        <p>Anyway. Numbers, numbers, numbers, numbers. Back to CNN.</p>
      </Slide>
      <Slide
        slideId="cnn-perf"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide5')} />
        }
      >
        {/* TODO: replace the slide with Field Data */}
        <p>
          The CNN website is, surprisingly, pretty slow. The Lighthouse score of
          a single news page is 6.
        </p>
        <p>
          And Core Web Vitals aren’t good either. Largest Contentful Paint is
          3.7 seconds (yellow), Cumulative Layout Shift is 0.18 (yellow), and
          only First Input Delay is green (45 ms).
        </p>
        <p>
          <small>These measurements were done in November 2020.</small>
        </p>
        <p>
          <small>
            In this talk, you’ll see “PageSpeed Insights” and “Lighthouse” used
            interchangeably. That’s because PageSpeed Insights uses{' '}
            <a href="https://github.com/GoogleChrome/lighthouse">Lighthouse</a>{' '}
            under the hood, so both tools calculate the performance score{' '}
            <a href="https://calibreapp.com/blog/how-performance-score-works">
              in the same way
            </a>
            .
          </small>
        </p>
      </Slide>
      <Slide
        slideId="lcp"
        isSectionHeader={true}
        image={
          <SlideGatsbyImage
            imageData={getSlideSafe(sectionHeaders, 'slide6')}
          />
        }
      >
        <p>Let’s start with Largest Contentful Paint (LCP).</p>
      </Slide>
      <Slide
        slideId="lcp-meaning"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide7')} />
        }
      >
        <p>
          <a href="https://web.dev/lcp">
            <em>Largest Contentful Paint</em>
          </a>{' '}
          is how much time it takes for the page to render the largest page
          element (hero image, or the largest text paragraph, or something
          else).
        </p>
        <p>
          “LCP is 3 seconds” means that, in that specific test, the time between
          the page started loading and between the largest page element rendered
          was 3 seconds.
        </p>
        <p>
          To analyze LCP, I am going to use two tools. The first one is Chrome
          DevTools, which you must’ve used already. And the second one is
          WebPageTest.
        </p>
      </Slide>
      <LiveDemo
        slideId="live-demo-devtools-webpagetest"
        title="WebPageTest"
        videoSource={demo1}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/*<Slide slideId="subtitles" image={null}>
        <p>
          What is WebPageTest? It’s an advanced performance analysis tool. It’s
          available at WebPageTest.org; it traces how the page loads and gives
          back lots of information in an easy-to-consume format. Yes, it looks a
          bit dated, and it could be a bit too advanced at times… But that’s
          probably its only drawback. Otherwise, it’s great.
        </p>

        <p>
          In this case, I am going to use WebPageTest – and I am going to show
          you how to use WPT – to look at the loading waterfall – and figure out
          why CNN’s largest contentful paint is so, well, large.
        </p>

        <p>So, in order to do that,</p>
        <p>* I am going to go into WebPageTest;</p>
        <p>* I’m going to paste the URL into the address bar;</p>
        <p>
          * I am going to change the browser setting to Moto G4 – Chrome (one
          thing I love about WebPageTest is that it allows you to test on real
          mobile devices. Not just emulated mobile, like in Chrome DevTools –
          but actual physical mobile phones)
        </p>
        <p>
          * I am also going to change the connection to 4G to make it closer to
          what PageSpeed Insights runs with
        </p>
        <p>* and I am going to start the test</p>

        <p>
          Awesome. So, to save time I'm not going to wait until the test
          finishes, because I already have a completed test with the same
          settings. So I'm going to just switch to that test and proceed
          forward. Here’s the test.
        </p>

        <p>
          So, the test page has lots of info, and it could be overwhelming at
          times. But, right now, we only care about two pieces.{' '}
        </p>
        <p>
          * **Core Web Vitals.** First, it’s Core Web Vitals. Here, CWV are
          measured specifically at this device. And yeah, they look not so good.
        </p>
        <p>
          * **Waterfall.** Second, it’s the network waterfall. It’s a waterfall
          of all resources that are loaded over network, and it’s located right
          here: …. CNN downloads a lot of stuff, and I’m pretty sure most of
          that is third parties – and that’s the reason why the TBT is high –
          but for now we’re talking about the LCP, so let’s focus on that.
        </p>

        <p></p>
      </Slide>*/}
      <Slide
        slideId="lcp-focus-areas"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide8')} />
        }
      >
        <p>
          So, to debug LCP, we’re going to use Chrome DevTools and WebPageTest.
          Now, how do we actually debug LCP? There are three things I typically
          focus on first when auditing LCP:
        </p>
        <ul>
          <li>server response time,</li>
          <li>render-blocking resources, and</li>
          <li>a late hero image</li>
        </ul>
        <p>
          These issues, in my experience, tend to affect LCP most frequently.
        </p>
      </Slide>
      <SectionHeader id="server-response-time">
        Server response time
      </SectionHeader>
      <Slide
        slideId="server-response-time-1"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide9')} />
        }
      >
        <p>
          The first issue that frequently worsens LCP is server response time.
        </p>
        <p>
          If a server is slow at serving HTML, it’s going to take longer for a
          browser to load the HTML and render the page. The same holds true for
          CSS and{' '}
          <a href="/talks/web-perf-101#async-and-defer">
            render-blocking JavaScript
          </a>
          .
        </p>
      </Slide>
      <LiveDemo
        slideId="live-demo-server-response-time"
        title="Server Response Time"
        videoSource={demo2}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/*<Slide slideId="demo" image={null}>
        <p>
          So how do you check if this has an effect, how do you check if your
          server is actually slow? This is easy to do both in WPT and in Chrome
          DevTools.
        </p>
        <p>
          * In WebPageTest, you have this huge waterfall. So what you do is you
          click that waterfall, you scroll down, and you click on some responses
          – say, on the HTML response. This opens a dialog with a detailed info
          – with lots of information, a large part of which is not available in
          Chrome DevTools – about that request. So, there’s a lot of stuff here.
          But what we actually care about is the “Time to First Byte” value.
        </p>
        <p>
          * [If you’re using Chrome DevTools, you can also see this in Chrome
          DevTools. If you open the page, open Chrome DevTools, click reload,
          click the network entry, and switch to “Usage”, you’ll see time to
          first byte here as well. And here, TTFB is 40 ms.]
        </p>
        <p>
          So, in this case, time to first byte is actually great. It’s 190 ms
          in the WebPageTest setup and X ms from my local computer – and this is
          a great time. I’d say all values below 300 ms are pretty good. So, in
          the CNN’s case, this doesn’t seem to be the issue.
        </p>
      </Slide>*/}
      <Slide
        slideId="server-response-time-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide10')} />
        }
      >
        <p>
          As we saw above, the server response time isn’t an issue for CNN. But
          if <em>your</em> server response time turns out to be bad, what can{' '}
          <em>you</em> do?
        </p>
        <p>
          My go-to recommendation is to employ a CDN – like{' '}
          <a href="https://www.cloudflare.com">Cloudflare</a> or{' '}
          <a href="https://www.fastly.com">Fastly</a>. A CDN{' '}
          <a href="/talks/web-perf-101#cdn">
            will host your resources close to the user
          </a>{' '}
          – and will greatly reduce your server response time.
        </p>
        {/* TODO: remove bitly/holy-perf-links */}
      </Slide>
      <Slide
        slideId="cdn"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide11')} />
        }
      >
        <p>
          A CDN works great for static resources – like styles, scripts, or
          images, – but it doesn’t help much with dynamic ones. If you’re
          dynamically generating your HTML pages on the server, you’re a bit out
          of luck – those pages would still have a high server response time.
        </p>
        <p>
          But if you need just a tiny bit of interactivity – eg the only dynamic
          part of the page is a footer where you’re showing a different phone
          number based on the country – you can move that server logic to the
          CDN level as well. And that can be done with edge functions.
        </p>
        <p>
          With an edge function, you put your logic into a small function and
          upload it to the CDN. Then, the function runs on every request in the
          same servers that serve your cached files. This means the logic run
          close to the user, and the server response time is small.
        </p>
        <p>
          Almost every CDN has its version of edge functions. Cloudflare has{' '}
          <a href="https://workers.cloudflare.com">Workers</a>, AWS CloudFront
          has <a href="https://aws.amazon.com/lambda/edge/">Lambda@Edge</a>,
          Netlify has{' '}
          <a href="https://functions.netlify.com">Netlify Functions</a>, and
          Fastly has{' '}
          <a href="https://www.fastly.com/products/edge-compute/serverless">
            Compute@Edge
          </a>
          .
        </p>
      </Slide>
      <SectionHeader id="render-blocking-resources">
        Render-Blocking Resources
      </SectionHeader>
      <Slide
        slideId="render-blocking-resources-1"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide12')} />
        }
      >
        <p>Back to CNN. If it’s not server response time, then what?</p>
        <p>
          Another common issue that makes a page render later is render-blocking
          resources.
        </p>
      </Slide>
      <Slide
        slideId="render-blocking-resources-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide13')} />
        }
      >
        <p>
          Let’s say a page’s <code>&lt;head&gt;</code> has the following code:
        </p>
        <pre>
          <code>
            &lt;head&gt;
            <br />
            &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;
            <br />
            &lt;script src=&quot;script.js&quot;&gt;
            <br />
            &lt;/head&gt;
          </code>
        </pre>

        <p>
          With this code, the browser would be forced to keep the page blank
          until it downloads <code>style.css</code> and downloads &amp; executes{' '}
          <code>script.js</code>.
        </p>
        <p>That happens for several reasons.</p>
      </Slide>
      <Slide
        slideId="render-blocking-resources-stylesheets"
        image={
          <BlockVideo src={slide14Video} muted loop autoPlay playsInline />
        }
      >
        <p>
          <code>&lt;link rel=&quot;stylesheet&quot;&gt;</code> tags block
          rendering because browsers want to avoid showing unstyled content.
        </p>
        <p>
          If a browser didn’t wait for the stylesheet to load, the user would
          see how a page loads without styles and them jumps to become a page
          with styles. That’s not a great experience!
        </p>
        <p>
          <small>
            <strong>Note 1:</strong> stylesheets block rendering even if you put
            them in <code>&lt;body&gt;</code>. However,{' '}
            <code>&lt;body&gt;</code> stylesheets only block{' '}
            <a href="https://jakearchibald.com/2016/link-in-body/">
              the content that comes after them
            </a>{' '}
            – not the full document.
          </small>
        </p>
        <p>
          <small>
            <strong>Note 2:</strong> stylesheets block not only rendering, but
            also script execution –{' '}
            <a href="https://csswizardry.com/2018/11/css-and-network-performance/#dont-place-link-relstylesheet--before-async-snippets">
              even if a script is inline
            </a>
            . This can also make a page slower.
          </small>
        </p>
      </Slide>
      <Slide
        slideId="render-blocking-resources-scripts"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide16')} />
        }
      >
        <p>
          <code>&lt;script&gt;</code> tags block rendering because{' '}
          <a href="/talks/web-perf-101/#js-scripts-block-parsing-1">
            they actually block parsing
          </a>
          . When a browser loads the HTML page, it starts parsing it tag by tag,
          top-to-bottom. And whenever it hits a <code>&lt;script&gt;</code> tag,
          it pauses parsing completely – and waits until the script downloads
          and executes.
        </p>
        <p>
          And because parsing stops, rendering also stops. So when a page has a{' '}
          <code>&lt;script&gt;</code> tag, nothing after that tag will be parsed
          and rendered – until the script finishes executing.
        </p>
        <p>
          This behavior exists mostly{' '}
          <a href="https://hacks.mozilla.org/2017/09/building-the-dom-faster-speculative-parsing-async-defer-and-preload/">
            for historical reasons
          </a>{' '}
          – scripts learned to rely on it, and we can’t fix it now.
        </p>
        <p>
          <small>
            <strong>Note 1:</strong> This only applies to regular old{' '}
            <code>&lt;script&gt;</code> tags. Scripts with <code>async</code>,{' '}
            <code>defer</code>, or <code>type=&quot;module&quot;</code>{' '}
            attributes{' '}
            <a href="https://gist.github.com/jakub-g/385ee6b41085303a53ad92c7c8afd7a6">
              load differently and don’t block parsing
            </a>
            .
          </small>
        </p>
        <p>
          <small>
            <strong>Note 2:</strong> the description of parsing above is a bit
            simplified. Modern browsers have a “preload scanner” that{' '}
            <a href="https://andydavies.me/blog/2013/10/22/how-the-browser-pre-loader-makes-pages-load-faster/">
              pre-parses the document ahead of the primary parser
            </a>
            . This helps to load the resources sooner
          </small>
        </p>
      </Slide>
      <Slide
        slideId="render-blocking-resources-3"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide17')} />
        }
      >
        <p>So, what this means is:</p>
        <ul>
          <li>
            if <code>&lt;head&gt;</code> has a stylesheet that takes a while to
            download, that stylesheet will delay the render;
          </li>
          <li>
            if <code>&lt;head&gt;</code> has a script that takes a while to
            download, that script will delay the render;
          </li>
          <li>
            if <code>&lt;head&gt;</code> has an inline script that doesn’t need
            to be downloaded but takes a while to execute, that script will also
            delay the render;
          </li>
        </ul>
        <p>And that will increase Largest Contentful Paint.</p>
        <p>Now, let’s see if that’s the case with CNN.</p>
      </Slide>
      <LiveDemo
        slideId="live-demo-render-blocking-resources"
        title="Render-Blocking Resources"
        videoSource={demo3}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/* <Slide slideId="demo" image={null}>
        <hr />
        <h2>
          <a href="https://edition.cnn.com/2020/11/12/uk/lee-cain-johnson-cummings-downing-street-gbr-intl/index.html">
            Dominic Cummings, Boris Johnson’s chief adviser, may be gone by
            Christmas - CNN
          </a>{' '}
          – the CNN page.
        </h2>
        <p>
          ::Live demo:: The simplest way to check for render-blocking resources
          is to simply * go to the page source, * copy it, * paste it somewhere,
          * remove the document body, * format it slightly, * and search for
          these resources. And if you try to search for stylesheets, you’ll find
          nothing! That could mean one of two things: either there’re no
          external styles at all, or they’re inserted dynamically, with a
          script. For CNN, it’s the first case. And if we search for{' '}
          <code>&lt;style&gt;</code> tags, we’ll see that, indeed, the page
          ships with a lot of inline stiles. Which is good! Critical CSS is
          used. There are no render-blocking stylesheets.
        </p>
        <p>
          Same thing with scripts. If you search for scripts, you’ll find that
          there’re 13 scripts. All of them, in this case, are render-blocking. A
          script with a <code>defer</code> or an <code>async</code> attribute is
          not render-blocking, but there’re no scripts with such attribute here.
          Most of them are inline – remember, inline scripts are still
          render-blocking. They don’t need to download, but they still need to
          execute. And 3 of these scripts are external – they need to download{' '}
          <em>and</em> execute.
        </p>
        <p>
          So, we have 13 render-blocking scripts, of which 3 need to download.
          Let’s see if they actually affect our rendering time. Like, maybe
          they’re fast and inexpensive, and we don’t need to do anything with
          them. * So, to see whether downloading may be a bottleneck, I am going
          to go to WebPageTest again. And if I open the waterfall, I’ll see all
          these external scripts again: [I’ll see 1, 2, 3]. And, right here, I
          can see how much time they took to download as well. [So, the first
          script takes X to download… The second… The third…] Now, I don’t know
          whether that’s a lot – because we’re using a 4G network and a pretty
          cheap phone – but that’s one thing to keep in mind. If they were
          smaller, if they downloaded faster, LCP would happen sooner.
        </p>
        <ul>
          <li>
            Now, to see whether execution might be a bottleneck, I’ll need to do
            a Performance trace of the page loading. So, to do that, I am going
            to{' '}
            <ul>
              <li>go to Chrome</li>
              <li>open DevTools</li>
              <li>
                navigate to about:blank – this is important so that, when we
                start recording, we start from the empty state, not from the
                previous page
              </li>
              <li>press Record</li>
              <li>navigate to the URL</li>
              <li>
                and then Stop So, once Chrome loads the performance trace, we
                can easily see the moment of the first paint – here it is,
                helpfully highlighted.
              </li>
            </ul>
          </li>
          <li>
            So now, if we zoom into the area before the first paint, we’ll see a
            bunch of JS rectangles called “Evaluate script”. Each of them
            corresponds to the script we have in a <code>&lt;head&gt;</code>,
            and the larger the rectangle, the longer the script took to execute.
          </li>
          <li>
            So now, we can look at the largest rectangles and figure out what
            scripts are execution bottlenecks. In order to do that, I'm going to
            click through each of these large rectangles and see the script
            name. [So, the first script is… The second is… The third is…] And
            you see that, right after the third script finishes executing, the
            first paint happens.
          </li>
        </ul>
          </Slide>*/}
      <Slide
        slideId="code-splitting"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide18')} />
        }
      >
        <p>
          As we saw, CNN has 13 render-blocking scripts, but most of them are
          inline (so we don’t pay network cost) and execute quickly (so we pay
          almost no CPU cost). However, there’re three external scripts that
          take a while both to download and to execute.
        </p>
        <p>
          How to optimize these scripts? There are a few optimizations I’d
          typically do.
        </p>
        <p>
          <strong>Use code splitting.</strong> Code splitting is my favorite
          JavaScript optimization. With code splitting, you remove unnecessary
          parts of the bundle, and this makes the bundle both smaller{' '}
          <em>and</em> faster to execute.
        </p>
        <p>
          <small>
            How to do code splitting:{' '}
            <a href="/talks/web-perf-101/#code-splitting">Web Perf 101 intro</a>{' '}
            ·{' '}
            <a href="https://web.dev/codelab-code-splitting/">web.dev guide</a>{' '}
            ·{' '}
            <a href="https://webpack.js.org/guides/code-splitting/">
              webpack guide
            </a>
            .
          </small>
        </p>
        <p>
          <small>
            Or migrate to a framework like{' '}
            <a href="https://github.com/vercel/next.js">Next.js</a> (for React)
            or <a href="https://github.com/nuxt/nuxt.js">Nuxt.js</a> (for
            Vue.js) that implement code splitting and other performance best
            practices automatically. See also:{' '}
            <a href="/blog/perf-for-startups/">Quick apps in 3 steps</a>.
          </small>
        </p>
      </Slide>
      <Slide
        slideId="bundle-audit"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide19')} />
        }
      >
        <p>
          <strong>Do a bundle audit to remove what’s not needed.</strong> Run{' '}
          <a href="https://www.npmjs.com/package/webpack-bundle-analyzer">
            <code>webpack-bundle-analyzer</code>
          </a>
          , go over the report, and look for everything you don’t recognize.
          Check if you have:
        </p>
        <ul>
          <li>unnecessary polyfills</li>
          <li>
            large libraries that you import for a single small task (
            <a href="https://www.npmjs.com/package/moment">Moment.js</a> and{' '}
            <a href="https://www.npmjs.com/package/lodash">Lodash</a> are common
            examples)
          </li>
          <li>
            <a href="https://twitter.com/iamakulov/status/1262391881364897796">
              multiple versions of the same library
            </a>
          </li>
          <li>several libraries that do the same job</li>
          <li>
            large bundled chunks of JSON (a common occurrence with
            internationalization-related libraries) or svg (a common occurrence
            with{' '}
            <a href="https://www.npmjs.com/package/url-loader">
              <code>url-loader</code>
            </a>
            )
          </li>
        </ul>
        <p>
          <small>
            If you don’t use webpack, here are your alternatives: Rollup has{' '}
            <a href="https://www.npmjs.com/package/rollup-plugin-visualizer">
              <code>rollup-plugin-visualizer</code>
            </a>
            ; Parcel v2 has{' '}
            <a href="https://v2.parceljs.org/features/production/#analyzing-bundle-sizes">
              bundle analysis built-in
            </a>
            ; esbuild bundles are supported{' '}
            <a href="https://www.bundle-buddy.com">in Bundle Buddy</a>. If
            neither of these solutions works for you, try building a report
            based on source maps with{' '}
            <a href="https://www.npmjs.com/package/bundle-wizard">
              <code>bundle-wizard</code>
            </a>{' '}
            or{' '}
            <a href="https://www.npmjs.com/package/source-map-explorer">
              <code>source-map-explorer</code>
            </a>
          </small>
        </p>
      </Slide>
      <Slide
        slideId="defer-async"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide20')} />
        }
      >
        <p>
          <strong>
            Delay scripts by adding <code>defer</code>, <code>async</code>, or{' '}
            <code>type=&quot;module&quot;</code> attributes.
          </strong>{' '}
          External scripts with{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer">
            a <code>defer</code> attribute
          </a>{' '}
          load in the background and{' '}
          <a href="/talks/web-perf-101#async-and-defer">
            execute only when the browser finishes parsing the document.
          </a>{' '}
          Even if such script lives in <code>&lt;head&gt;</code>, it won’t
          increase LCP.
        </p>
        <p>
          External scripts with{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async">
            an <code>async</code> attribute
          </a>{' '}
          also load in the background. However, they execute as soon as they
          load – so if they load before the document is fully parsed,{' '}
          <a href="https://addyosmani.com/blog/script-priorities/">
            they’ll block parsing
          </a>
          . You probably want to use <code>defer</code> instead unless you have
          a good reason not to.
        </p>
        <p>
          Scripts with a <code>type=&quot;module&quot;</code> attribute{' '}
          <a href="https://jakearchibald.com/2017/es-modules-in-browsers/#defer-by-default">
            work like <code>defer</code> ones
          </a>
          .
        </p>
        <p>
          <small>
            Note: <code>defer</code> and <code>async</code> attributes work only
            with external scripts (as in,{' '}
            <code>&lt;script src=&quot;...&quot; defer&gt;</code>).
            Unfortunately, if you add them to an inline script (
            <code>&lt;script defer&gt;...&lt;/script&gt;</code>), they’ll do
            nothing.
          </small>
        </p>
        <p>
          <small>
            But this doesn’t apply to <code>type=&quot;module&quot;</code>{' '}
            scripts!{' '}
            <code>
              &lt;script type=&quot;module&quot;&gt;...&lt;/script&gt;
            </code>{' '}
            is still deferred. Yeah, this is confusing!
          </small>
        </p>
        <p>
          <small>
            See also{' '}
            <a href="https://gist.github.com/jakub-g/385ee6b41085303a53ad92c7c8afd7a6">
              a great gist by Jakub Gieryluk
            </a>{' '}
            with more details on <code>defer</code>, <code>async</code>, and{' '}
            <code>type=&quot;module&quot;</code>
          </small>
        </p>
      </Slide>
      <Slide
        slideId="critical-css"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide21')} />
        }
      >
        <p>
          <strong>Use Critical CSS.</strong>{' '}
          <a href="/talks/web-perf-101#css-critical-1">
            “Critical CSS” is an approach
          </a>{' '}
          when each page loads only the styles it needs for the first render –
          and nothing extra. These styles are typically loaded in an inline{' '}
          <code>&lt;style&gt;</code> tag, to save time on an extra roundtrip to
          the server. Styles for JS functionality like popups and for other
          pages are loaded in background.
        </p>
        <p>
          This makes render-blocking styles much smaller. Thanks to this, LCP
          also happens sooner.
        </p>
        <p>
          Today, Critical CSS is typically done{' '}
          <a href="/talks/web-perf-101#css-critical-4">
            with CSS-in-JS libraries like styled-components or tools like
            Critical
          </a>
          .
        </p>
      </Slide>
      <SectionHeader id="late-hero-image">Late Hero Image</SectionHeader>
      <Slide
        slideId="late-hero-image-1"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide25')} />
        }
      >
        <p>
          The third common Largest Contentful Paint offender is a late hero
          image.
        </p>
      </Slide>
      <Slide
        slideId="late-hero-image-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide26')} />
        }
      >
        <p>
          A <em>hero image</em> is a large image that comes in the beginning of
          the page. Here’s an example ← (or ↑, if you’re reading this on mobile)
        </p>
        <p>
          A hero image is typically the largest – visually the largest – page
          element. If a hero image is late – as in, it loads slowly – then
          Largest Contentful Paint is going to be delayed. That’s because
          Largest Contentful Paint, by definition, is the moment the largest
          page element gets rendered.{' '}
          {/* TODO: make the image nicer (re-draw the painting on top) */}
        </p>
        <p>Here’s how to figure out whether you have this issue:</p>
      </Slide>
      <LiveDemo
        slideId="live-demo-hero-image"
        title="Profiling The Hero Image"
        videoSource={demo4}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/*<Slide slideId="demo" image={null}>
        <p>
          Now, how could I learn if CNN experiences this issue? I can do this in
          WebPageTest as well! ::Live demo::
        </p>
        <ul>
          <li>
            To do this, I am going to get back to WPT, scroll all the way to the
            end of the waterfall, and click the Filmstrip link.
          </li>
          <li>
            The Filmstrip link will open the Filmstrip view. The filmstrip view
            shows screenshots of how the page was loading over time – matched
            with the loading waterfall.
          </li>
          <li>
            And in the screenshots, we can see that the CNN’s hero image
            actually loads pretty late. The page starts rendering at 4.5 seconds
            – but the hero image isn’t visible up until 8 seconds.
          </li>
        </ul>
        <p>This delays the LCP.</p>
            </Slide>*/}
      <Slide
        slideId="compress-resize-webp"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27')} />
        }
      >
        <p>
          There are a few ways to make a hero image load faster if appears late.
        </p>
        <p>
          <strong>Compress, resize, serve WebP/AVIF.</strong> Make sure you do{' '}
          <a href="/talks/web-perf-101#images-header">all the standard stuff</a>
          :
        </p>
        <ul>
          <li>
            <em>Compress your images.</em> There’s little visual difference{' '}
            <a href="https://3perf.com/talks/web-perf-101#images-compress-jpg-size-2">
              between JPEG qualities 100 and 70
            </a>
            . Yet, the latter is typically several times smaller.
          </li>
          <li>
            <em>Convert images to WebP and AVIF.</em> WebP typically compresses
            better than JPEG and PNG (
            <a href="https://siipo.la/blog/is-webp-really-better-than-jpeg">
              but note the caveats
            </a>
            ) and is supported{' '}
            <a href="https://caniuse.com/webp">in all major browsers</a>. AVIF
            is a newer image format that{' '}
            <a href="https://jakearchibald.com/2020/avif-has-landed/">
              compresses images even better
            </a>{' '}
            but is
            <a href="https://caniuse.com/avif">not supported in Safari</a> (as
            of Feb 2022).
          </li>{' '}
          <li>
            <em>Generate different versions for different resolutions.</em>{' '}
            There’s no need to serve a 3000-px-wide image to an iPhone. Use{' '}
            <a href="https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/">
              <code>&lt;img srcset&gt;</code> and <code>&lt;picture&gt;</code>{' '}
              tags
            </a>{' '}
            to serve smaller images to smaller devices.
          </li>
        </ul>
        <p>
          In the past, compressing, converting, and resizing images was a
          laborous manual process. Today, however, a lot of tools would do it
          for you automatically: there are image CDNs (
          <a href="https://cloudinary.com">Cloudinary</a>,{' '}
          <a href="https://imgix.com">Imgix</a>,{' '}
          <a href="https://uploadcare.com">Uploadcare</a>), open-source proxies
          (<a href="https://imgproxy.net">imgproxy</a>), and framework
          components (
          <a href="https://nextjs.org/docs/api-reference/next/image">
            next/image
          </a>
          ,{' '}
          <a href="https://www.gatsbyjs.com/plugins/gatsby-plugin-image">
            gatsby-plugin-image
          </a>
          , <a href="https://image.nuxtjs.org/components/nuxt-img/">nuxt-img</a>
          ). Pick the one that’s easier to integrate for you – and have all your
          images optimized automatically!
        </p>
        <p>
          <small>
            Further reading/watching:{' '}
            <a href="https://www.youtube.com/watch?v=F1kYBnY6mwg">
              Google’s images compression deep dive
            </a>{' '}
            – my favorite 30-minute intro into image compression;{' '}
            <a href="https://avif.io/blog/articles/avif-faq/#whatisthedownsideofavif">
              AVIF drawbacks
            </a>{' '}
            – specifically, AVIF images take longer to encode than JPEG or WebP.
          </small>
        </p>
        {/* TODO: slide: mention AVIF; gatsby-image → gatsby-plugin-image; mention
        nuxt-img */}
      </Slide>
      <Slide
        slideId="progressive-jpeg"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide29')} />
        }
      >
        <p>
          <strong>Test switching to progressive JPEG.</strong> JPEG is old, and
          it doesn’t compress very well, but one feature that it has – and webp
          or AVIF don’t – is{' '}
          <a href="https://cloudinary.com/blog/progressive_jpegs_and_green_martians">
            progressive loading
          </a>
          .
        </p>
        <p>
          Non-progressive images load and render top-to-bottom. Progressive
          images, however, first load a low-quality version of the image. Then,
          as they keep downloading, they gradually enhance to full quality.
        </p>
        <p>
          <small>
            Further reading: a super visual deep dive into{' '}
            <a href="https://parametric.press/issue-01/unraveling-the-jpeg/">
              how the JPEG format works
            </a>{' '}
            (the author literally edits bytes and shows how this affects the
            image!).
          </small>
        </p>
        {/* TODO: make it animated. Or replace with a video from
            https://cloudinary.com/blog/progressive_jpegs_and_green_martians? */}
      </Slide>
      <Slide
        slideId="progressive-jpeg-lcp-case"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide30')} />
        }
      >
        <p>
          Often, a progressive JPEG version of an image appears sooner than its
          WebP or AVIF version. This doesn’t directly help with LCP (LCP happens
          when the final image frame renders,{' '}
          <a href="https://github.com/w3c/largest-contentful-paint/issues/71">
            although there’s a discussion to change this
          </a>
          ). However, it does help with user experience! Here’s{' '}
          <a href="https://twitter.com/csswizardry/status/1324440103792578562">
            a great case
          </a>{' '}
          by Harry Roberts:
        </p>
        <blockquote>
          Fascinating issue on a current client site where we reduced their
          masthead image weight by over 20% by switching it to WebP. It’s now
          rendering almost 2× later because WebP doesn’t offer progressive
          rendering like the previous JPG did.
        </blockquote>
      </Slide>
      <Slide
        slideId="lazy-loading-pitfall"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide31')} />
        }
      >
        <p>
          <strong>Ensure you’re not lazy-loading the hero image.</strong> With
          lazy loading, images aren’t loaded until they become visible. There is{' '}
          <a href="https://css-tricks.com/native-lazy-loading/">
            native lazy loading
          </a>{' '}
          as well as{' '}
          <a href="https://css-tricks.com/tips-for-rolling-your-own-lazy-loading/#the-typical-mechanics-for-lazy-loading">
            lots of JavaScript-based implementations
          </a>
          .
        </p>
        <p>
          Lazy loading is generally a helpful optimization, which is why some
          tools do it for every image by default. But it isn’t helpful for hero
          images! Even if the image is immediately visible in the viewport, lazy
          loading adds a delay.
        </p>
        <p>
          <small>
            How much of a delay?
            <br />— With JS-based lazy loading, image requests are managed by
            JavaScript. Because of this, the browser can’t even <em>
              start
            </em>{' '}
            loading the first image until it downloads and executes the
            JavaScript code responsible for that. Depending on the bundle size
            and the network speed, that can easily take 2-4 seconds.
            <br />— And even with native lazy loading, in my tests, Chrome and
            Firefox seem to delay the lazy-loaded image a bit (perhaps to figure
            out whether it’s in the viewport).
          </small>
        </p>
      </Slide>
      <Slide
        slideId="lazy-loading-pitfall-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide32')} />
        }
      >
        <p>
          One tool that lazy-loads every image by default is{' '}
          <a href="https://nextjs.org/docs/api-reference/next/image">
            <code>next/image</code>
          </a>
          .
        </p>
        <p>
          <code>next/image</code> is a Next.js package that optimizes images.
        </p>
        {/* TODO: update the screenshot in the slide */}
      </Slide>
      <Slide
        slideId="lazy-loading-pitfall-3"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide33')} />
        }
      >
        <p>
          When you serve an image using <code>next/image</code>, Next.js, by
          default, sets the <code>src</code> attribute on that image to an empty
          GIF. Then, once the bundle loads, Next.js replaces the empty GIF with
          an actual image URL. This delays image loading until the bundle is
          available.
        </p>
        <p>
          Now, imagine the image is critical for LCP. <code>next/image</code>{' '}
          will delay LCP until the bundle loads!
        </p>
        <p>
          To avoid this behavior with <code>next/image</code>, you have to
          remember to add the <code>priority=&#123;true&#125;</code> attribute
          on critical images. However, if you forget to do this, your LCP will
          suffer.
        </p>
        <p>CNN also has this issue.</p>
        <p>
          <small>
            Apart from <code>next/image</code>, other tools with similar
            defaults are{' '}
            <a href="https://www.gatsbyjs.com/plugins/gatsby-plugin-image/">
              <code>gatsby-plugin-image</code>)
            </a>{' '}
            (see{' '}
            <a href="https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#shared-props">
              <code>loading=&quot;lazy&quot;</code>
            </a>
            ) and WordPress{' '}
            <a href="https://make.wordpress.org/core/2021/12/29/enhanced-lazy-loading-performance-in-5-9/">
              from 5.5 to 5.8
            </a>
            .
          </small>
        </p>
        {/* TODO: update the slide for next/image;
            data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7. */}
      </Slide>
      <LiveDemo
        slideId="live-demo-cnn-late-hero"
        title="Lazy-Loaded Hero Image"
        videoSource={demo5}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/*<Slide slideId="demo" image={null}>
        <ul>
          <li>
            What they do is they use a JavaScript image loader. [So, if you go
            the source code of the page and search for <code>img</code>, you’ll
            see that <code>img src</code> defaults to an empty picture – and the
            actual url is provided in data attributes.) I’m not sure why. I
            guess they had a good reason for this. But performance-wise, this
            means that the image is discovered and downloaded very-very late.
            ::Demo with WPT:: If you look at the loading waterfall in
            WebPageTest, you will find that the image [request 68] only starts
            downloading as late as 7+ seconds after the page is loaded. And our
            LCP is actually 7.7s! What a coincidence! (Obviously, not a
            coincidence.)
          </li>
        </ul>
      </Slide>*/}
      <Slide
        slideId="cnn-hero-fixes"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide34')} />
        }
      >
        <p>To fix this issue, CNN can:</p>
        <ul>
          <li>
            <em>disable JS-based lazy loading for the hero image.</em> This way,
            image’s <code>src</code> attribute will be set to the actual image
            URL, and the browser will discover &amp; start loading the image as
            soon as it parses the HTML.
          </li>
          <li>
            <em>
              add a <code>&lt;link rel=&quot;preload&quot;&gt;</code> with the
              image URL.
            </em>{' '}
            If it’s impossible to disable JS-based lazy loading,{' '}
            <code>&lt;link rel=&quot;preload&quot;&gt;</code> will also help the
            browser to discover the image sooner. However, that’s a hack, so{' '}
            <a href="https://twitter.com/tkadlec/status/1392128755141910532">
              it comes with its own drawbacks
            </a>
            .
          </li>
        </ul>
      </Slide>
      <Slide
        slideId="lcp-summary"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide35')} />
        }
      >
        <p>
          And that’s it for Largest Contentful Paint! Ensure{' '}
          <a href="#server-response-time">your server response time is low</a>,
          eliminate{' '}
          <a href="#render-blocking-resources">render-blocking resources</a>,{' '}
          optimize the image <a href="#late-hero-image">appropriately</a> – and,
          in most cases, LCP will stay low and good.
        </p>
      </Slide>
      <Slide
        slideId="fid"
        isSectionHeader={true}
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide36')} />
        }
      >
        <p>
          Next, let’s talk about the second Core Web Vital: First Input Delay
          (FID).
        </p>
      </Slide>
      <Slide
        slideId="fid-challenges"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide37')} />
        }
      >
        <p>
          <a href="https://web.dev/fid/">
            <em>First Input Delay</em>
          </a>{' '}
          measures how quickly the page reacts when the user clicks or types
          something for the first time. Typically, the more JS the page runs
          when it loads, the worse FID is.
        </p>
        <p>
          FID is challenging to optimize because it’s{' '}
          <a href="https://web.dev/fid/#how-to-measure-fid">
            not available in Lighthouse
          </a>
          . FID is based on the data Google collects from real visitors to the
          site. You can’t measure FID manually, so if your FID is bad, and
          you’re trying to improve it, you’ll only see whether your fixes are
          helping when you deploy them to production and{' '}
          <a href="https://www.smashingmagazine.com/2021/04/complete-guide-measure-core-web-vitals/#the-chrome-user-experience-report-crux">
            wait for up to 28 days
          </a>
          .
        </p>
        <p>
          Thankfully, there’s another metric FID has a close match to:{' '}
          <a href="https://web.dev/tbt/">Total Blocking Time (TBT)</a>. TBT
          measures how much the page hangs while it’s loading. It’s not the same
          thing as FID, but optimizing TBT would typically improve FID as well.
        </p>
        <p>That’s why, for this talk, I’m going to focus on TBT – not FID.</p>
      </Slide>
      <Slide
        slideId="fid-vs-tbt"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide37')} />
        }
      >
        <p>
          There’s only one gotcha to be aware of. FID is often good even when
          Total Blocking Time is bad. (This is the case with CNN as well.)
        </p>
        <p>
          This means that if you’re optimizing <em>only</em> for search ranking,
          forget about TBT. For SEO,{' '}
          <a href="https://simonhearne.com/2021/core-web-vitals-seo/#search-console-is-the-source-of-truth">
            only FID matters
          </a>
          . So if your FID is good (it frequently is), you don’t need to
          optimize Total Blocking Time or Time to Interactive. Making them lower
          won’t help you rank better.
        </p>
        <p>
          TBT still matters if you care about user experience, though. The
          higher TBT is, the busier the user’s CPU is going to be. You don’t
          want your users thinking “woah, my laptop gets hot and noisy every
          time I visit this site”.
        </p>
        {/* TODO: create slide: highlight FID vs TBT on the CNN’s screenshot */}
      </Slide>
      <LiveDemo
        slideId="live-demo-cnn-tbt"
        title="CNN’s Total Blocking Time"
        videoSource={demo6}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/*<Slide slideId="demo" image={null}>
        <p>
          So, let’s take a look at CNN’s Total Blocking Time. WPT measured TBT
          as <em>more than</em> 12 seconds, with <em>more than</em> here meaning
          that it simply gave up measuring. Which is, actually, pretty
          explainable. If you scroll all the way down to the end of the
          waterfall chart, you’ll see a section called “Browser Main Thread”.
          This section shows when the browser is busy with JavaScript (which is
          yellow), or layouting work (which is violet). In this case, during the
          whole trace, the primary thread stays super busy with JavaScript.
        </p>
        <p>
          Okay, so what do we do to improve our Total Blocking Time in a case
          like this one?
        </p>
      </Slide>*/}
      <Slide
        slideId="first-vs-third-party"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide38')} />
        }
      >
        <p>Total Blocking Time consists of two things:</p>
        <ul>
          <li>
            first-party code’s blocking time (“first-party code” means “the code
            of the app/site”)
          </li>
          <li>
            and third-party code’s blocking time (“third-party code” means
            “analytics, ads, etc.”)
          </li>
        </ul>
      </Slide>
      <SectionHeader id="third-parties">Third Parties</SectionHeader> 
      <Slide
        slideId="third-party-expensive"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide39')} />
        }
      >
        <p>
          And I’m going to share an observation that’s pretty uncomfortable to
          me, to be honest.{' '}
          <Mark>
            From my experience with React-based apps and sites, third-party code
            is often responsible for as much as a half of the total JS cost.
          </Mark>
        </p>
        <p>
          This means that we, as engineers, can only get so far by optimizing
          the first-party code. If we want to actually reduce the JavaScript
          cost and improve TBT, we have to optimize the third-party code as
          well. We have to go and talk to marketing. We have to make policy
          changes instead of code changes. We have to negotiate.
        </p>
        <p>
          This is not what we, engineers, are used to doing. But if we want to
          make TBT better, that’s something we <em>have</em> to do.
        </p>
      </Slide>
      <Slide
        slideId="thirt-party-talk"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide40')} />
        }
      >
        <p>
          Harry Roberts{' '}
          <a href="https://vimeo.com/302785171">has a great talk</a> about the
          way we, as engineers, can talk about third parties with marketing.
        </p>
        <p>
          The important thing is to avoid blaming anyone. Analytics and ads also
          serve an important business role, just like performance does. So
          instead of approaching this as “we’re good, you’re guilty”, approach
          this as “here’s a challenge our company has, can you help me fixing
          it?”
        </p>
        <p>
          Harry Roberts’ talk shows a bunch of tricks to measure and discuss the
          third-party performance. Here’s one of them, applied to the CNN’s
          site.
        </p>
      </Slide>
      <LiveDemo
        slideId="live-demo-third-parties"
        title="Measuring Third Parties"
        videoSource={demo7}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/*<Slide slideId="demo" image={null}>
        <p>
          Okay, so, how do we measure how much JS cost third parties actually
          contribute? I have a favorite trick for this. (And BTW I learned this
          trick from the same Harry Roberts’ talk.) The trick looks as follows.{' '}
        </p>
        <ul>
          <li>
            First, we do a WebPageTest run over a page we want to analyze. (We
            already have this.)
          </li>
          <li>
            Then, what we do is we scroll to the top, find the “Request map”
            link, and click on it.
          </li>
          <li>
            This opens a page with a map of all the requests the current page
            makes. But this is not what we’re currently interested in, so what
            we do is we look at the bottom of the page, find the “Miss the old
            requestmap?” link, and click it.
          </li>
          <li>
            This brings us to a domain map. It’s a map of all domains the
            current page requests. What we’re doing now is we’re clicking
            “Download CSV data” and open the downloaded file.
          </li>
          <li>
            Awesome. So now, we have a list of all first-party and third-party
            domains. So, now, I am going to copy all the third-party domains and
            run a test with all these domains blocked. So what I’m doing is:
            <ul>
              <li>I’m removing the few cnn.com domains</li>
              <li>
                I’m copying the full list and pasting it into a text editor
              </li>
              <li>I’m removing the empty lines</li>
              <li>And I’m replacing all the line breaks with spaces</li>
            </ul>
          </li>
          <li>
            Awesome. So now, what’s left is to copy this list of domains, go
            back to webpagetest, create a new test, switch to the Block tab, and
            paste that list of domains into the “Block Domains” list
          </li>
          <li>And run the test </li>
        </ul>
        <hr />
        <ul>
          <li>
            <a href="https://www.webpagetest.org/result/201112_DiK1_fa18b4f89ae62e03fac322bfcdec5a7d/">
              WebPageTest Test Result - Dulles : edition…br-intl/index.html -
              11/12/20 20:37:15
            </a>{' '}
            – regular one
          </li>
          <li>
            <a href="https://www.webpagetest.org/result/201122_DiYZ_49988d90b1bfdd8be7582f83095e4efe/">
              WebPageTest Test Result - Dulles : edition…br-intl/index.html
            </a>{' '}
            – for blocked domains
          </li>
        </ul>
        <hr />
        <p>
          So, what this is going to do is it’s going run a performance trace of
          the CNN website with all the third parties blocked. And once the test
          finishes (which I’m not going to wait for since I already have a
          completed test) you can see the Total Blocking Time without third
          parties. In this case, the first run didn’t block third parties, for
          some reason, but the second and the third one did, so I’m going to
          open the second one. And, well, with all third parties blocked, the
          total blocking time gets down to 2 seconds. From 12+ seconds to 2
          seconds. This is huge. And this is why the first item you need to
          tackle when optimizing your TBT is third parties.
        </p>
      </Slide>*/}
      <Slide
        slideId="third-party-optimize"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide41')} />
        }
      >
        <p>
          How do you optimize third parties if you realize they are expensive?
          Here are a few ways:
        </p>
        <ul>
          <li>
            <em>Talk with marketing</em> to see if there are any third parties
            they don’t need (“is there any chance we added Facebook Pixel,
            stopped using it, and forgot to remove it?”), or if any third
            parties can be scoped to specific pages (“do we need Intercom on
            every page or just on Support?”).{' '}
            <a href="https://vimeo.com/302785171">Harry Roberts’ talk</a>{' '}
            describes this in more details.
          </li>
          <li>
            <em>Try delaying third parties</em> until the page loads or until
            they are needed.{' '}
            <a href="https://twitter.com/iamakulov/status/1313258115152912385">
              A Twitter thread of mine
            </a>{' '}
            shows a bunch of ways to do this.
          </li>
        </ul>
      </Slide>
      <Slide
        slideId="first-party"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide42')} />
        }
      >
        <p>Now, let’s talk about the first-party code.</p>
      </Slide>
      <SectionHeader id="hydration">Hydration</SectionHeader>
      {/* TODO: bundle init time */}
      <Slide
        slideId="hydration-1"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide43')} />
        }
      >
        <p>A frequent issue I see in React sites is the hydration time.</p>
        <p>
          When you have an app or a site that’s written in React and that uses
          server-side rendering, once the page gets downloaded, it goes{' '}
          <a href="https://reactjs.org/docs/react-dom.html#hydrate">
            through hydration
          </a>
          . During hydration, React renders the full app in the browser, goes
          through every rendered component, extracts event listeners, and
          attaches them to the server-generated markup.
        </p>
        <p>
          Rendering the full app is expensive, as React apps tend to have a lot
          of components on a page. As a result, hydration typically becomes the
          most (or one of the most) expensive first-party operation.
        </p>
      </Slide>
      <Slide
        slideId="hydration-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide43_2')} />
        }
      >
        <p>
          Here’s my approach to check if the hydration time is something one
          needs to focus on:
        </p>
        <ul>
          <li>Open Chrome DevTools → Performance and click the ↺ button</li>
          <li>
            Once the recording completes, zoom into it and look for an entry
            called <code>[letter].hydrate</code>
          </li>
          <li>
            Check the <code>[letter].hydrate</code>’s duration and compare it
            with other chunks of JavaScript in the recording
          </li>
        </ul>
        <p>
          If the <code>[letter].hydrate</code> entry is one of the largest
          JavaScript entries in the recording, hydration is the bottleneck.
        </p>
      </Slide>
      <Slide
        slideId="skip-react"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide44')} />
        }
      >
        <p>There are two ways to optimize the hydration time.</p>
        <p>
          <strong>Avoid loading React at all.</strong> Keep using React on the
          server but remove it from the client. If you need to add any
          interactivity, do it with inline scripts.
        </p>
        <p>
          This approach works great for static pages like blog posts or landing
          pages. It keeps React’s great development experience without
          sacrificing the the user’s loading time.
        </p>
        <p>
          If you use Gatsby,{' '}
          <a href="https://www.gatsbyjs.com/plugins/gatsby-plugin-no-javascript/">
            <code>gatsby-plugin-no-javascript</code>
          </a>{' '}
          (+&nbsp;
          <a href="https://www.gatsbyjs.com/plugins/gatsby-plugin-no-javascript-utils/">
            utils
          </a>
          ) will do this for you. Next.js has an undocumented{' '}
          <a href="https://github.com/vercel/next.js/pull/11949">
            <code>unstable_runtimeJS</code>
          </a>{' '}
          flag that does a similar thing. If you do server-side rendering
          yourself,{' '}
          <a href="https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup">
            <code>ReactDOMServer.renderToStaticMarkup</code>
          </a>{' '}
          is the API you need.
        </p>
        <p>
          <small>
            Skipping React on the client is what{' '}
            <a href="https://3perf.com">3perf.com</a> (the site you’re at) does.
            This was the largest optimization that{' '}
            <a href="https://twitter.com/iamakulov/status/1244762505685225472">
              helped it reach 100 on PageSpeed Insights
            </a>
            .
          </small>
        </p>
      </Slide>
      <Slide
        slideId="partial-hydration"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide46')} />
        }
      >
        <p>
          <strong>Use partial hydration.</strong> Hydrate the page as usual but
          avoid hydrating component that don’t need any interactivity (such as
          article content or footer).
        </p>
        <p>
          This approach works great for semi-dynamic pages that have a lot of
          static content but also a lot of interactivity. Example:{' '}
          <a href="https://www.nytimes.com/interactive/2019/12/19/opinion/location-tracking-cell-phone.html">
            The New York Times’ investigation into cellphone tracking
          </a>
          .
        </p>
        {/* TODO: mention React 18’s Suspense */}
        <p>
          To do partial hydration in React, you have to resort to hacks.{' '}
          <a href="https://github.com/facebook/react/issues/10923#issuecomment-338715787">
            The Current Official Way
          </a>{' '}
          to do partial hydration is fairly hacky: on the server, you render the
          component, and on the client, you render a
        </p>
        <pre>
          <code>
            {`<div dangerouslySetInnerHTML={{ __html: '' }} suppressHydrationWarning={true} />`}
          </code>
        </pre>
        <p>
          instead. (The Future Official Way may be{' '}
          <a href="https://www.swyx.io/react-server-components-demo">
            React Server Components
          </a>{' '}
          but they’re still a year or a few away.)
        </p>
        <p>
          Thankfully, there are a few libraries that hide that hack under the
          hood. My favorite one is{' '}
          <a href="https://github.com/hadeeb/react-lazy-hydration">
            <code>react-lazy-hydration</code>
          </a>{' '}
          which provides an API like this:
        </p>
        <pre>
          <code>
            {'<LazyHydrate ssrOnly>{...}</LazyHydrate>\n'}
            {'{/* or */}\n'}
            {'<LazyHydrate whenVisible>{...}</LazyHydrate>\n'}
            {'{/* or */}\n'}
            {'<LazyHydrate on="click">{...}</LazyHydrate>\n'}
          </code>
        </pre>
        {/* TODO: re-draw the slide */}
        <p>
          <small>
            <strong>Note:</strong> partial hydration only helps when you’re
            optimizing expensive components. For example, avoid a temptation to
            wrap every link or text paragraph with{' '}
            <code>{`<LazyHydrate>`}</code>. Unless these components are
            expensive to render, partial hydration won’t save you much time.
          </small>
        </p>
        <p>
          <small>
            To find expensive components, open{' '}
            <a href="https://www.youtube.com/watch?v=00RoZflFE34">
              React Profiler
            </a>
            , click “Reload and start profiling”, and see what’s happening
            during the first render.
          </small>
        </p>
      </Slide>
      <Slide
        slideId="tbt-summary"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide47')} />
        }
      >
        <p>
          To summarize: Total Blocking Time is affected by first-party JS and
          third-party JS.
        </p>
        <ul>
          <li>
            With first-party JS, hydration is often the largest issue. Optimize
            it by applying partial hydration or by completely removing
            client-side React.
          </li>
          <li>
            And, while third-party JS isn’t something engineers typically own,
            improve it by talking to marketing and delaying scripts where
            appropriate.
          </li>
        </ul>
      </Slide>
      <Slide
        slideId="cls"
        isSectionHeader={true}
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide48')} />
        }
      >
        <p>The third Core Web Vitals is Cumulative Layout Shift (CLS).</p>
      </Slide>
      <Slide
        slideId="field-vs-lab"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide48')} />
        }
      >
        {/* TODO: slide with lab data CLS and field data CLS highlighted */}
        <p>
          CNN’s Cumulative Layout Shift is 0.18. This isn’t great! To make CLS
          good, we need to push it below 0.1.
        </p>
        <p>
          However, CNN’s Cumulative Layout Shift is also 0, which is perfectly
          green. Why are there two different numbers?
        </p>
      </Slide>
      <Slide
        slideId="field-vs-lab-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide5')} />
        }
      >
        {/* TODO: create a slide for this */}
        <p>
          PageSpeed Insights reports two different numbers because it measures
          performance in two different ways.
        </p>
        <ul>
          <li>
            Whenever you profile a page in PageSpeed Insights, it opens the page
            in a virtual browser and measures its performance. This is called
            “Lab Data”.
          </li>
          <li>
            Also, whenever you profile a page in PageSpeed Insights, it looks up
            how quickly the page loaded for real visitors during the last month.
            This is called “Field Data”.
          </li>
        </ul>
        <p>
          Field Data is the most precise data out there. However, sometimes, it
          gets outdated: if you make the page 2× faster, the Field Data will not
          show that immediately. It aggregates data over the whole month,
          whereas you might’ve had optimized the page just today!
        </p>
        <p>
          That’s where Lab Data comes in. If you make the page 2× faster, you’ll
          see changes in Lab Data immediately.
        </p>
      </Slide>
      <Slide
        slideId="field-vs-lab-3"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide5')} />
        }
      >
        {/* TODO: create a slide for this (video from CNN) */}
        <p>
          However, Lab Data is also limited. PageSpeed Insights can’t click the
          page or scroll it like a real user does.
        </p>
        <p>
          And that’s what causes the difference here: if you have an ad block
          that loads ⅔rd past the article and shifts the text, a real user will
          notice it, whereas PageSpeed Insights will not.
        </p>
      </Slide>
      <LiveDemo
        slideId="live-demo-layout-shifts"
        title="Finding What Causes A Layout Shift"
        videoSource={demo8}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={1200}
      />
      {/*<Slide slideId="demo" image={null}>
        <p>
          Let’s look at the CNN audit again. The CNN website has a
          higher-than-zero layout shift. To detect what’s causing that layout
          shift, we can use WPT again.
        </p>
        <p>::Live demo::</p>
        <ul>
          <li>
            So, what I am going to do is I am going to open Run 3 – which is the
            CLS was detected.
          </li>
          <li>
            I’m going to open it, scroll down all the way to the end of the
            waterfall, click the “Filmstrip” link, and get a filmstrip.
          </li>
          <li>
            The filmstrip view shows a progress of how the page was loading over
            time – matched with the loading waterfall. And to find the layout
            shift, I am going to scroll all the way right to then of the
            filmstrip until I see a layout shift.
          </li>
          <li>
            Aaaand here it is. You see it, right? We had some content on top of
            the page, then the video started loading, and then the video loaded
            and shifted the content down. This is the layout shift.
          </li>
        </ul>
    </Slide>*/}
      <SectionHeader id="ad-video">Ads or Videos</SectionHeader>
      <Slide
        slideId="ad-video-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide49')} />
        }
      >
        {/* TODO: slide header: “On top” → “Blocks”*/}
        <p>
          The most common cause of high CLS I see on news sites is ads and video
          blocks. They typically load after the page finishes loading, appear
          out of nowhere, and shift the page text down right when you’re looking
          at it.
        </p>
        <p>
          If this happens, talk to your designer and figure out the solution
          together! Perhaps you could move the element to a different place
          where it wouldn’t shift anything. Or maybe you can reserve a space for
          the element ahead of time.
        </p>
      </Slide>
      <SectionHeader id="image-dimensions">
        Image Width And Height
      </SectionHeader>
      <Slide
        slideId="image-dimensions-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide51')} />
        }
      >
        <p>
          The next most common CLS antipattern, from my experience, is images
          without dimensions.
        </p>
        <p>
          When the page renders for the first time, all images without an
          explicit width and a height are rendered zero-spaced. The browser
          doesn’t know how much space they’ll take, so it reserves none!
        </p>
        <p>
          Then, when such images start loading, the browser learns their size
          and rerenders the page reserving space for them. This shifts the
          content down – and causes a layout shift.
        </p>
      </Slide>
      <Slide
        slideId="image-dimensions-3"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide52')} />
        }
      >
        {/*<p>TODO: a new slide, with a code like ↓ </p>
          <pre>
            <code>
              &lt;!-- HTML --&gt;
              <br />
              &lt;img width=&quot;600&quot; height=&quot;400&quot;&gt;
              <br />
              <br />
              /&#42; Computed CSS &#42;/
              <br />
              img &#123; aspect-ratio: 600 / 400; &#125;
            </code>
        </pre>*/}
        <p>
          A solution for this issue is to{' '}
          <a href="https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/">
            set image <code>width</code> and <code>height</code> attributes
          </a>
          . Browsers use these attributes to precompute{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio">
            the <code>aspect-ratio</code> CSS property
          </a>
          .
        </p>
      </Slide>
      <Slide
        slideId="image-dimensions-4"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide55')} />
        }
      >
        <p>
          The <code>aspect-ratio</code> property tells the browser how much size
          the image is going to occupy – even before the browser starts loading
          it and learns actual image dimensions.
        </p>
        <p>
          With this property, browsers reserve space for the image ahead of
          time. This prevents the layout shift completely.
        </p>
      </Slide>
      <SectionHeader id="font-display-swap">font-display: swap</SectionHeader>
      <Slide
        slideId="font-display-swap-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide55')} />
        }
      >
        {/*TODO: slides for this*/}
        <p>
          Another thing that frequently increases the layout shift is{' '}
          <code>font-display: swap</code>.
        </p>
        <p>
          <code>font-display: swap</code> is a common way{' '}
          <a href="https://web.dev/avoid-invisible-text/">
            to make text with custom fonts render sooner
          </a>
          . It tells the browser to render text in a fallback font before the
          custom one loads.
        </p>
        <p>
          A layout shift happens when the fallback font is significantly smaller
          or larger than the custom one. When the custom font loads and replaces
          the fallback one, the text may become 1-2 lines longer or shorter.
          This will cause a lot of page elements to move.
        </p>
        <p>There are three ways to solve this issue:</p>
        <ul>
          <li>
            Change the fallback font size to make it closer to the custom one.
            Monica Dinculescu’s{' '}
            <a href="https://meowni.ca/font-style-matcher/">
              Font Style Matcher
            </a>{' '}
            is a great tool for this.
          </li>
          <li>
            Use <code>font-display: optional</code> instead of{' '}
            <code>font-display: swap</code>. This tells the browser to keep the
            fallback font visible even after the custom one loads. The custom
            font becomes visible when the user navigates to a new page. This
            completely avoids the layout shift because the font is never
            replaced.
          </li>
          <li>
            Use the new{' '}
            <a href="https://web.dev/css-size-adjust/#mitigating-cls-with-seamless-font-swapping">
              <code>size-adjust</code> CSS property
            </a>
            . <code>size-adjust</code> is designed specifically to adjust{' '}
            <code>@font-face</code> sizes and prevent a layout shift when the
            custom font loads.
          </li>
        </ul>
      </Slide>
      <Slide
        slideId="cls-summary"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide56')} />
        }
      >
        {/* TODO: update the contents slide (add fonts) */}
        <p>
          To summarize. Cumulative Layout Shift’s most common offenders here
          are:
        </p>
        <ul>
          <li>
            An ad or a video on top of the page shifting the page down (could be
            fixed by talking to the designer)
          </li>
          <li>
            An image that doesn’t have dimensions set (could be fixed by adding{' '}
            <code>width</code> and <code>height</code> attributes)
          </li>
          <li>
            A custom font that’s significantly larger or smaller than the
            fallback one (could be fixed by adjusting the fallback font size, or
            by switching to <code>font-display: optional</code>)
          </li>
        </ul>
      </Slide>
      <Slide
        slideId="thanks"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide58')} />
        }
      >
        <p>And that’s it from me. Thanks!</p>
        {/* TODO: https://twitter.com/iamakulov/status/1331916406733107201 */}
        <p>
          Follow me on Twitter:{' '}
          <a href="https://twitter.com/iamakulov">@iamakulov</a>
        </p>
        {/*TODO: <p>
          <small>Thanks to Alex Riaronc, ...</small>
          </p>*/}
      </Slide>
    </>
  );
};

const SlidesContentWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        allSlides: allFile(
          filter: {
            sourceInstanceName: { eq: "pages" }
            relativeDirectory: { eq: "talks/cwv-cnn/slides" }
            extension: { eq: "png" }
          }
        ) {
          edges {
            node {
              name
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...ImageFluid
                }
              }
            }
          }
        }

        sectionHeaders: allFile(
          filter: {
            relativeDirectory: { eq: "talks/cwv-cnn/slides" }
            name: { in: ["slide6", "slide35", "slide47"] }
          }
        ) {
          edges {
            node {
              name
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...ImageFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data: {
      allSlides: {
        edges: Array<{
          node: {
            name: string;
            childImageSharp: {
              fluid: ImageFluid;
            };
          };
        }>;
      };
      sectionHeaders: {
        edges: Array<{
          node: {
            name: string;
            childImageSharp: {
              fluid: ImageFluid;
            };
          };
        }>;
      };
    }) => {
      const allSlidesByName = Object.fromEntries(
        data.allSlides.edges.map((edge) => {
          return [edge.node.name, edge.node.childImageSharp.fluid];
        }),
      );

      const sectionHeadersByName = Object.fromEntries(
        data.sectionHeaders.edges.map((edge) => {
          return [edge.node.name, edge.node.childImageSharp.fluid];
        }),
      );

      return (
        <SlidesContent
          allSlides={allSlidesByName}
          sectionHeaders={sectionHeadersByName}
        />
      );
    }}
  />
);

export default SlidesContentWithQuery;
