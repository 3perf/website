import { graphql, StaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { SlideGatsbyImage } from '../../../components/talks/Slide';
import {
  AnimatedSlide,
  Contents,
  ContentsInner,
  Footnote,
  LiveDemo,
  SectionHeader,
  Slide,
  SmallParagraph,
} from '../styled';
import Slide27_12 from './slides/slide27-12.component.svg';
import Slide27_9 from './slides/slide27-9.component.svg';

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
        slideId="slide-contents"
        useImageBorder={true}
        image={
          <SlideGatsbyImage
            alt=""
            imageData={getSlideSafe(allSlides, 'contents')}
          />
        }
      >
        <p>Here’s what we’ll talk about.</p>
        <Contents>
          Jump to:
          <ContentsInner>
            <ol>
              <li>
                <a href="#react-17">React 17 &amp; blocking rendering</a>
              </li>
              <li>
                <a href="#react-18">React 18 &amp; concurrent updates</a>
              </li>
              <li>
                <a href="#under-the-hood">
                  <code>useTransition</code>
                </a>
              </li>
              <li>
                <a href="#suspense">
                  <code>{`<Suspense>`}</code>
                </a>
              </li>
              <li style={{ breakInside: 'avoid' }}>
                <a href="#drawbacks">Drawbacks</a>
                <ol>
                  <li>
                    <a href="#slide29">
                      Non-urgent updates take (a bit) longer
                    </a>
                  </li>
                  <li>
                    <a href="#slide33">Extra CPU cost</a>
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

      <Slide
        slideId="slide-3"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide3')} />
        }
      >
        <p>
          1489 days. This is how much time passed between Dan Abramov{' '}
          <a href="https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html">
            showing the first preview
          </a>{' '}
          of what, back then, was called “Time Slicing” – and{' '}
          <a href="https://reactjs.org/blog/2022/03/29/react-v18.html">
            the React 18 release
          </a>
          , which finally made these capabilities available for everyone.
        </p>
      </Slide>

      <Slide
        slideId="slide-5"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide5')} />
        }
      >
        <p>
          In these 1489 days, “Time Slicing” went through{' '}
          <a href="https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html">
            a bunch
          </a>{' '}
          of{' '}
          <a href="https://github.com/reactwg/react-18/discussions/64">
            rebrandings
          </a>
          , <a href="https://github.com/facebook/react/pull/20976">several</a>{' '}
          API{' '}
          <a href="https://github.com/reactwg/react-18/discussions/86">
            changes
          </a>
          , and, today, became known as “Concurrent Rendering.”
        </p>
        <SmallParagraph>
          See also:{' '}
          <a href="https://twitter.com/dan_abramov/status/1402941108326486017">
            Dan Abramov’s thread on why concurrent rendering took so long
          </a>
          .
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-10"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide10')} />
        }
      >
        <p>
          If you’ve upgraded to React 18, you might’ve already seen its new
          features. If you haven’t, the “Concurrent Rendering” name might sound
          scary. But that’s okay! What’s actually new, performance-wise, in
          React 18 is just three things:
        </p>
        <ul>
          <li>
            {' '}
            The new{' '}
            <a href="https://reactjs.org/docs/hooks-reference.html#usetransition">
              <code>useTransition</code>
            </a>{' '}
            and{' '}
            <a href="https://reactjs.org/docs/hooks-reference.html#usedeferredvalue">
              <code>useDeferredValue</code>
            </a>{' '}
            hooks
          </li>
          <li>
            <a href="https://github.com/reactwg/react-18/discussions/37">
              Server-side rendering
            </a>{' '}
            and{' '}
            <a href="https://twitter.com/iamakulov/status/1537085468327587840">
              hydration improvements
            </a>{' '}
            around <code>{'<Suspense>'}</code>{' '}
          </li>
          <li>
            <a href="https://github.com/reactwg/react-18/discussions/21">
              Better batching of updates
            </a>{' '}
            (like calling <code>setState</code> from the <code>useState</code>{' '}
            hook)
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide-11"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide11')} />
        }
      >
        <p>
          Working with these things – especially with stuff like{' '}
          <code>useTransition</code> – might sometimes feel like magic. So
          today, I want to show you what actually happens in the app whenever
          you use <code>useTransition</code> and <code>{`<Suspense>`}</code>.
        </p>
        <p>And to show that, let’s take a look at a slow app.</p>
      </Slide>

      <SectionHeader id="react-17">
        React 17 &amp; Blocking Updates
      </SectionHeader>

      <LiveDemo
        slideId="live-demo-1"
        title="Slow app"
        videoSource={'https://www.youtube.com/embed/Y6J1-vYD1ro'}
        videoWidth={1920}
        videoHeight={832}
      />

      <Slide
        slideId="slide-13"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide13')} />
        }
      >
        <p>We have a slow app. What happens in the app is:</p>
        <ol>
          <li>I’m typing into the text field,</li>
          <li>that changes the state in a bunch of components,</li>
          <li>
            and that causes React to rerender all these components – one by one,
            until it’s done.
          </li>
        </ol>
      </Slide>

      <Slide
        slideId="slide-14"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide14')} />
        }
      >
        <p>
          It’s a stop-the-world operation – nothing can happen until React is
          done.
        </p>
        <p>
          So if a user tries to interact with the app in any way, they’ll have
          to wait until the rerender is done. If rerendering the app takes 2
          seconds, the user will have to wait for two seconds.
        </p>
      </Slide>

      <Slide
        slideId="slide-15"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide15')} />
        }
      >
        <p>
          This is how React 17 works, React 16 works, and even React 18 works
          out of the box.
        </p>
      </Slide>

      <Slide
        slideId="slide-15-1"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide15-1')} />
        }
      >
        <p>Now, let’s take a step back. We have a performance issue:</p>
        <ul>
          <li>I’m typing into the text field</li>
          <li>
            The text field causes the list of notes (in the yellow sidebar) to
            rerender
          </li>
          <li>
            And this render is blocking and expensive, which slows the app and
            the whole typing process
          </li>
        </ul>
        <p>How can we solve this with React 17?</p>
      </Slide>

      <Slide
        slideId="slide-16"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide16')} />
        }
      >
        <p>With React 17, there are multiple working solutions. We can:</p>
        <ul>
          <li>
            wrap some components with <code>React.memo()</code> – assuming the
            primary reason the input is slow is that a lot of components are
            rerendering unnecessarily,
          </li>
          <li>try finding expensive components and optimizing them,</li>
          <li>
            <a href="https://github.com/bvaughn/react-window">virtualize</a> the
            list of notes,
          </li>
          <li>
            or{' '}
            <a href="https://css-tricks.com/debouncing-throttling-explained-examples/">
              debounce or throttle
            </a>{' '}
            the input so the UI rererenders less frequently.
          </li>
        </ul>
        <p>
          However, React 18 introduces another solution: marking the UI update
          as “non-urgent.”
        </p>
      </Slide>

      <Footnote>
        <p>
          <strong>
            <mark>By the way – need help with React performance?</mark>
          </strong>{' '}
          We helped product companies like Appsmith, Hugo, and Castor to get
          React apps{' '}
          <a href="/#clients">two, three, or even ten times faster</a> and
          improve customer satisfaction. <a href="/#services">Let’s chat!</a>
        </p>
      </Footnote>

      <SectionHeader id="react-18">
        React 18 &amp; Non-Urgent Updates
      </SectionHeader>

      <Slide
        slideId="slide-17"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide17')} />
        }
      >
        <p>What does “a non-urgent update” mean?</p>
        <p>
          With React 17 and below, every update that happens in the app is
          considered urgent. If you click a button, React has to handle the
          update immediately. If you type into the text field, React has to
          rerender the list of notes immediately.
        </p>
        <ul>
          <li>
            With React 18, your updates now can have a priority. Every update
            you make in the app is still, by default, urgent.
          </li>
          <li>
            But what React now also supports is non-urgent updates. And
            non-urgent updates don’t block the page¹ – no matter how long they
            take.
          </li>
        </ul>
        <p>Let’s see how this looks.</p>
        <SmallParagraph>
          ¹ — <em>typically,</em> don’t block the page. See{' '}
          <a href="#slide38">
            the third drawback of Concurrent Rendering below
          </a>
          .
        </SmallParagraph>
        <SmallParagraph>
          To learn more about how React 18 handles priorities, see{' '}
          <a href="https://twitter.com/swyx/status/1402351584533573634">
            a Twitter thread by @swyx
          </a>
          ,{' '}
          <a href="https://github.com/reactwg/react-18/discussions/27">
            a React 18 Working Group discussion
          </a>
          , and{' '}
          <a href="https://jser.dev/react/2022/03/26/lanes-in-react.html">
            an article by JSer
          </a>
          .
        </SmallParagraph>
      </Slide>

      <LiveDemo
        slideId="live-demo-3"
        title="How non-urgent updates work"
        videoSource={'https://www.youtube.com/embed/i9hXIvLOt_k'}
        videoWidth={1920}
        videoHeight={832}
      />

      <Slide
        slideId="slide-20"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide20')} />
        }
      >
        <p>This looks pretty magical – so how does this work?</p>
        <p>
          The way this works is by giving the control back to the browser. React
          starts rendering the app – and then gives back control to the browser
          approximately every 5 ms.
        </p>
        <p>
          This allows the browser to handle user input immediately. Let’s see
          how this looks in DevTools.
        </p>
      </Slide>

      <LiveDemo
        slideId="live-demo-4"
        title="React Concurrency through DevTools"
        videoSource={'https://www.youtube.com/embed/wVLRBSJERTY'}
        videoWidth={1920}
        videoHeight={832}
      />

      <SectionHeader id="under-the-hood">
        <code>useTran&shy;sition</code>
      </SectionHeader>

      <Slide
        slideId="slide-21"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide21')} />
        }
      >
        <p>
          Here’s how concurrent rendering conceptually works under the hood.
        </p>
        <ol>
          <li>
            React has a queue of updates. In our case, this queue has components
            that don’t need to be updated urgently – it’s a{' '}
            <code>NotesList</code> and a bunch of <code>NoteButton</code>s.
          </li>
          <li>
            React also has a function called{' '}
            <code>performWorkUntilDeadline().</code> This function takes the
            update queue and processes it, one by one.
          </li>
        </ol>
      </Slide>

      <Slide
        slideId="slide-21-1"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide21-1')} />
        }
      >
        <p>
          In React 17, this was it. You’d start processing the queue, and you’d
          keep processing it until you’re done. All this time, the main thread
          would be blocked.
        </p>
        <p>But React 18 added two critical changes:</p>
        <ol start={3}>
          <li>
            In the while loop, React 18 added a check called{' '}
            <code>shouldYieldToHost()</code> – which tells React whether it
            should give control back to the browser.
          </li>
          <li>
            And after the loop, React 18 now checks whether there are still any
            pending unprocessed updates – and schedules another
            <code>performWorkUntilDeadline()</code> function to be executed in
            the next frame.
          </li>
        </ol>
        <SmallParagraph>
          Actual code of <code>performWorkUntilDeadline()</code>:{' '}
          <a href="https://github.com/facebook/react/blob/f0efa1164b7ca8523b081223954d05c88e92053b/packages/scheduler/src/forks/Scheduler.js#L519-L552">
            <code>scheduler/src/forks/Scheduler.js#L519-L552</code>
          </a>
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-22"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide22')} />
        }
      >
        <p>
          Now, <code>shouldYieldToHost()</code> (the function that decides when
          React should return control to the browser) has only one condition.
        </p>
        <p>
          It returns true when more than 5 ms have passed since the start of the
          current render.
        </p>
        <SmallParagraph>
          Actual code of <code>shouldYieldToHost()</code>:{' '}
          <a href="https://github.com/facebook/react/blob/f0efa1164b7ca8523b081223954d05c88e92053b/packages/scheduler/src/forks/Scheduler.js#L444-L483">
            <code>scheduler/src/forks/Scheduler.js#L444-L483</code>
          </a>
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-23"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide23')} />
        }
      >
        <p>
          <code>schedulePerformWorkUntilDeadline()</code> (the function that
          schedules the next 5 ms chunk of JavaScript activity) is also pretty
          short.
        </p>
        <ol>
          <li>
            In environments like Node.js, it calls{' '}
            <a href="https://nodejs.dev/en/learn/understanding-setimmediate/">
              <code>setImmediate()</code>
            </a>
            .
          </li>
          <li>
            In older browsers, it calls <code>setTimeout()</code> with a
            parameter of 0. This schedules the function to run in the next
            frame¹.
          </li>
          <li>
            And in modern browsers, it creates a new{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel">
              <code>MessageChannel</code>
            </a>{' '}
            object and posts a message through it. This works just like
            <code>setTimeout()</code> with a parameter of 0, but avoids{' '}
            <a href="https://softwareengineering.stackexchange.com/questions/269462/why-do-browsers-clamp-timeouts-and-intervals">
              the minimal 4ms delay imposed by browsers²
            </a>
            .
          </li>
        </ol>
        <SmallParagraph>
          ¹ — Technically, this schedules{' '}
          <a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/">
            a new task to execute
          </a>
          . A new task doesn’t necessarily mean a new frame: if there’s nothing
          to update on the screen, the browser won’t paint a new frame. However,
          the browser <em>will</em> be able to handle pending user input between
          the tasks.
        </SmallParagraph>
        <SmallParagraph>
          ² — The delay is technically called “setTimeout clamping.” It was{' '}
          <a href="https://chromestatus.com/feature/4889002157015040">
            recently removed from modern browsers
          </a>
          . For example, Chrome now enables it only{' '}
          <a href="https://chromestatus.com/feature/5710690097561600">
            when <code>setTimeout()</code> is nested more than 15 levels deep
          </a>
          .
        </SmallParagraph>
        <SmallParagraph>
          Actual code of <code>schedulePerformWorkUntilDeadline()</code>:{' '}
          <a href="https://github.com/facebook/react/blob/f0efa1164b7ca8523b081223954d05c88e92053b/packages/scheduler/src/forks/Scheduler.js#L554-L584">
            <code>scheduler/src/forks/Scheduler.js#L554-L584</code>
          </a>
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-24"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide24')} />
        }
      >
        <p>And that’s pretty much it!</p>
        <p>
          If you remember <a href="#slide13">this slide</a> from earlier, this
          is how React 17 behaved when I tried typing into the filter field. I
          typed into the field, which changed the state, and React rendered the
          changed component and all its children in a single pass.
        </p>
      </Slide>

      <Slide
        slideId="slide-25"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide25')} />
        }
      >
        <p>
          Now, with React 18, this changes. When I try typing into the filter
          field, React calls <code>setFilterInput()</code>, and then,
          immediately after, calls <code>setFilterValue()</code>.
        </p>
        <ol>
          <li>That makes React schedule an update to a bunch of components.</li>
          <li>
            But now, some of these updates are marked as urgent, while others
            are marked as non-urgent.
          </li>
          <li>
            So now, React renders the urgent updates in a single pass (like
            before). But then, non-urgent updates start rendering using the new,
            non-blocking approach – giving the control back to the browser every
            5 ms.
          </li>
        </ol>
        <SmallParagraph>
          Curious why React doesn’t use web workers to render non-urgent
          updates? That’s because they’re a) too limited and b) bring
          initialization, memory, and serialization overheads. See{' '}
          <a href="https://twitter.com/dan_abramov/status/1234297789938589696">
            a thread by Dan Abramov
          </a>
          .
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-26"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide26')} />
        }
      >
        <p>
          And so, now, if the user tries to click something during rendering,
          the browser will handle that click immediately. That’s because every
          non-urgent render will typically block the main thread only for 5-10
          milliseconds.
        </p>
      </Slide>

      <Slide
        slideId="slide-27"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27')} />
        }
      >
        <p>
          This is React 18’s Concurrent Rendering – and how it works under the
          hood.
        </p>
      </Slide>

      <Slide
        slideId="slide-27-1"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-1')} />
        }
      >
        <p>
          There’s also another reason why I’m so excited about the React 18
          release. Sooner or later, Google would likely make{' '}
          <a href="https://web.dev/inp">INP</a> (Interaction to Next Paint) the
          next Core Web Vital.
        </p>
        <p>
          Interaction to Next Paint measures how much the page lags after a
          click or a keypress. And right now, every React client I work with has
          their INP in the red.
        </p>
        <p>
          <code>useTransition()</code> is a reliable way to make interactions
          cheaper. So there’s a chance this API will move the INP needle in a
          better direction.
        </p>
      </Slide>

      <SectionHeader id="suspense">
        <code>{`<Suspense>`}</code>
      </SectionHeader>

      <Slide
        slideId="slide-27-2"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-2')} />
        }
      >
        <p>
          That’s how concurrent rendering works with the useTransition hook.
          Now, let’s talk about React hydration.
        </p>
      </Slide>

      <Slide
        slideId="slide-27-3"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-3')} />
        }
      >
        <p>
          If you’re not familiar with{' '}
          <a href="https://beta.reactjs.org/apis/react-dom/hydrate">
            React hydration
          </a>
          , it’s a process when you
        </p>
        <ul>
          <li>server-render a site</li>
          <li>
            then, on the client, hydrate that site (rendering every component
            again and attaching generated event listeners to the already
            existing DOM),
          </li>
          <li>and get a live site.</li>
        </ul>
        <p>
          Hydration is typically the most expensive JavaScript operation in a
          React app. That’s because, during hydration, React renders every
          component on the page in one go.
        </p>
      </Slide>

      <Slide
        slideId="slide-27-4"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-4')} />
        }
      >
        <p>
          Like, here’s the <a href="https://deliveroo.co.uk/">Deliveroo</a> site
          spending 1.55s hydrating the site with 4× CPU throttling.
        </p>
        <SmallParagraph>Screenshots captured in Oct 2022. </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-27-5"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-5')} />
        }
      >
        <p>
          Or here’s <a href="https://walmart.com">Walmart</a>, spending 1.10s
          hydrating its site.
        </p>
      </Slide>

      <Slide
        slideId="slide-27-6"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-6')} />
        }
      >
        <p>
          Or, here’s <a href="https://notion.so">Notion</a>, spending 1.8s on
          hydration.
        </p>
        <p>
          And I don’t mean these sites are bad. This is a typical scenario with
          React 17. Every client I work with experiences a similar issue.
        </p>
      </Slide>

      <Slide
        slideId="slide-27-7"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-7')} />
        }
      >
        <p>Now, React 18 changes this. With React 18, you can</p>
        <ul>
          <li>take your site – like the Notion site, for example –</li>
          <li>
            figure out which parts of it are non-interactive or non-critical
          </li>
          <li>
            and wrap them with a{' '}
            <a href="https://beta.reactjs.org/apis/react/Suspense">
              <code>{'<Suspense>'}</code>
            </a>{' '}
            component
          </li>
        </ul>
        <SmallParagraph>
          More reading about how <code>{'<Suspense>'}</code> changes in React
          18:{' '}
          <a href="https://github.com/reactwg/react-18/discussions/37">
            Server-side rendering
          </a>{' '}
          ·{' '}
          <a href="https://github.com/reactwg/react-18/discussions/130">
            Selective Hydration
          </a>
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-27-8"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-8')} />
        }
      >
        <p>Here’s how this would look when implemented.</p>
      </Slide>

      <AnimatedSlide slideId="slide-27-9" Svg={Slide27_9} hasControls>
        <p>With this change, here’s how hydration will work:</p>
        <ol>
          <li>
            You’d call <code>hydrateRoot()</code>.
          </li>
          <li>React will start rendering components in a single pass.</li>
          <li>
            Until it, at some point, stumbles upon the{' '}
            <code>{'<Suspense>'}</code> boundary. React understands that
            “Suspense” means “non-urgent hydration,” so it wouldn’t proceed past
            that Suspense boundary just yet.
          </li>
          <li>
            Instead, React would keep rendering urgent components – until it’s
            done – and then will render non-urgent ones, yielding back to the
            browser every ~5ms.
          </li>
        </ol>
      </AnimatedSlide>

      <Slide
        slideId="slide-27-10"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-10')} />
        }
      >
        <p>Here’s how this looks in DevTools.</p>
      </Slide>

      <Slide
        slideId="slide-27-11"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-11')} />
        }
      >
        <p>
          And, just like <code>useTransition()</code>, this helps to improve{' '}
          <a href="https://web.dev/inp/">Interaction to Next Paint</a> too!
        </p>
        <p>
          Because now, the hydration is split into two parts: an urgent one and
          a non-urgent one.
        </p>
        <p>
          Without <code>{`<Suspense>`}</code>, React treated the whole hydration
          process as urgent. If hydration took 600 ms, the main thread would
          stay stay blocked for 600 ms.
        </p>
        <p>
          Now, with <code>{`<Suspense>`}</code>, the urgent part might take just
          300 ms instead of 600 ms. The main thread will stay blocked only for
          300 ms – so if the user tries to interact with the app during
          hydration, the interaction will get blocked for 300 ms at most.
        </p>
      </Slide>

      <AnimatedSlide slideId="slide-27-12" Svg={Slide27_12} autoplay="enabled">
        <p>
          Now, you might ask, “Okay, but if this is so good, if this makes the
          page so responsive, why don’t I wrap the whole app with Suspense?”
        </p>
      </AnimatedSlide>

      <Slide
        slideId="slide-27-13"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-13')} />
        }
      >
        <p>The answer is: this would actually flop your INP. Why?</p>
      </Slide>

      <Slide
        slideId="slide-27-14"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-14')} />
        }
      >
        <p>
          If you wrap a large part of the site (or the whole site) with
          <code>{'<Suspense>'}</code>, that part of the site will start
          rendering non-urgently, in 5 ms chunks. And this is precisely what we
          want, right?
        </p>
        <p>
          However, if, during hydration, the user tries to interact with
          something inside <code>{'<Suspense>'}</code>, React will immediately
          switch back to the blocking mode.
        </p>
        <p>
          Why? The non-hydrated part of the app is not interactive. By default,
          if you were to click a non-hydrated button, nothing would happen. But
          this is a bad user experience!
        </p>
        <p>
          So, as soon as React starts hydration, it overrides this experience.
          If you click a non-hydrated button while hydration is ongoing, React
          will try to execute the <code>onClick</code> listener on that button.
        </p>
        <p>
          But how can React learn which <code>onClick</code> that button has
          before the button is hydrated? It can’t. It would be cool if React
          finished the hydration, then found the right <code>onClick</code>, and
          executed it, replaying the click event – but{' '}
          <a href="https://github.com/reactwg/react-18/discussions/83">
            that’s not possible due to browser limitations
          </a>
          . So instead, React switches back to urgent rendering.
        </p>
      </Slide>

      <Slide
        slideId="slide-27-14-1"
        image={
          <SlideGatsbyImage
            imageData={getSlideSafe(allSlides, 'slide27-14-1')}
          />
        }
      >
        <p>
          With urgent rendering, React will hydrate the remaining part of the{' '}
          <code>{'<Suspense>'}</code> boundary in a single pass – and{' '}
          <em>then</em> will call the right event handler.
        </p>
        <p>
          Between the user’s click and the event handler’s call, the app will
          stay frozen. This is why wrapping the whole site with a single{' '}
          <code>{`<Suspense>`}</code> won’t improve INP. The moment the user
          clicks something inside <code>{'<Suspense>'}</code>, that{' '}
          <code>{'<Suspense>'}</code> boundary will switch to blocking
          rendering, just like in React 17.
        </p>

        <SmallParagraph>
          <strong>Note: more details on event replaying.</strong> Early in the
          React 18 development cycle, the React team tried to introduce{' '}
          <a href="https://github.com/reactwg/react-18/discussions/37#discussioncomment-833682">
            event replaying
          </a>
          . If a user clicked something inside a Suspense boundary while it was
          being hydrated, React would remember the event. Then, once the
          hydration was over, it would re-dispatch the event, letting the right
          component handle it. However, that didn’t quite work out – as it
          turned out,{' '}
          <a href="https://github.com/reactwg/react-18/discussions/83">
            some events can’t be replayed well
          </a>
          .
        </SmallParagraph>
        <SmallParagraph>
          <strong>
            Note: only a single <code>{'<Suspense>'}</code>.
          </strong>{' '}
          To be clear, React switches to urgent rendering only within a single{' '}
          <code>{'<Suspense>'}</code> boundary. This means it should be okay to
          have multiple parts of the site wrapped with{' '}
          <code>{'<Suspense>'}</code>. If a user clicks something inside one of
          them, only that part will hydrate urgently.
        </SmallParagraph>
        <SmallParagraph>
          <strong>Note: not every event triggers urgent hydration.</strong> Most
          common events – <code>click</code> or <code>keypress</code> – do, but
          events like <code>focusin</code> or <code>pointerover</code>{' '}
          <a href="https://github.com/reactwg/react-18/discussions/130">
            are still replayed
          </a>
          , like before the change.
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-27-15"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-15')} />
        }
      >
        <p>Here’s how this looks in DevTools.</p>
      </Slide>

      <Slide
        slideId="slide-27-16"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide27-16')} />
        }
      >
        <p>
          This is the second concurrent feature in React 18:{' '}
          <code>{'<Suspense>'}</code> and its effects on hydration.
        </p>
      </Slide>

      <SectionHeader id="drawbacks">Drawbacks</SectionHeader>

      <Slide
        slideId="slide-28"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide28')} />
        }
      >
        <p>
          Now, what about the drawbacks? Because, of course, there’s no free
          lunch.
        </p>
      </Slide>

      <Slide
        slideId="slide-29"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide29')} />
        }
      >
        <p>
          The first drawback is that non-urgent updates take longer. This is
          because React has to yield the control back to the browser all the
          time, which introduces some delays.
        </p>
      </Slide>

      <LiveDemo
        slideId="live-demo-5"
        title="Non-urgent updates take longer"
        videoSource={'https://www.youtube.com/embed/-M87trOp0cU'}
        videoWidth={1920}
        videoHeight={832}
      />

      <Slide
        slideId="slide-30"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide30')} />
        }
      >
        <p>
          Now, this would hopefully, maybe be solved with a different{' '}
          <code>shouldYieldToHost()</code> implementation, which is currently
          implemented behind a flag.
        </p>
        <p>
          In React 18, <a href="#slide22">as we talked</a>,{' '}
          <code>shouldYieldToHost()</code> is basically a one-liner. React
          returns the control to the browser every 5 ms.
        </p>
      </Slide>

      <Slide
        slideId="slide-31"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide31')} />
        }
      >
        <p>
          But there’s another implementation that’s currently behind a flag.
        </p>
        <p>
          This implementation is more sophisticated. Specifically, instead of
          yielding to the browser every 5 ms, it checks whether the user tried
          interacting with the app – and yields back to the browser only if the
          user did. (Or if the render is taking longer than 300 ms.)
        </p>
        <p>
          The behind-the-flag implementation relies on one of my favorite
          lesser-known browser APIs:{' '}
          <a href="https://web.dev/isinputpending/">
            <code>navigator.scheduling.isInputPending()</code>
          </a>
          . <code>isInputPending()</code> is a function that returns{' '}
          <code>true</code> if the user tried to interact with the page (e.g.,
          click or type something) since you started running the current piece
          of JavaScript. This is useful to finish executing this piece of
          JavaScript early, just like React does!
        </p>
        <p>
          However, unfortunately, I’m not putting high hopes on the alternative
          implementation.{' '}
          <a href="https://twitter.com/acdlite/status/1585829304256053255">
            Per Andrew Clark (React team)
          </a>
          , the performance tests for this experiment were inconclusive, so it’s
          unclear whether it would ship or help at all.
        </p>
        <SmallParagraph>
          Actual code:{' '}
          <a href="https://github.com/facebook/react/blob/f0efa1164b7ca8523b081223954d05c88e92053b/packages/scheduler/src/forks/Scheduler.js#L452-L483">
            <code>scheduler/src/forks/Scheduler.js#L452-L483</code>
          </a>
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-33"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide33')} />
        }
      >
        <p>
          The second drawback of React 18’s concurrent rendering is: it’s
          complex, and this extra complexity doesn’t come for free.
        </p>
        <p>
          To make concurrent rendering possible, React had to make its
          architecture more complex. This extra complexity takes a toll on the
          CPU. In fact, this is one of the reasons Vue.js and Preact straight
          refused to implement anything similar to concurrent rendering.
        </p>
      </Slide>

      <Slide
        slideId="slide-34"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide34')} />
        }
      >
        <p>
          Both Vue.js and Preact believe that it’s unlikely any real-world apps
          will benefit from concurrency features:
        </p>
        <ul>
          <li>
            <em>Marvin Hagemeister (Preact):</em> “It’s still up in the air
            whether CM [Concurrent Mode] is something that benefits apps at all,
            even for React.” (
            <a href="https://github.com/preactjs/preact/issues/2621#issuecomment-717764708">
              2020
            </a>
            )
          </li>
          <li>
            <em>Evan You (Vue.js):</em> “The demo React team showcased is so
            contrived that it will most likely never happen in an actual app.” (
            <a href="https://github.com/vuejs/rfcs/issues/89#issuecomment-547010732">
              2019
            </a>
            )
          </li>
        </ul>
        <p>
          Similarly, Solid shipped concurrent rendering but didn’t enable it by
          default. <em>Ryan Carniato (Solid)</em> mentioned:
        </p>
        <ul>
          <li>
            “I’ve never come across this [using Concurrent Rendering to break up
            CPU work] naturally in Solid. Only in benchmarks that simulate
            slowdown.” (
            <a href="https://github.com/solidjs/solid/issues/1122#issuecomment-1187797891">
              2022
            </a>
            )
          </li>
          <li>
            “I see the value of concurrent rendering from an IO perspective. I
            just haven’t seen it from a CPU perspective. React conflates the two
            which is why frameworks like Vue and Preact didn’t implement the
            feature. I did in Solid.” (
            <a href="https://twitter.com/RyanCarniato/status/1567067073075097602">
              2022
            </a>
            )
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide-35"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide35')} />
        }
      >
        <p>
          The React team, however, seems to play a long game – and is explicit
          about it. Mainly on Twitter, though, because that’s where all the real
          documentation lives nowadays:
        </p>
        <ul>
          <li>
            <em>Dan Abramov (React):</em> “Is Concurrent Mode just a workaround
            for ‘virtual DOM diffing’ overhead? Some people got that impression.
            Let me clarify why we’re working on it.” (
            <a href="https://twitter.com/dan_abramov/status/1120971795425832961">
              2019 thread
            </a>
            )
          </li>
          <li>
            <em>Dan Abramov (React):</em> “Concurrent Mode lets React do work
            ‘on the side’. This unlocks many abilities that weren’t possible!
            Time slicing is just a nice bonus.” (
            <a href="https://twitter.com/dan_abramov/status/1200116586989916162">
              2019 thread
            </a>
            )
          </li>
        </ul>
      </Slide>

      <Slide
        slideId="slide-36"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide36')} />
        }
      >
        <p>
          For example, one of the things the Concurrent Features will unlock is
          the upcoming Offscreen API.
        </p>
        <p>
          The Offscreen API will allow pre-rendering stuff like inactive routes
          or tabs in the background. Every part of the app you’ll wrap with{' '}
          <code>{'<Offscreen mode="hidden">'}</code> (note: not a final API)
          will render{' '}
          <a href="https://github.com/reactwg/react-18/discussions/19#discussioncomment-2054612">
            into an invisible DOM node
          </a>{' '}
          (note: not a final implementation).
        </p>
        <p>
          Then, when the user clicks a button, you’ll switch{' '}
          <code>{'<Offscreen mode="hidden">'}</code> to{' '}
          <code>{'<Offscreen mode="visible">'}</code>, and the page will update
          instantly. The update will be instant because the UI would already be
          rendered, so the only thing React would need to do is to show the
          hidden node and run <code>useEffect</code>s/
          <code>useLayoutEffect</code>s.
        </p>
        <p>
          The Offscreen API is only possible thanks to Concurrent Rendering.
          Without it, React wouldn’t be able to render the inactive parts of the
          app without blocking the UI.
        </p>
        <SmallParagraph>
          Note: The Offscreen API is still in development. It’s very likely to
          be renamed. It might also change or even never ship at all. It’s not
          documented, but it’s been announced{' '}
          <a href="https://reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html#offscreen">
            in development updates
          </a>{' '}
          and discussed{' '}
          <a href="https://github.com/reactwg/react-18/discussions/19">
            on GitHub
          </a>
          .
        </SmallParagraph>
      </Slide>

      <Slide
        slideId="slide-38"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide38')} />
        }
      >
        <p>
          Finally, the third drawback (or, rather, pitfall) is that React
          Concurrency doesn’t help with expensive components.
        </p>
      </Slide>

      <Slide
        slideId="slide-39"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide39')} />
        }
      >
        <p>
          Let’s look at React’s rendering loop again. The{' '}
          <code>performUnitOfWork()</code> function renders one component from
          the queue, and the <code>shouldYieldToHost()</code> function tells
          React when it should give control to the browser.
        </p>
        <p>
          The pitfall is: <code>shouldYieldToHost()</code> is only called when{' '}
          <code>performUnitOfWork()</code> completes. And{' '}
          <code>performUnitOfWork()</code> doesn’t complete until the component
          is rendered. (It physically can’t: “rendering” a component means
          calling the component’s function; once you call a function, you can’t
          interrupt its execution.)
        </p>
      </Slide>

      <Slide
        slideId="slide-40"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide40')} />
        }
      >
        <p>So, if any single component takes, for example, not 5,</p>
      </Slide>

      <Slide
        slideId="slide-41"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide41')} />
        }
      >
        <p>
          but 500 ms to render, the main thread will be blocked for the full 500
          ms – even if this render is marked as non-urgent.
        </p>
        <p>
          This is the third drawback (or, rather, pitfall) of React concurrency.
        </p>
      </Slide>

      <SectionHeader id="summary">Summary</SectionHeader>

      <Slide
        slideId="slide-42"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide42')} />
        }
      >
        <p>To summarize, React Concurrency is</p>
        <ul>
          <li>slower (for non-urgent updates),</li>
          <li>more CPU-expensive (for all updates),</li>
          <li>and doesn’t help with expensive components.</li>
        </ul>
        <p>
          But if you’re willing to deal with these drawbacks and pitfalls,
          you’ll get this <em>almost magical</em> behavior of rendering
          something huge – and not slowing the page at all.
        </p>
      </Slide>

      <Slide
        slideId="slide-43"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'slide43')} />
        }
      >
        <p>Is this a meme? Maybe this is a meme.</p>
      </Slide>

      <Slide
        slideId="slide-credits"
        image={
          <SlideGatsbyImage imageData={getSlideSafe(allSlides, 'credits')} />
        }
      >
        <p>Thank you!</p>
        <p>
          (Follow Ivan on Twitter:{' '}
          <a href="https://twitter.com/iamakulov">@iamakulov</a>)
        </p>
        <SmallParagraph>
          Thanks to <a href="https://github.com/vadikmash">Vadim Mashnitsky</a>,{' '}
          <a href="https://twitter.com/kurtextrem">Jabob Groß</a>, and{' '}
          <a href="https://twitter.com/juan_ferreras_">Juan Ferreras</a> for
          helping with or revieving this talk.
        </SmallParagraph>
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
            relativeDirectory: { eq: "talks/react-concurrency/slides" }
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
                )
              }
            }
          }
        }
        allSlides: allFile(
          filter: {
            relativeDirectory: { eq: "talks/react-concurrency/slides" }
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
