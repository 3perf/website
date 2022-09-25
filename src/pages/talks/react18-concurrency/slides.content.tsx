import { graphql, StaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { SlideGatsbyImage } from '../../../components/talks/Slide';
import {
  Contents,
  ContentsInner,
  LiveDemo,
  SectionHeader,
  Slide,
} from '../styled';
import demo1 from './live-demos/demo1.mp4';
import demo2 from './live-demos/demo2.mp4';
import demo3 from './live-demos/demo3.mp4';
import demo4 from './live-demos/demo4.mp4';
import demo5 from './live-demos/demo5.mp4';

const SlidesContent = ({
  allSlides,
}: {
  allSlides: Record<string, IGatsbyImageData | undefined>;
}) => {
  const getSlideSafe = (
    slides: Record<string, IGatsbyImageData | undefined>,
    slideId: string,
  ): IGatsbyImageData => {
    const slide = slides[slideId];
    if (slide) {
      return slide;
    }

    throw new Error(`Slide ${slideId} not found`);
  };

  return (
    <>
      <Slide
        slideId="contents"
        useImageBorder={true}
        image={
          <SlideGatsbyImage
            alt=""
            imageData={getSlideSafe(allSlides, 'title')}
          />
        }
      >
        <p>This is what we’ll talk about.</p>
        <Contents>
          Jump to:
          <ContentsInner>
            <ol>
              <li>
                <a href="#introduction">Introduction</a>
              </li>
              <li>
                <a href="#hooks">
                  <code>useTransition()</code> and{' '}
                  <code>useDeferredValue()</code>
                </a>
              </li>
              <li>
                <a href="#performance-optimizations">
                  Performance optimizations
                </a>
              </li>
              <li>
                <a href="#giving-control-back">Giving control back</a>
              </li>
              <br />
              <br />
              <br />
              <li>
                <a href="#drawbacks">Drawbacks</a>
                <ol>
                  <li>
                    <a href="#slide29">
                      Non-urgent updates take (a bit) longer
                    </a>
                  </li>
                  <li>
                    <a href="#slide33">Extra CPU & size const</a>
                  </li>
                  <li>
                    <a href="#slide38">
                      Doesn’t help to optimize expensive components
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <a href="#summary">Summary</a>
              </li>
            </ol>
          </ContentsInner>
        </Contents>
      </Slide>

      <SectionHeader id="introduction">Introduction</SectionHeader>

      <Slide
        slideId="slide3"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide3')} />
        }
      >
        <p>
          One thousand, four hundred, eighty nine days. This is how much time
          passed between Dan Abramov showed the first preview of what, back
          then, was called “Time Slicing” – and the React 18 release which
          finally made these capabilities available for everyone
        </p>
      </Slide>

      <Slide
        slideId="slide5"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide5')} />
        }
      >
        <p>
          In these 1489 days, “Time Slicing” went through a bunch of
          rebrandings, several API changes, and, today, became known as
          “Concurrent Rendering”.
        </p>
      </Slide>

      <Slide
        slideId="slide10"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide10')} />
        }
      >
        <p>
          Cool. So, if you’ve upgraded to React 18, you might’ve already seen
          its new features. If you haven’t, the “Concurrent Rendering” name
          might sound scary. But that’s okay! What’s actually new,
          performance-wise, in React 18 is just three things
        </p>
        <ul>
          <li>
            {' '}
            The new hooks – like <code>useTransition</code> and{' '}
            <code>useDeferredValue</code>
          </li>
          <li>
            Some hydration improvements around <code>{'<Suspense>'}</code>{' '}
          </li>
          <li>
            Better batching of updates, like <code>useState</code> and{' '}
            <code>useReducer</code> updates
          </li>
        </ul>
      </Slide>

      <SectionHeader id="hooks">useTransition / useDeferredValue</SectionHeader>

      <Slide
        slideId="slide11"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide11')} />
        }
      >
        <p>
          Working with these things – especially with stuff like{' '}
          <code>useTransition</code> – might sometimes feel like magic. So
          today, I want to show you what actually happens in the app whenever
          you use the first – the most foundational – performance feature –{' '}
          <code>useTransition()</code> – and how React achieves this “magic”
          which is actually not magic at all.
        </p>
        <p>
          So, let’s dive into into <code>useTransition</code>/
          <code>useDeferredValue</code>
          hooks. And to show them, let me show you a slow app.
        </p>
      </Slide>

      <LiveDemo
        slideId="live-demo-1"
        title="Slow app"
        videoSource={demo1}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={832}
      />

      <Slide
        slideId="slide13"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide13')} />
        }
      >
        <p>What happens is I’m typing into the text field,</p>
        <ul>
          <li>that changes the state in a bunch of components,</li>
          <li>
            and that causes React to rerender all these components – one by one,
            until it’s done.
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide14"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide14')} />
        }
      >
        <p>
          It’s a stop-the-world operation – nothing can happen until React is
          done.
        </p>
        <ul>
          <li>If a user tries to interact with the app in any way,</li>
          <li>they’ll have to wait until the rerender is done</li>
          <li>
            If re-rendering the app takes 2 seconds, the user will have to wait
            for two seconds.
          </li>
          <li>
            This is how React 17 works, React 16 works, even React 18 works out
            of the box.
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide15"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide15')} />
        }
      >
        <p>
          This is how React 17 works, React 16 works, even React 18 works out of
          the box.
        </p>
      </Slide>

      <SectionHeader id="performance-optimizations">
        Performance optimizations
      </SectionHeader>

      <Slide
        slideId="slide16"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide16')} />
        }
      >
        <p>Now, let’s take a step back. We have a performance issue:</p>
        <ul>
          <li>I’m typing into the text field</li>
          <li>The text field causes the list of notes to rerender</li>
          <li>
            And this render is blocking and expensive, which slows the app and
            the whole typing process
          </li>
        </ul>
        <p>
          So, my question to you, folks: how would you try to solve this with
          React 17? There are multiple solutions here, and I’m curious what
          you’d try.
        </p>
      </Slide>

      <LiveDemo
        slideId="live-demo-2"
        title="Performance optimizations"
        videoSource={demo2}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={832}
      />

      <Slide
        slideId="slide17"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide17')} />
        }
      >
        <p>
          With React 17 and below, every update that happens in the app is
          considered urgent. If you click a button, React has to handle the
          update immediately. If you type into the text field, React has to
          rerender the list of notes immediately.
        </p>
        <ul>
          <li>
            With React 18, your updates can now have a priority. Every update
            you make in the app is still, by default, urgent.
          </li>
          <li>
            But what React now also supports is non-urgent updates. And
            non-urgent updates don’t block the page – no matter how long they
            take.
          </li>
        </ul>
        <p>Let’s see how this works.</p>
      </Slide>

      <LiveDemo
        slideId="live-demo-3"
        title="Non-urgent updates"
        videoSource={demo3}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={832}
      />

      <SectionHeader id="giving-control-back">
        Giving control back
      </SectionHeader>

      <Slide
        slideId="slide20"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide20')} />
        }
      >
        <p>
          The way this works is giving. React starts rendering the app – and
          then gives back control to the browser after every frame. Let’s see
          how this looks in DevTools.
        </p>
      </Slide>

      <LiveDemo
        slideId="live-demo-4"
        title="Giving Control Back"
        videoSource={demo4}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={832}
      />

      <Slide
        slideId="slide21"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide21')} />
        }
      >
        <p>
          Here’s how concurrent rendering conceptually works under the hood.
        </p>
        <ul>
          <li>
            React has a queue of updates. In our case, this queue has components
            that don’t need to be updated urgently – it’s NotesList and a bunch
            of NoteButtons.
          </li>
          <li>
            React also has a function called{' '}
            <code>performWorkUntilDeadline().</code> This function takes the
            update queue and processes it, one by one.
          </li>
        </ul>
        <p>
          In React 17, this was pretty much it. You’d start processing the
          queue, and you’d keep processing it until you’re done. All this time,
          the thread would be blocked.
        </p>
        <ul>
          <li>
            But React 18 added two critical changes. First, in the while loop,
            it added a check called <code>shouldYieldToHost()</code> – which
            tells React whether it should give control back to the browser.
          </li>
          <li>
            And second, after the loop, React now checks whether there are still
            any pending unprocessed updates – and schedules another
            <code>performWorkUntilDeadline()</code> function to be executed in
            the next frame.
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide22"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide22')} />
        }
      >
        <p>
          Now, <code>shouldYieldToHost</code> – the function that decides when
          React should return control back to the browser – is basically a
          one-liner.
        </p>
        <ul>
          <li>
            It returns true if the current render has been taking more than 5
            ms.
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide23"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide23')} />
        }
      >
        <p>
          <code>schedulePerformWorkUntilDeadline</code> – the function that
          schedules the next 5 ms chunk of JavaScript activity – is also pretty
          simple.
        </p>
        <ul>
          <li>
            In environments like Node.js, it simply calls{' '}
            <code>setImmediate()</code>
          </li>
          <li>
            In older browsers, it calls setTimeout with a zero delay. This,
            simply speaking, schedules the function to run in the next frame.
          </li>
          <li>
            And in modern browsers, it creates a new MessageChannel object and
            posts a message through it. This works just like setTimeout with a
            zero delay, but avoids the minimal delay imposed by{' '}
            <code>setTimeout()</code>.
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide24"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide24')} />
        }
      >
        <p>And that’s pretty much it!</p>
        <p>
          If you remember this slide from the past, this is how React 17 behaved
          when I tried typing into the filter field. I typed into the field,
          that changed the state in a bunch of components, and React rendered
          all components in one single pass.
        </p>
      </Slide>

      <Slide
        slideId="slide25"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide25')} />
        }
      >
        <p>
          Now, with React 18, this changes. When I try typing into the filter
          field, React calls <code>setFilterInput()</code>, and then,
          immediately after, calls <code>setFilterValue()</code>.
        </p>
        <ul>
          <li>
            That causes the state to update in a bunch of component. But now,
            some of these state updates are urgent – whereas other ones are
            marked as not.
          </li>
          <li>
            And so, what React now does, is it renders the urgent updates in the
            old, blocking manner.
          </li>
          <li>
            But then starts rendering non-urgent updates in a non-blocking way –
            giving the control back to the browser every 5 ms
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide26"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide26')} />
        }
      >
        <p>And so, now,</p>
        <ul>
          <li>if the user tries to click something during rendering,</li>
          <li>That click will be handled pretty much immediately</li>
          <li>No matter when the click happens</li>
          <li>
            Because every non-urgent render would typically be blocking the main
            thread for only 5-10 milliseconds
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide27"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27')} />
        }
      >
        <p>
          This is React 18’s Concurrent Rendering, and this is how it works
          under the hood.
        </p>
      </Slide>

      <SectionHeader id="drawbacks">Drawbacks</SectionHeader>

      <Slide
        slideId="slide28"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide28')} />
        }
      >
        <p>Now, what about drawbacks? Because, ofc, there’s no free lunch.</p>
      </Slide>

      <Slide
        slideId="slide29"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide29')} />
        }
      >
        <p>
          The first drawback is that non-urgent updates take longer. React has
          to yield the control back to the browser all the time, and that
          introduces some delays.
        </p>
      </Slide>

      <LiveDemo
        slideId="live-demo-5"
        title="Urgent vs non-urgent updates render time comparison"
        videoSource={demo5}
        videoType="video/mp4"
        videoWidth={1920}
        videoHeight={832}
      />

      <Slide
        slideId="slide30"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide30')} />
        }
      >
        <p>
          Now, this would hopefully, maybe be solved with a different
          <code>shouldYieldToHost</code> implementation, which is currently
          implemented behind a flag.
        </p>
        <p>
          Today, as we talked, <code>shouldYieldToHost</code> is basically a
          one-liner. React gives the control back to the browser every 5 ms.
        </p>
      </Slide>

      <Slide
        slideId="slide31"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide31')} />
        }
      >
        <p>
          The implementation that’s currently behind the flag is more
          sophisticated. Specifically, instead of just yielding to the browser
          every 5 ms, it checks whether the user tried interacting with the app
          – and yields back to the browser only if the user did. (Or if the
          render was taking longer than 300 ms.)
        </p>
      </Slide>

      <Slide
        slideId="slide32"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide32')} />
        }
      >
        <p>
          This relies on one of my favorite lesser-known browser APIs called
          <code>isInputPending()</code>. <code>isInputPending()</code> is a
          function that you could call at any moment while running any
          JavaScript – and it will return true if the user tried to interact
          with the page while you’re running this JavaScript.
        </p>
        <ul>
          <li>
            Unfortunately, this function is currently Chromium-only. It was
            shipped in Chromium 87.
          </li>
        </ul>
        <p>
          That’s the first drawback. Non-urgent updates take longer; it might be
          kinda fixed with a new <code>shouldYieldToHost()</code>, but it relies
          on a Chromium-only API, for now.
        </p>
      </Slide>

      <Slide
        slideId="slide33"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide33')} />
        }
      >
        <p>
          The second drawback is: this extra complexity doesn’t come for free.
          To make concurrent rendering possible, React had to make its
          architecture much more complex. It introduced React Fiber, it
          introduced concurrent rendering checks. All this stuff takes a toll on
          the bundle – and on the CPU. In fact, this is one of the reasons Vue
          and Preact straight refused to implement anything similar to
          concurrent rendering.
        </p>
      </Slide>

      <Slide
        slideId="slide34"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide34')} />
        }
      >
        <p>
          Both Vue.js and Preact believe that it’s unlikely any real-world apps
          will benefit from concurrency features:
        </p>
        <ul>
          <li>Preact: …</li>
          <li>Vue: …</li>
        </ul>
        <p>
          Evan You from Vue.js even wrote a detailed opinion on how React
          basically invented an overly expensive scheduler and now tries to
          solve it with concurrency features. You’ll find the link in the usual
          place.
        </p>
      </Slide>

      <Slide
        slideId="slide35"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide35')} />
        }
      >
        <p>
          The React team, however, seems to play a long game – and is explicit
          about it. Mostly on Twitter, because that’s where all the real
          documentation lives nowadays.
        </p>
      </Slide>

      <Slide
        slideId="slide36"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide36')} />
        }
      >
        <p>
          For example, one of the things the Concurrent Features will unlock is
          the upcoming Offscreen API. The Offscreen API will allow to pre-render
          stuff like inactive routes, tabs, etc in the background – so that when
          you click a link, the switch happens literally instantly. The
          offscreen API prerenders inactive parts of the app in the background –
          and does it in the same non-blocking way useTransition works.
        </p>
      </Slide>

      <Slide
        slideId="slide37"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide37')} />
        }
      >
        <p>And what do I think about this disagreement? Well.</p>
      </Slide>

      <Slide
        slideId="slide38"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide38')} />
        }
      >
        <p>
          There’s another drawback slash pitfall. React Concurrency doesn’t help
          to optimize expensive components.
        </p>
      </Slide>

      <Slide
        slideId="slide39"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide39')} />
        }
      >
        <p>
          If you look at React’s primary rendering loop again, you’ll notice
          that <code>shouldYieldToHost</code> is only called after every render.
        </p>
        <ul>
          <li>
            The perform unit of work function takes one component from the queue
            and renders it
          </li>
          <li>
            And, after that, React checks whether it should return the control
            to the browser
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide40"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide40')} />
        }
      >
        <p>So, if any single component takes, for example, not 5,</p>
      </Slide>

      <Slide
        slideId="slide41"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide41')} />
        }
      >
        <p>
          but 500 ms to render, the main thread will be blocked for the full 500
          ms.
        </p>
        <p>
          React has no way to interrupt rendering of a single component.
          Rendering a component is just calling the component’s function. You
          can’t stop the function once you started executing it.
        </p>
        <p>And this is the third drawback of React concurrency.</p>
      </Slide>

      <SectionHeader id="summary">Summary</SectionHeader>

      <Slide
        slideId="slide42"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide42')} />
        }
      >
        <p>To summarize, React Concurrency is</p>
        <ul>
          <li>Slower (for non-urgent updates)</li>
          <li>More CPU-expensive (for all updates)</li>
          <li>Doesn’t help with expensive components</li>
        </ul>
        <p>
          But if you’re willing to deal with these drawbacks and pitfalls,
          you’ll get this almost magical behavior of rendering something huge –
          and not slowing the page at all.
        </p>
      </Slide>

      <Slide
        slideId="slide43"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide43')} />
        }
      >
        <p>Is this a meme? Maybe this is a meme.</p>
      </Slide>

      <Slide
        slideId="slide44"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide44')} />
        }
      >
        <p>And that, my friends, is React Concurrency.</p>
      </Slide>

      <Slide
        slideId="credits"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'credits')} />
        }
      >
        <p>And that’s it from me. Thanks!</p>
        <p>
          Follow me on Twitter:{' '}
          <a href="https://twitter.com/iamakulov">@iamakulov</a>
        </p>
      </Slide>
    </>
  );
};

const SlidesContentWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        sectionHeaders: allFile(
          filter: {
            relativeDirectory: { eq: "talks/react18-concurrency/slides" }
            name: { glob: "*-header" }
          }
        ) {
          edges {
            node {
              name
              childImageSharp {
                gatsbyImageData(
                  width: 700
                  placeholder: NONE
                  layout: CONSTRAINED
                  formats: [AUTO]
                )
              }
            }
          }
        }
        allSlides: allFile(
          filter: {
            relativeDirectory: { eq: "talks/react18-concurrency/slides" }
            extension: { nin: ["svg", "mp4"] }
          }
        ) {
          edges {
            node {
              name
              childImageSharp {
                gatsbyImageData(
                  width: 500
                  placeholder: NONE
                  layout: CONSTRAINED
                  formats: [AUTO]
                )
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
              gatsbyImageData: IGatsbyImageData;
            };
          };
        }>;
      };
      sectionHeaders: {
        edges: Array<{
          node: {
            name: string;
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
          };
        }>;
      };
    }) => {
      const allSlidesByName = Object.fromEntries(
        data.allSlides.edges.map((edge) => {
          return [edge.node.name, edge.node.childImageSharp.gatsbyImageData];
        }),
      );

      return <SlidesContent allSlides={allSlidesByName} />;
    }}
  />
);

export default SlidesContentWithQuery;
