import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../components/Layout';
import { LogoKind } from '../../../components/Logo';
import WidthWrapper from '../../../components/WidthWrapper';
import { SlideGatsbyImage } from '../../../components/talks/Slide';
import TalkHeader from '../../../components/talks/TalkHeader';
import TalkMeta from '../../../components/talks/TalkMeta';
import {
  BlockImage,
  Blockquote,
  Contents,
  ContentsInner,
  Footer,
  Footnote,
  Nav,
  SectionHeader,
  Slide,
  Slides,
  Video,
} from '../styled';
import socialCoverUrl from './cover.png';
import nonProgressiveGif from './progressive-gifs/non-progressive.gif';
import progressiveGif from './progressive-gifs/progressive.gif';
import fontsLoadingUrl from './slides/fonts-loading.mp4';
import httpCdnUrl from './slides/http-cdn.svg';
import jsScriptsBlockParsing1Url from './slides/js-scripts-block-parsing-1.svg';
import perfImportanceDigitsUrl from './slides/perf-importance-digits.svg';
import toolsWebpackBundleAnalyzer from './slides/tools-webpack-bundle-analyzer.mp4';

interface FileUrl {
  publicURL: string;
}

interface WebPerf101PageProps {
  data: {
    indexSlide: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    iamakulovPhoto: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    panda100: FileUrl;
    panda70: FileUrl;
    panda50: FileUrl;
    panda100Large: FileUrl;
    panda70Large: FileUrl;
    panda50Large: FileUrl;
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
  };
}

const fullSocialCoverUrl = `https://3perf.com${socialCoverUrl}`;

const publishedDate = new Date(2018, 9, 25);
const lastUpdatedDate = new Date(2021, 6, 21);

const WebPerf101Page = ({ data }: WebPerf101PageProps) => {
  const allSlidesByName = Object.fromEntries(
    data.allSlides.edges.map((edge) => {
      return [edge.node.name, edge.node.childImageSharp.gatsbyImageData];
    }),
  );

  const sectionHeadersByName = Object.fromEntries(
    data.sectionHeaders.edges.map((edge) => {
      return [edge.node.name, edge.node.childImageSharp.gatsbyImageData];
    }),
  );

  return (
    <Layout>
      <WidthWrapper>
        <Helmet>
          <title>
            Web Performance 101: JS, CSS, HTTP, images &amp; fonts |
            PerfPerfPerf
          </title>
          {/* Hooray! Meta tags! */}
          <meta
            name="description"
            content="Learn how (and why) to make your app faster by optimizing JS, CSS, images/fonts and other things"
          />
          <meta name="image" content={fullSocialCoverUrl} />
          <meta
            itemProp="name"
            content="Web Performance 101: JS, CSS, HTTP, images & fonts"
          />
          <meta
            itemProp="description"
            content="Learn how (and why) to make your app faster by optimizing JS, CSS, images/fonts and other things"
          />
          <meta itemProp="image" content={fullSocialCoverUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Web Performance 101: JS, CSS, HTTP, images & fonts"
          />
          <meta
            name="twitter:description"
            content="Learn how (and why) to make your app faster by optimizing JS, CSS, images/fonts and other things"
          />
          <meta name="twitter:site" content="@3perfcom" />
          <meta name="twitter:creator" content="@iamakulov" />
          <meta name="twitter:image:src" content={fullSocialCoverUrl} />
          <meta
            name="og:title"
            content="Web Performance 101: JS, CSS, HTTP, images & fonts"
          />
          <meta
            name="og:description"
            content="Learn how (and why) to make your app faster by optimizing JS, CSS, images/fonts and other things"
          />
          <meta
            property="og:url"
            content="https://3perf.com/talks/web-perf-101/"
          />
          <meta property="og:image" content={fullSocialCoverUrl} />
          <meta property="og:site_name" content="PerfPerfPerf" />
          <meta property="fb:admins" content="100002052594007" />
          <meta property="og:type" content="article" />
          <meta property="article:author" content="Ivan Akulov" />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              headline: 'Web Performance 101: JS, CSS, HTTP, images & fonts',
              description:
                'Learn how (and why) to make your app faster by optimizing JS, CSS, images/fonts and other things',
              image: fullSocialCoverUrl,
              author: {
                '@type': 'Person',
                name: 'Ivan Akulov',
                url: 'https://twitter.com/iamakulov',
              },
              publisher: {
                '@type': 'Organization',
                name: 'PerfPerfPerf',
                url: 'https://3perf.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://3perf.com/3perf-logo-black-raster.png',
                  width: 1500,
                  height: 1500,
                },
              },
              datePublished: publishedDate.toISOString(),
              dateModified: lastUpdatedDate.toISOString(),
              mainEntityOfPage: {
                '@type': 'WebPage',
                url: 'https://3perf.com/talks/web-perf-101/',
              },
            })}
          </script>
          <meta property="foo" content="test" />
        </Helmet>
        <Nav logoKind={LogoKind.Black} />
        <TalkHeader
          imageData={data.indexSlide.childImageSharp.gatsbyImageData}
          title="Web Performance 101"
          description={
            <>
              <p>
                This is an introduction to the modern web loading performance.
                Learn why performance is important, what performance
                optimizations exist and what tools help to understand if your
                app is doing well.
              </p>
              <p>
                <strong>Want to apply this advice to your site?</strong> We’ve
                worked with Google, Framer, SitePoint, and other companies.{' '}
                <a href="/#services">Reach out</a>
              </p>
            </>
          }
        />
        <Slides>
          <Slide
            slideId="contents"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['contents']}
              />
            }
          >
            <p>This is what we’ll talk about.</p>
            <Contents>
              Jump to:
              <ContentsInner>
                <ol>
                  <li>
                    <a href="#perf-importance-header">
                      Why performance is important
                    </a>
                  </li>
                  <li>
                    <a href="#javascript-header">JavaScript</a>
                    <ol>
                      <li>
                        <a href="#javascript-minification-source">
                          Minify code
                        </a>
                      </li>
                      <li>
                        <a href="#async-and-defer">
                          Use <code>async</code> and <code>defer</code>
                        </a>
                      </li>
                      <li>
                        <a href="#code-splitting">Use code splitting</a>
                      </li>
                      <li>
                        <a href="#webpack-libs-optimizations">
                          Remove unused code from dependencies
                        </a>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <a href="#css-header">CSS</a>
                    <ol>
                      <li>
                        <a href="#css-minify-1">Minify code</a>
                      </li>
                      <li>
                        <a href="#critical-css">
                          Use the Critical CSS approach
                        </a>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <a href="#http-header">HTTP</a>
                    <ol>
                      <li>
                        <a href="#http-minify">Minify HTML</a>
                      </li>
                      <li>
                        <a href="#gzip">Compress content with Gzip</a>
                      </li>
                      <li>
                        <a href="#brotli">Compress content with Brotli</a>
                      </li>
                      <li>
                        <a href="#cdn">Use a CDN</a>
                      </li>
                      <li>
                        <a href="#preload">Preload content</a>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <a href="#images-header">Images</a>
                    <ol>
                      <li>
                        <a href="#images-format">Choose a proper format</a>
                      </li>
                      <li>
                        <a href="#image-compression">Compress images</a>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <a href="#fonts-header">Fonts</a>
                    <ol>
                      <li>
                        <a href="#fallback-fonts">Specify a fallback font</a>
                      </li>
                      <li>
                        <a href="#font-display">
                          Use <code>font-display</code>
                        </a>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <a href="#tools-header">Tools</a>
                  </li>
                </ol>
              </ContentsInner>
            </Contents>
          </Slide>
          <Slide
            slideId="perf-importance-header"
            isSectionHeader={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={sectionHeadersByName['perf-importance-header']}
              />
            }
          >
            <p>So: why is web performance important?</p>
          </Slide>
          <Slide
            slideId="perf-importance-horror"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide demonstrating the level of stress caused by mobile delays"
                imageData={allSlidesByName['perf-importance-horror']}
              />
            }
          >
            <p>
              Firstly: because a slow site is <em>very</em> uncomfortable.
            </p>
            <p>
              The brightest example of this is that when a mobile site loads
              slowly, the user experiences the same stress as if they were
              watching a horror movie.
            </p>
            <p>
              <small>
                Image source:{' '}
                <a href="https://twitter.com/lukew/status/846440789752242176?lang=en">
                  Luke Wroblewski
                </a>
              </small>
            </p>
          </Slide>
          <Slide
            slideId="perf-importance-digits"
            useImageBorder={true}
            image={<BlockImage src={perfImportanceDigitsUrl} />}
          >
            <p>Secondly: because it directly affects your product.</p>
            <p>
              — In 2016, AliExpress made their site faster by a third and{' '}
              <a href="https://edge.akamai.com/ec/us/highlights/keynote-speakers.jsp#edge2016futureofcommercemodal">
                received 10.5% more orders
              </a>
              <br />— Back in 2006, Google tried making the search slower by
              half-a-second and discovered{' '}
              <a href="http://glinden.blogspot.com/2006/11/marissa-mayer-at-web-20.html">
                that users were making 25% fewer requests
              </a>
              <br />— In 2008, Aberdeen Group discovered that slowing a site
              down by one second{' '}
              <a href="https://headspin.io/resources/marketing/reports/5136-RR-performance-web-application.pdf">
                decreases the user satisfaction by 16%
              </a>
            </p>
            <p>
              and there’re lots of such data – from both old and recent studies
              (<a href="https://wpostats.com">wpostats.com</a> ·{' '}
              <a href="https://pwastats.com">pwastats.com</a>).
            </p>
            <p>This is why web performance is important.</p>
          </Slide>
          <Slide
            slideId="perf-importance-part-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['perf-importance-parts-1']}
              />
            }
          >
            <p>
              Now, to understand what exactly we’ll talk about, we need to
              understand a fast site consists of.
            </p>
            <p>
              When is a site fast? It’s fast when:
              <br />
              — it loads quickly,
              <br />— and, being loaded, it works quickly (meaning animations
              don’t skip frames, scrolling is smooth, and so on)
            </p>
          </Slide>
          <Slide
            slideId="perf-importance-part-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['perf-importance-parts-2']}
              />
            }
          >
            <p>
              And the site loads quickly when:
              <br />
              — the server responds to requests in a short time,
              <br />— and the app itself loads and renders quickly.
            </p>
          </Slide>
          <Slide
            slideId="perf-importance-part-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['perf-importance-parts-3']}
              />
            }
          >
            <p>
              In this talk, we’ll be discussing this element: how to make a site
              load and render quickly.
            </p>
            <p>
              The first element is not relevant – most often, performance
              problems lie in the second or the third one. The third element
              didn’t fit into the talk – probably we’ll make another one :) (
              <a href="/subscribe/">Subscribe</a> to get notified if/when it’s
              out.)
            </p>
          </Slide>
          <Slide
            slideId="javascript-header"
            useImageBorder={true}
            isSectionHeader={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={sectionHeadersByName['javascript-header']}
              />
            }
          >
            <p>
              And, let’s start with JavaScript. Because often, JavaScript is{' '}
              <em>the</em> slow resource.
            </p>
          </Slide>
          <Slide
            slideId="javascript-minification-source"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with an example of unminified JS code. The code reads: function logArrayItems(element, index) { console.log('a[' + index + '] = ' + element); } [2, 5, 9].forEach(logArrayItems);"
                imageData={allSlidesByName['javascript-minification-source']}
              />
            }
          >
            <p>
              The first way to optimize JavaScript is minification. If you
              already know about it,{' '}
              <a href="#js-download-1">skip to the next section</a>.
            </p>
            <p>
              What is minification? When people write JS, they (usually) format
              it in a convenient way. They add indentation, use long meaningful
              names for variables, write comments, and so on. Thanks to this,
              the code is easier to read, but all the extra spacing and comments
              make it <em>significantly</em> larger.
            </p>
          </Slide>
          <Slide
            slideId="javascript-minification-result"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with an example of minified JS code. The code reads: function f(q,w){console.log('a['+w+'] = '+q)}[2, 5, 9].forEach(f);"
                imageData={allSlidesByName['javascript-minification-result']}
              />
            }
          >
            <p>
              To fight this, people came up with minification. During
              minification, the code loses all unnecessary characters, receives
              shorter variable names, and so on. In the end, it becomes smaller
              but keeps working as intended.
            </p>
            <p>
              Minification makes the code take{' '}
              <a href="https://www.gribble.org/techreports/minification/">
                around 30–40% less size
              </a>
              .
            </p>
          </Slide>
          <Slide
            slideId="javascript-minification-tools"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['javascript-minification-tools']}
              />
            }
          >
            <p>
              Minification is supported by every major app builder:
              <br />—{' '}
              <a href="https://webpack.js.org/concepts/mode/">
                <code>mode: production</code>
              </a>{' '}
              in webpack,
              <br />—{' '}
              <a href="https://www.npmjs.com/package/babel-preset-minify">
                <code>babel-preset-minify</code>
              </a>{' '}
              in Babel,
              <br />—{' '}
              <a href="https://www.npmjs.com/package/gulp-uglify">
                <code>gulp-uglify</code>
              </a>{' '}
              in Gulp
            </p>
          </Slide>
          <SectionHeader id="async-and-defer">Async and defer</SectionHeader>
          <Slide
            slideId="js-download-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-download-1']}
              />
            }
          >
            <p>
              Next. So, you wrote a script, minified it, and now want to load it
              on a page. How to connect it to the page?
            </p>
          </Slide>
          <Slide
            slideId="js-download-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-download-2']}
              />
            }
          >
            <p>
              The simplest option is just to write the{' '}
              <code>&lt;script&gt;</code> tag and specify the path to your file.
              It’s fine, and it would work.
            </p>
            <p>But – do you know what’s the problem with this approach?</p>
          </Slide>
          <Slide
            slideId="js-scripts-block-parsing-1"
            useImageBorder={true}
            image={<BlockImage src={jsScriptsBlockParsing1Url} />}
          >
            <p>
              The problem is that
              <br />
              scripts
              <br />
              block
              <br />
              parsing.
            </p>
          </Slide>
          <Slide
            slideId="js-scripts-block-parsing-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="HTML code and the corresponding DOM tree, side-by-side"
                imageData={allSlidesByName['js-scripts-block-parsing-2']}
              />
            }
          >
            <p>What does this mean?</p>
            <p>
              When your browser loads the page, it starts parsing the HTML
              document into tags and building a DOM tree. Later, it uses this
              DOM tree to render the page.
            </p>
            <p>
              The problem is, a script can alter the way the DOM tree is built.
            </p>
          </Slide>
          <Slide
            slideId="js-scripts-block-parsing-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="The DOM tree that’s been changed because a script with document.write() was executed"
                imageData={allSlidesByName['js-scripts-block-parsing-3']}
              />
            }
          >
            <p>
              For example, a script can call <code>document.write()</code> and
              write an opening comment tag into the document. This will ruin the
              whole DOM tree (and the whole page!) that comes after the script.
            </p>
            <p>
              That’s why browsers stop parsing when they encounter a script – to
              prevent the document from jumping and avoid doing extra work.
            </p>
          </Slide>
          <Slide
            slideId="js-scripts-block-parsing-4"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-scripts-block-parsing-4']}
              />
            }
          >
            <p>
              From the browser’s standpoint, it looks like this:
              <br />
              — The browser goes over the document and parses it
              <br />— At some moment, the browser encounters the{' '}
              <code>&lt;script&gt;</code> tag. It pauses parsing HTML and starts
              downloading and executing the script
              <br />— Once the script is executed, the browser continues with
              parsing
            </p>
          </Slide>
          <Slide
            slideId="js-scripts-block-parsing-5"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Image of an empty page that’s still loading"
                imageData={allSlidesByName['js-scripts-block-parsing-5']}
              />
            }
          >
            <p>
              In practice, this means that when you add a script, no content
              after it will be visible until the script downloads and executes.
              And if you add a script into <code>&lt;head&gt;</code>, nothing
              will be visible at all – until the script execution is complete.
            </p>
            <p>
              <small>
                Note: modern browsers, in fact, usually try to parse the DOM
                tree further even if they encounter a{' '}
                <code>&lt;script&gt;</code> tag. This helps to save time in case
                the script doesn’t modify anything, and the DOM tree doesn’t
                change. Browsers still don’t show any content after the script
                though.{' '}
                <a href="https://hacks.mozilla.org/2017/09/building-the-dom-faster-speculative-parsing-async-defer-and-preload/">
                  More on this
                </a>{' '}
                ·{' '}
                <a href="https://3perf-server-delay-demo-kqemjsiqkk.now.sh/">
                  Demo
                </a>
              </small>
            </p>
          </Slide>
          <Slide
            slideId="js-async-defer-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-async-defer-1']}
              />
            }
          >
            <p>
              So, what to do? Use <code>async</code> and <code>defer</code>{' '}
              script attributes.
            </p>
            <p>
              These attributes let the browser know that scripts can be
              downloaded in the background, without interrupting the document
              parsing. Here’s how they work:
            </p>
            <p>
              — <code>async</code> asks the browser to load scripts
              asynchronously (in the background) and to continue parsing the
              document while scripts are downloading. (If a script loads before
              the parsing ends, parsing will pause; but because loading usually
              takes more time than parsing, this rarely happens.)
            </p>
            <p>
              — <code>defer</code> tells the browser to download the script
              asynchronously and execute it only after the document is parsed.
            </p>
          </Slide>
          <Slide
            slideId="js-async-defer-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-async-defer-2']}
              />
            }
          >
            <p>There’s an important difference:</p>
            <p>
              — <code>async</code> scripts would execute as soon as they
              download, without keeping the order. This means that if you have
              an async React bundle and an async app bundle, and the React
              bundle is larger, the app would download and execute earlier than
              React – and the site will break.
            </p>
            <p>
              — <code>defer</code> scripts, unlike <code>async</code>, would
              execute in the right order only after all scripts are downloaded.
              Because of this, <code>defer</code> might be safer than{' '}
              <code>async</code> when optimizing a large complex app.
            </p>
          </Slide>
          <Slide
            slideId="js-async-defer-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-async-defer-3']}
              />
            }
          >
            <p>
              And, as a result, from my experience, these optimizations can
              strip 200–500 ms (or even more!) off the loading time, depending
              on your code size and connection. Half a second is actually a lot.
            </p>
          </Slide>
          <SectionHeader id="code-splitting">Code splitting</SectionHeader>
          <Slide
            slideId="js-code-splitting-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-code-splitting-1']}
              />
            }
          >
            <p>Moving forward.</p>
            <p>
              Oftentimes, applications are built like this: you compile an
              application and end up with a big bundle that you send to the
              client with each request. The problem is that apps often have
              screens that users would see on very rare occasions –
            </p>
          </Slide>
          <Slide
            slideId="js-code-splitting-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-code-splitting-2']}
              />
            }
          >
            <p>
              e.g., modal windows that open once a month or routes that nobody
              ever uses. Even though the code from these routes or popups is
              almost useless, it still takes up space in the bundle and
              increases loading time.
            </p>
          </Slide>
          <Slide
            slideId="js-code-splitting-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-code-splitting-3']}
              />
            }
          >
            <p>
              This is usually solved by code splitting – dividing big bundles
              into smaller ones.
            </p>
            <p>
              With code splitting, we put different parts of app functionality
              to different files and fetch them only when necessary. Thanks to
              this, if a user doesn’t need to open the “Change avatar” modal,
              they won’t download it at all.
            </p>
          </Slide>
          <Slide
            slideId="js-code-splitting-4"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with a code example for browsers. The code reads: import('https://unpkg.com/lodash').then(_ => { /* Code that uses Lodash */ _.keys(...) })"
                imageData={allSlidesByName['js-code-splitting-3-2']}
              />
            }
          >
            <p>How to implement code splitting?</p>
            <p>
              First, you’ll need a bundler like webpack, Parcel, or Rollup.
              (I’ll mostly cover webpack hereafter as it’s the most popular
              one.) All these bundlers support a special function called{' '}
              <a href="https://webpack.js.org/guides/code-splitting/#dynamic-imports">
                <code>import()</code>
              </a>
              .
            </p>
            <p>
              In browsers, <code>import()</code> takes a JS file passed into it
              and downloads that file asynchronously. It’s useful when you don’t
              need a library when the app starts, but use it at some point
              later.
            </p>
          </Slide>
          <Slide
            slideId="js-code-splitting-5"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with a code example for webpack. The code reads: import('./ChangeAvatarModal.js').then(module => { this.setState({ ChangeAvatarModal: module.default }); });"
                imageData={allSlidesByName['js-code-splitting-4']}
              />
            }
          >
            <p>
              Bundlers, however, treat <code>import()</code> function
              differently. If you pass a file name into the{' '}
              <code>import()</code> function and then bundle this code with
              webpack, Parcel, or Rollup, the bundler will take that file,
              bundle it and all its dependencies and put the result into a
              separate compiled file. And then the app will only download that
              file when this <code>import()</code> is called.
            </p>
            <p>
              So, in the example on this slide, webpack will bundle{' '}
              <code>ChangeAvatarModal.js</code> (and its dependencies) into a
              separate file. And, during the execution, it will download this
              file only when this <code>import()</code> function is called.
            </p>
            <p>This is the actual code splitting.</p>
          </Slide>
          <Slide
            slideId="js-code-splitting-6"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with a code example for react-loadable. The code reads: const LoadableComponent = Loadable({ loader: () => import('./modal.js'), }); class App extends React.Component { render() { return <LoadableComponent />; } }"
                imageData={allSlidesByName['js-code-splitting-5']}
              />
            }
          >
            <p>
              Second, in React and Vue.js, there’re helper tools that work with{' '}
              <code>import()</code> and make your job even easier.
            </p>
            <p>
              For example, the{' '}
              <a href="https://github.com/jamiebuilds/react-loadable">
                <code>react-loadable</code>
              </a>{' '}
              library is a component that helps to wait until another component
              is loaded – and renders a placeholder while it’s loading. React
              16.6 added a similar built-in feature called{' '}
              <a href="https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense">
                <code>Suspense</code>
              </a>
              . And Vue.js has had support for{' '}
              <a href="https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components">
                async components
              </a>{' '}
              for a while.
            </p>
          </Slide>
          <Slide
            slideId="js-code-splitting-7"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-code-splitting-6']}
              />
            }
          >
            <p>
              Well, and savings from code splitting? <em>Huge.</em>
            </p>
            <p>
              If done properly, code splitting is the most significant
              optimization in terms of data saving. So:
            </p>
            <Blockquote>
              If you only do a single optimization in your app, make it code
              splitting.
            </Blockquote>
            <p>
              Refer to guides to learn more:
              <br />— WebFundamentals article{' '}
              <a href="https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/">
                about code splitting
              </a>
              <br />— React docs{' '}
              <a href="https://reactjs.org/docs/code-splitting.html">
                covering code splitting basics
              </a>
              <br />— webpack guide{' '}
              <a href="https://webpack.js.org/guides/code-splitting/">
                into splitting code
              </a>
            </p>
          </Slide>
          <SectionHeader id="webpack-libs-optimizations">
            webpack-libs-optimizations repo
          </SectionHeader>
          <Slide
            slideId="js-unused-dependencies-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-unused-dependencies-1']}
              />
            }
          >
            <p>
              What else? Another great space for optimization is app
              dependencies.
            </p>
            <p>
              — For example, Moment.js, a library for working with dates,
              includes about 160 kBs of localization files for different
              languages.
              <br />— React components keep <code>propTypes</code> even in the
              production bundle, despite the fact they aren’t necessary there.
              <br />— With Lodash, it’s too easy to import and serve the whole
              library even if you only need a few methods from it.
            </p>
            <p>
              All these things are the useless code that app dependencies bring
              into the bundle.
            </p>
          </Slide>
          <Slide
            slideId="js-unused-dependencies-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-unused-dependencies-2']}
              />
            }
          >
            <p>
              To make developers more aware of this extra code and help them
              remove it, we (together with Google) made a repository that
              collects tips how to optimize various dependencies with webpack.
              Use these tips to make your apps faster and smaller in size!
            </p>
            <p>
              →{' '}
              <a href="https://github.com/GoogleChromeLabs/webpack-libs-optimizations">
                GoogleChromeLabs/webpack-libs-optimizations
              </a>
            </p>
          </Slide>
          <SectionHeader id="js-summing-up">All together</SectionHeader>
          <Slide
            slideId="js-summing-up-slide"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['js-summing-up']}
              />
            }
          >
            <p>
              That’s all about JS for now. Summing up:
              <br />—{' '}
              <a href="#javascript-minification-source">Minify the JS code</a>
              <br />— Use <code>async</code> and <code>defer</code>{' '}
              <a href="#js-download-1">for your scripts</a>
              <br />— Split your code{' '}
              <a href="#js-code-splitting-1">
                to load as few of it as possible
              </a>
              <br />— And remove unused code{' '}
              <a href="#js-unused-dependencies-1">from your dependencies</a>
            </p>
          </Slide>
          <Slide
            slideId="css-header"
            useImageBorder={true}
            isSectionHeader={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={sectionHeadersByName['css-header']}
              />
            }
          >
            <p>Next. Here’s how to optimize your CSS code.</p>
          </Slide>
          <Slide
            slideId="css-minify-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with an example of minified CSS code. The distinct feature of the code is there are no spaces or newlines in that code."
                imageData={allSlidesByName['css-minify-2']}
              />
            }
          >
            <p>
              First: minify CSS, just like your JS code. Delete unnecessary
              spaces and characters to make the code smaller.
            </p>
          </Slide>
          <Slide
            slideId="css-minify-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-minify-3']}
              />
            }
          >
            <p>
              These are tools that would help you with this:
              <br />— webpack’s{' '}
              <a href="https://github.com/postcss/postcss-loader">
                <code>postcss-loader</code>
              </a>{' '}
              with{' '}
              <a href="https://github.com/cssnano/cssnano">
                <code>cssnano</code>
              </a>
              <br />— PostCSS’s{' '}
              <a href="https://github.com/cssnano/cssnano">
                <code>cssnano</code>
              </a>
              <br />— Gulp’s{' '}
              <a href="https://www.npmjs.com/package/gulp-clean-css">
                <code>gulp-clean-css</code>
              </a>
            </p>
          </Slide>
          <SectionHeader id="critical-css">Critical CSS</SectionHeader>
          <Slide
            slideId="css-block-rendering-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-block-rendering-1']}
              />
            }
          >
            <p>
              Second – oh, you’ve already seen{' '}
              <a href="#js-scripts-block-parsing-1">a similar problem</a> –
              styles block rendering.
            </p>
          </Slide>
          <Slide
            slideId="css-block-rendering-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Screenshot of a Wikipedia page without styles"
                imageData={allSlidesByName['css-block-rendering-2']}
              />
            }
          >
            <p>That’s because sites without styles look weird.</p>
            <p>
              If a browser rendered pages before styles were loaded, the user
              would first see this...
            </p>
          </Slide>
          <Slide
            slideId="css-block-rendering-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Screenshot of a Wikipedia page with styles"
                imageData={allSlidesByName['css-block-rendering-3']}
              />
            }
          >
            <p>
              ...and then the page would blink, and they would see this. Hardly
              a pleasant user experience.
            </p>
          </Slide>
          <Slide
            slideId="css-block-rendering-4"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-block-rendering-4']}
              />
            }
          >
            <p>
              That’s why the page remains white while styles are still loading.
            </p>
            <p>
              Now, there’s a clever optimization trick here. It’s perfectly
              reasonable that browsers keep the page empty while styles haven’t
              loaded, and we don’t want to get rid of this. However, we can
              still make pages render faster – by loading the page with just a
              part of styles needed for initial rendering and fetching the
              remaining styles afterward. Those styles needed for initial
              rendering are called “Critical CSS”.
            </p>
            <p>Let’s see how it works.</p>
          </Slide>
          <Slide
            slideId="css-critical-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-critical-2-1']}
              />
            }
          >
            <p>
              With Critical CSS, the process of loading the page looks as
              follows:
            </p>
            <ol>
              <li>You split your styles into critical and non-critical CSS.</li>
              <li>
                You inline the critical CSS right into the HTML response. This
                helps to serve it as soon as possible.
              </li>
            </ol>
          </Slide>
          <Slide
            slideId="css-critical-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-critical-2-2']}
              />
            }
          >
            <p>
              Now, as soon as you serve HTML with the critical CSS inlined, the
              page could already be rendered. However, you still need to fetch
              and apply the non-critical CSS.
            </p>
            <p>
              There are multiple ways to load remaining CSS, and all of them are
              hacky, unfortunately. This is how I prefer to do this:
            </p>
            <ol start={3}>
              <li>
                You add a{' '}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content">
                  <code>&lt;link rel=&quot;preload&quot;&gt;</code>
                </a>{' '}
                to start fetching the non-critical CSS file.
              </li>
              <li>
                And, as soon as the file is fetched and lies in the cache, you
                change the <code>rel</code> attribute from <code>preload</code>{' '}
                to <code>stylesheet</code>. This makes the browser take the
                cached CSS file and apply it to the document.
              </li>
            </ol>
          </Slide>
          <Slide
            slideId="css-critical-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with text: Critical CSS: When it’s absent, the page looks funny. Critical style examples: styles for the page layout, styles reserving a place for non-critical elements. Non-critical style examples: styles for a popup which opens on a button click, styles for ads, styles for the image footer"
                imageData={allSlidesByName['css-critical-1']}
              />
            }
          >
            <p>
              How to understand what to include into critical CSS, and what to
              serve later? Generally, the rule is:
            </p>
            <Blockquote>
              Remove styles and hide page elements till the page starts to look
              really funny (or incorrect). The remaining CSS is critical.
            </Blockquote>
            <p>
              For example, styles for the page layout or for the text in an
              article are critical – because, without them, the page would look
              broken. And styles for a JavaScript popup or for the footer are
              not critical – because the user won’t see these elements
              immediately, and the page would look perfectly fine without their
              styles.
            </p>
          </Slide>
          <Slide
            slideId="css-critical-4"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-critical-7']}
              />
            }
          >
            <p>
              This might sound complex, but, thankfully, there’re automated
              tools that would do this for you:
            </p>
            <p>
              —{' '}
              <a href="https://github.com/styled-components/styled-components">
                <code>styled-components</code>
              </a>
              . It’s a CSS-in-JS library that extracts and returns critical
              styles during server-side rendering. It works only if you already
              write styles using <code>styled-components</code>, but if you do,
              it works really well.
              <br />—{' '}
              <a href="https://github.com/addyosmani/critical">
                <code>critical</code>
              </a>
              . It’s a utility that takes an HTML page, renders it in a headless
              browser and extracts styles for above-the-fold content. Because{' '}
              <code>critical</code> runs only over a single page, it might not
              work well for complex single-page apps.
              <br />—{' '}
              <a href="https://github.com/pocketjoso/penthouse">
                <code>penthouse</code>
              </a>
              . It’s similar to <code>critical</code> but works with URLs
              instead of HTML pages.
            </p>
          </Slide>
          <Slide
            slideId="css-critical-5"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-critical-5']}
              />
            }
          >
            <p>
              Well, and time savings? Significant. From my experience,
              extracting critical CSS would strip 200–500 ms from time to first
              paint – or even more!
            </p>
            <p>
              <small>
                To learn more about critical CSS, read{' '}
                <a href="https://www.smashingmagazine.com/2015/08/understanding-critical-css/">
                  the amazing Smashing Magazine’s guide
                </a>
                .
              </small>
            </p>
          </Slide>
          <SectionHeader id="css-summing-up">All together</SectionHeader>
          <Slide
            slideId="css-summing-up-slide"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['css-summing-up']}
              />
            }
          >
            <p>
              Those are the primary optimization strategies for CSS. Summing up:
              <br />— <a href="#css-minify-1">Minify the CSS code</a>
              <br />— Extract critical CSS{' '}
              <a href="#css-critical-1">and fetch it first</a>
            </p>
          </Slide>
          <Slide
            slideId="http-header"
            isSectionHeader={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={sectionHeadersByName['http-header']}
              />
            }
          >
            <p>Now, let’s move to HTTP and the whole networking stuff.</p>
          </Slide>
          <Slide
            slideId="http-minify"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with an example of minified HTML code. The distinct feature of the code is there are no spaces or newlines in that code."
                imageData={allSlidesByName['http-html-minify-2']}
              />
            }
          >
            <p>
              The first approach to transfer fewer data over the network is,
              again, minification. Minify HTML documents you’re sending to the
              client (along with CSS and JS, as we discussed earlier).
            </p>
          </Slide>
          <SectionHeader id="gzip">Gzip</SectionHeader>
          <Slide
            slideId="http-gzip-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-gzip-1']}
              />
            }
          >
            <p>
              The second approach to transfer less data is to compress
              everything you send to the client using Gzip.
            </p>
            <p>
              Gzip is an algorithm that compresses data you send to the client
              using a sophisticated archiving algorithm. After compression, your
              documents will look like an unreadable binary soup, but their
              volume will be reduced{' '}
              <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip">
                by 60–80%
              </a>
              . And when a browser receives the data, it will decompress it
              back.
            </p>
          </Slide>
          <Slide
            slideId="http-gzip-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-gzip-2']}
              />
            }
          >
            <p>
              Basically, using Gzip is a production standard, so if you use any
              popular server like Apache or Nginx, you’ll be able to turn it on
              with just a couple of config changes.
            </p>
            <p>
              <a href="https://httpd.apache.org/docs/2.4/mod/mod_deflate.html#recommended">
                Apache instructions
              </a>{' '}
              ·{' '}
              <a href="http://nginx.org/en/docs/http/ngx_http_gzip_module.html#example">
                Nginx instructions
              </a>
            </p>
            <p>
              <small>
                Note: enabling Gzip with these instructions will cause servers
                to compress resources on the fly. This would make response time
                slightly larger. You don’t need to care about that in most
                cases, but if you want to have a top-notch response time,{' '}
                <a href="https://github.com/webpack-contrib/compression-webpack-plugin">
                  pre-compress your resources during the build
                </a>
                .
              </small>
            </p>
          </Slide>
          <Slide
            slideId="http-gzip-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-gzip-3']}
              />
            }
          >
            <p>NB: don’t use Gzip for anything but text!</p>
            <p>
              Pictures, fonts, videos. and other binary files are usually
              compressed already, so gzipping them will only make response time
              larger. SVG images are the only exception because they are text.
            </p>
          </Slide>
          <SectionHeader id="brotli">Brotli</SectionHeader>
          <Slide
            slideId="http-brotli-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-brotli-1']}
              />
            }
          >
            <p>
              Gzip has an alternative – a compression algorithm called Brotli.
            </p>
            <p>
              <em>Brotli’s advantage:</em> with the same CPU load,{' '}
              <a href="https://blogs.akamai.com/2016/02/understanding-brotlis-potential.html">
                it compresses 20–30% better than Gzip
              </a>
              . That’s 30% fewer bytes to download for free!
            </p>
            <p>
              <em>Brotli’s disadvantage:</em> it’s relatively new and is
              supported worse than Gzip. Because of that, you can’t easily
              replace Gzip with Brotli – you’ll have to use both at the same
              time for compression to work in different browsers.
            </p>
          </Slide>
          <Slide
            slideId="http-brotli-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-brotli-2']}
              />
            }
          >
            <p>
              Brotli is supported in Apache since version 2.4.26 and is
              available for Nginx as an external module.
            </p>
            <p>
              <a href="https://httpd.apache.org/docs/trunk/mod/mod_brotli.html#recommended">
                Apache instructions
              </a>{' '}
              · <a href="https://github.com/google/ngx_brotli">Nginx module</a>
            </p>
            <p>
              <small>
                Note: don’t set Brotli’s compression level to the maximum as
                it’d make it significantly slower than Gzip. Brotli’s
                compression level 4{' '}
                <a href="https://certsimple.com/blog/nginx-brotli">
                  is both faster than the Gzip’s default level and compresses
                  better
                </a>
                .
              </small>
            </p>
          </Slide>
          <SectionHeader id="cdn">CDN</SectionHeader>
          <Slide
            slideId="http-cdn-1"
            useImageBorder={true}
            image={<BlockImage src={httpCdnUrl} />}
          >
            <p>Now, let’s talk about CDNs.</p>
            <p>
              What’s a CDN? Imagine you built an application and hosted it on
              servers located in the US. If the app’s user is in Warsaw, their
              request will have to travel all the way to the States and back to
              Poland. And this will take a lot of time because:
              <br />
              — the request will have to travel a large distance (and its speed
              is limited by the speed of light);
              <br />— it will also have to pass through a number of routers and
              similar devices (and each device adds a processing delay).
            </p>
            <p>
              This can be justified if the request is made to retrieve the app
              data, and only that one server in the US knows how to form it
              properly. But this is absolutely unnecessary if the user is trying
              to download an image or a video – because that’s just a regular
              static content that can be served by literally any server.
            </p>
          </Slide>
          <Slide
            slideId="http-cdn-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-cdn-2']}
              />
            }
          >
            <p>
              CDN services are offering a solution to this problem. CDN stands
              for “content delivery network”, and CDN services provide a large
              number of servers to put your static files (the “content”) on
              around the world. To use one, you register in a CDN service,
              upload your files, and update the files’ domain in the app. And,
              after that, each user’s request is rerouted to a server closest to
              their location.
            </p>
            <p>
              In our experience, CDNs typically reduce each request’s delay from
              hundreds of milliseconds to 5–10 ms. Considering how many requests
              an app makes when a single page is opened, the effect from using
              CDN is truly marvelous.
            </p>
          </Slide>
          <SectionHeader id="preloading">Preloading</SectionHeader>
          <Slide
            slideId="http-preload-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-preload-1']}
              />
            }
          >
            <p>
              Next. Did you know Google starts preloading the first link in
              search results as soon as you do a search? That’s because{' '}
              <a href="https://searchenginewatch.com/sew/study/2276184/no-1-position-in-google-gets-33-of-search-traffic-study">
                a third of all visitors click the first link
              </a>
              , and preloading it allows them to see the target site faster.
            </p>
            <p>
              If you have pages or resources that you know will also be needed
              in a short time, browsers let you preload them in advance – just
              like Google does.
            </p>
          </Slide>
          <Slide
            slideId="http-preload-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-preload-2']}
              />
            }
          >
            <p>
              There’re a whole 5 different methods of preloading, and all of
              them are suitable for different goals. Here’re what these methods
              do, in brief:
            </p>
            <p>
              — <code>&lt;link rel=&quot;dns-prefetch&quot;&gt;</code> instructs
              the browser to make a DNS request for a server’s IP address in
              advance. This is useful for CDNs, Google Fonts, and all other
              cases when you know you’ll need a resource in a short time, know
              the domain it’s hosted at, but don’t know its exact path. In this
              case, resolving the server’s IP address in advance would save you{' '}
              <a href="https://www.chromium.org/developers/design-documents/dns-prefetching">
                from 50 to 300 ms
              </a>
              .
            </p>
            <p>
              — <code>&lt;link rel=&quot;preconnect&quot;&gt;</code> instructs
              the browser to perform the connection to a server in advance. It’s
              useful in the same cases when <code>dns-prefetch</code> is useful,
              but{' '}
              <a href="https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/">
                sets up a full connection and saves more time
              </a>
              . The drawback here is that opening a new connection is pretty
              resource-intensive, so you don’t want to overuse this
              optimization.
            </p>
            <p>
              — <code>&lt;link rel=&quot;prefetch&quot;&gt;</code> preloads and
              caches a resource in background with a low priority. This is
              useful e.g. to preload a JS bundle for the next page of an app.
            </p>
            <p>
              — <code>&lt;link rel=&quot;preload&quot;&gt;</code> preloads a
              resource in background with a high priority. This is useful to
              preload a resource you’ll need in several seconds – e.g.,{' '}
              <a href="#css-critical-1">a non-critical CSS file</a>.
            </p>
            <p>
              — <code>&lt;link rel=&quot;prerender&quot;&gt;</code> preloads the
              specified page in the background and renders it in an invisible
              tab. Later, when a visitor clicks to a link leading to the
              prerendered page, the page displays immediately. This is what
              Google uses to preload its first search result.
            </p>
            <p>
              <small>
                Note: don’t overuse prefetching methods. Downloading stuff in
                the background still consumes visitor’s traffic – and it’s
                really bad on mobile. So adding 10 extra preloads might make
                your app a bit faster, but your visitor will pay real money for
                this. 2-4 preloads per page are probably fine.
              </small>
            </p>
            <p>
              <small>
                Read more:{' '}
                <a href="/blog/link-rels">
                  Preload, prefetch and other &lt;link&gt; tags
                </a>
              </small>
            </p>
          </Slide>
          <SectionHeader id="http-summing-up">All together</SectionHeader>
          <Slide
            slideId="http-summing-up-slide"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['http-summing-up']}
              />
            }
          >
            <p>
              Summing up HTTP/connection optimizations:
              <br />—{' '}
              <a href="#http-minify">
                Minify HTML, just like any other resource
              </a>
              <br />— Compress text resources{' '}
              <a href="#http-gzip-1">using Gzip</a> and{' '}
              <a href="#http-brotli-1">Brotli</a>
              <br />— Use a CDN to save time{' '}
              <a href="#http-cdn-1">on downloading your static resources</a>
              <br />— Preload resources{' '}
              <a href="#http-preload-1">you know you’ll need later</a>
            </p>
          </Slide>
          <Slide
            slideId="images-header"
            isSectionHeader={true}
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={sectionHeadersByName['images-and-fonts-header']}
              />
            }
          >
            <p>Moving on. Let’s talk about images.</p>
          </Slide>
          <Slide
            slideId="images-format"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-format']}
              />
            }
          >
            <p>
              Images take up lots of traffic, but, luckily, don’t block
              rendering (like JS or CSS code does). Still, it’s better to
              optimize them too to make them appear faster and use fewer network
              data.
            </p>
            <p>
              First and foremost: choose an appropriate format for each image.
              There are different image formats, and they work best with
              different types of images.
            </p>
            <p>
              The most common formats are <code>svg</code>, <code>jpg</code>,{' '}
              <code>png</code>, <code>webp</code> and <code>gif</code>. Here’s
              how to choose between them.
            </p>
          </Slide>
          <Slide
            slideId="images-svg"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-svg']}
              />
            }
          >
            <p>
              <code>svg</code> is best for vector images such as icons or logos.
            </p>
          </Slide>
          <Slide
            slideId="images-jpg"
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-jpg']}
              />
            }
          >
            <p>
              <code>jpg</code> is best for photos because it compresses images
              with a slight quality loss not visible by the human eye.
            </p>
          </Slide>
          <Slide
            slideId="images-png"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-png']}
              />
            }
          >
            <p>
              <code>png</code> is best for raster graphics that you want to
              display without any quality losses – e.g., raster icons or pixel
              art.
            </p>
          </Slide>
          <Slide
            slideId="images-webp-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-webp-1']}
              />
            }
          >
            <p>
              <code>webp</code> works great for both photos and raster graphics
              because it supports both lossy and lossless compression. It also
              compresses at least 20-30% better than <code>jpg</code> and{' '}
              <code>png</code> (
              <a href="https://optimus.keycdn.com/support/jpg-to-webp/">
                <code>jpg</code> study
              </a>{' '}
              ·{' '}
              <a href="https://optimus.keycdn.com/support/png-to-webp/">
                <code>png</code> study
              </a>
              ).
            </p>
            <p>
              Unfortunately, <code>webp</code> is{' '}
              <a href="https://caniuse.com/#feat=webp">
                not supported in Safari and Internet Explorer
              </a>
              . However, you can still load webp images with a <code>jpg</code>{' '}
              or <code>png</code> fallback using the{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture">
                <code>&lt;picture&gt;</code>
              </a>{' '}
              tag.
            </p>
          </Slide>
          <Slide
            slideId="images-webp-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-webp-2']}
              />
            }
          >
            <p>
              This is how a <code>&lt;picture&gt;</code> tag for{' '}
              <code>webp</code> with a <code>jpg</code> fallback would look
              like.
            </p>
            <p>
              With such tag, browsers that support <code>webp</code> will load
              the <code>webp</code> file. Browsers that don’t support{' '}
              <code>webp</code> or the <code>&lt;picture&gt;</code> tag would
              fall back to the plain <code>jpg</code> image.
            </p>
          </Slide>
          <Slide
            slideId="images-gif"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-gif']}
              />
            }
          >
            <p>
              And, finally, <code>gif</code>s.
            </p>
            <p>
              Don’t use the <code>gif</code> format at all. <code>gif</code>s
              are <em>huge</em> – too often, they take megabytes or tens of
              megabytes of data. Instead, use video files (with the{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video">
                <code>&lt;video&gt;</code>
              </a>{' '}
              tag) which compress the content way better.
            </p>
            <p>
              <small>
                See also:{' '}
                <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/">
                  Replace Animated GIFs with Video
                </a>{' '}
                at WebFundamentals
              </small>
            </p>
          </Slide>
          <SectionHeader id="image-compression">
            Image compression
          </SectionHeader>
          <Slide
            slideId="images-compress"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-compress']}
              />
            }
          >
            <p>
              Besides using the right format, pictures can be optimized with
              compression. Here’s what you can do with different image types.
            </p>
          </Slide>
          <Slide
            slideId="images-compress-svg"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-compress-svg-jpg']}
              />
            }
          >
            <p>
              First: <code>svg</code>.
            </p>
            <p>
              — <em>Minify.</em> Since SVG images are text, they can be minified
              by removing comments and spaces.
            </p>
            <p>
              — <em>Simplify paths.</em> If an SVG file is automatically
              generated or exported from a graphical editor, paths in it can be
              overly complicated. If such cases, remove path points that don’t
              affect anything visually.
            </p>
            <p>
              — <em>Simplify file structure.</em> If an SVG file is exported
              from a graphical editor, often, it also includes extra meta
              elements. Remove those to make SVGs smaller.
            </p>
            <p>
              All these optimizations can be automated with a console utility
              called{' '}
              <a href="https://github.com/svg/svgo">
                <code>svgo</code>
              </a>
              . There’s also{' '}
              <a href="https://jakearchibald.github.io/svgomg/">
                a great UI for <code>svgo</code>
              </a>
              .
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={
                  allSlidesByName[
                    'images-and-fonts-compress-svg-jpg-exclamation'
                  ]
                }
              />
            }
          >
            <p>
              Second: <code>jpg</code>.
            </p>
            <p>
              — <em>Decrease image dimensions.</em> From my experience, this is
              an <em>incredibly</em> common mistake that happens with photos.
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-dimensions"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={
                  allSlidesByName['images-and-fonts-compress-jpg-dimensions']
                }
              />
            }
          >
            <p>
              The problem occurs when you have a high-dimension picture – say, a
              2560 × 1440 px photo – that you put into a small container – say,
              533 × 300 px.
            </p>
            <p>
              When this happens, the browser has to download an unnecessarily
              large file. Moreover, it then has to spend time scaling that file
              down to lower dimensions. That’s just meaningless.
            </p>
            <p>
              To fix this, scale down your images in a graphics editor like
              Photoshop or Gimp, with a webpack loader (e.g.,{' '}
              <a href="https://github.com/herrstucki/responsive-loader">
                <code>responsive-loader</code>
              </a>
              ), or using another tool. If you need high-dimension pictures for
              HiDPI screens, use{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images">
                <code>&lt;picture&gt;</code> or <code>&lt;img srcset&gt;</code>
              </a>{' '}
              instead.
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-size-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={
                  allSlidesByName['images-and-fonts-compress-jpg-size-1']
                }
              />
            }
          >
            <p>Next.</p>
            <p>
              —{' '}
              <em>
                Compress your JPG images with the compression level of{' '}
                70&#x2011;80.
              </em>{' '}
              The thing here is that, down to some compression level, a quality
              loss is just not noticeable.
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-size-2"
            image={
              <SlideGatsbyImage
                alt="3 images of a panda"
                imageData={
                  allSlidesByName['images-and-fonts-compress-jpg-size-2']
                }
              />
            }
          >
            <p>
              For example, here’re three different versions of the same JPG
              image: with level 100 quality, level 70 quality, and level 50
              quality.
            </p>
            <p>
              <small>
                Original images: <a href={data.panda100.publicURL}>level 100</a>{' '}
                · <a href={data.panda70.publicURL}>level 70</a> ·{' '}
                <a href={data.panda50.publicURL}>level 50</a>
              </small>
            </p>
            <p>
              <small>
                Photo by{' '}
                <a href="https://unsplash.com/photos/1o8VV8yOw40?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                  Bruce Hong
                </a>{' '}
                on Unsplash
              </small>
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-size-3"
            image={
              <SlideGatsbyImage
                alt="3 zoomed-in images of a panda"
                imageData={
                  allSlidesByName['images-and-fonts-compress-jpg-size-3']
                }
              />
            }
          >
            <p>
              If you zoom into the pictures, you’ll see noticeable compression
              artifacts and detail loss only at compression level 50.
              Compression level 70 still eats some of the image details, but
              it’s way less noticeable.
            </p>
            <p>
              <small>
                Cropped and zoomed images:{' '}
                <a href={data.panda100Large.publicURL}>level 100</a> ·{' '}
                <a href={data.panda70Large.publicURL}>level 70</a> ·{' '}
                <a href={data.panda50Large.publicURL}>level 50</a>
              </small>
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-size-4"
            image={
              <SlideGatsbyImage
                alt="The same 3 images of a panda. The first image is 669 kB, the second is 100 kB, and the third one is 74 kB."
                imageData={
                  allSlidesByName['images-and-fonts-compress-jpg-size-4']
                }
              />
            }
          >
            <p>
              But what’s drastically different about the versions of this image
              is their size. The level 70 image is almost 7 times smaller than
              level 100 image – keeping practically the same level of details!
            </p>
            <p>
              That’s why you want to compress JPG images with level 70-80.
              Because the quality losses are insignificant, but the size gains
              are incredible.
            </p>
            <p>
              To compress JPG images, use a graphics editor like Photoshop or
              Gimp, a webpack loader (e.g.,{' '}
              <a href="https://www.npmjs.com/package/image-webpack-loader">
                <code>image-webpack-loader</code>
              </a>
              ), or another tool.
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-progressive-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={
                  allSlidesByName['images-and-fonts-compress-jpg-progressive-1']
                }
              />
            }
          >
            <p>Next.</p>
            <p>
              — <em>Use Progressive JPEG.</em> Progressive JPEG a kind of JPG
              that starts rendering in a bad quality but improves as the image’s
              being loaded.
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-progressive-2"
            useImageBorder={true}
            image={
              <BlockImage
                alt="An animation of an image gradually loading from top to bottom"
                src={nonProgressiveGif}
              />
            }
          >
            <p>
              E.g., this is how a non-progressive (<em>baseline</em>) image
              usually loads when the network is slow. It just slowly renders
              from top to bottom.
            </p>
            <p>
              <small>
                Gif source:{' '}
                <a href="https://blog.codinghorror.com/progressive-image-rendering/">
                  Progressive Image Rendering
                </a>{' '}
                by Jeff Atwood
              </small>
            </p>
          </Slide>
          <Slide
            slideId="images-compress-jpg-progressive-3"
            useImageBorder={true}
            image={
              <BlockImage
                alt="An animation of an image slowly getting less pixelated"
                src={progressiveGif}
              />
            }
          >
            <p>
              A progressive image, however, starts rendering with a smaller
              number of details and enhances during loading. Thanks to this, a
              visitor can roughly see what’s in the image way earlier.
            </p>
            <p>
              To make an image progressive, use a graphics editor like Photoshop
              or Gimp, a webpack loader (e.g.,{' '}
              <a href="https://www.npmjs.com/package/image-webpack-loader">
                <code>image-webpack-loader</code>
              </a>
              ), or another tool.
            </p>
            <p>
              <small>
                Note: progressive JPEGs don’t come for free. They’re slower to
                decode, and they can be larger than the same baseline images.
                Read more in{' '}
                <a href="https://images.guide/#jpeg-compression-modes">
                  images.guide
                </a>{' '}
                by Addy Osmani.
              </small>
            </p>
            <p>
              <small>
                Gif source:{' '}
                <a href="https://blog.codinghorror.com/progressive-image-rendering/">
                  Progressive Image Rendering
                </a>{' '}
                by Jeff Atwood
              </small>
            </p>
          </Slide>
          <Slide
            slideId="images-compress-png"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-compress-png']}
              />
            }
          >
            <p>
              Third: <code>png</code>.
            </p>
            <p>
              — <em>Use Interlaced PNG.</em> Interlaced PNG works the same way
              as{' '}
              <a href="#images-and-fonts-compress-jpg-progressive-1">
                Progressive JPEG
              </a>
              : it starts rendering in a low quality but improves as it loads.
              It’s not suitable for everything – e.g., loading png icons
              progressively would look weird – but it might work for some
              images.
            </p>
            <p>
              — <em>Use indexed colors.</em> With{' '}
              <a href="https://en.wikipedia.org/wiki/Indexed_color">
                indexed colors
              </a>
              , a PNG image puts all its colors into a palette and uses it to
              reference each color. This makes the number of bytes needed for
              each pixel smaller and might help to decrease the overall image
              weight. Because the palette size is limited (up to 256 colors),
              this solution doesn’t work for images with lots of colors.
            </p>
            <p>
              Both interlacing and color indexing can be enabled with a graphic
              editor,{' '}
              <a href="https://www.npmjs.com/package/image-webpack-loader">
                <code>image-webpack-loader</code>
              </a>
              , or another tool.
            </p>
          </Slide>
          <Slide
            slideId="images-compress-tools"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-and-fonts-compress-tools']}
              />
            }
          >
            <p>
              And all of the above can be automated! I’ve already mentioned some
              tools earlier. But to sum up and add some more:
            </p>
            <p>
              — webpack has{' '}
              <a href="https://www.npmjs.com/package/image-webpack-loader">
                <code>image-webpack-loader</code>
              </a>{' '}
              which runs on every build and does pretty much every optimization
              from above. Its default settings are OK
            </p>
            <p>
              — For you need to optimize an image once and forever, there’re
              apps like <a href="https://imageoptim.com/mac">ImageOptim</a> and
              sites like <a href="http://tinypng.com">TinyPNG</a>.
            </p>
            <p>
              — If you can’t plug a webpack loader into your build process,
              there’re also a number of CDNs and services that host and optimize
              images for you (e.g., <a href="https://www.akamai.com/">Akamai</a>
              , <a href="https://cloudinary.com/">Cloudinary</a>, or{' '}
              <a href="https://www.imgix.com/">imgix</a>).
            </p>
          </Slide>
          <Slide
            slideId="images-summing-up"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['images-summing-up']}
              />
            }
          >
            <p>
              That’s all about images. Summing up:
              <br />—{' '}
              <a href="#images-format">Choose the proper image format</a>
              <br />— <a href="#images-compress">
                Optimize image loading time
              </a>{' '}
              by decreasing their dimensions, decreasing their quality, or
              making them progressive
            </p>
            <p>
              <small>
                To learn more about image optimization, see:
                <br />— <a href="https://images.guide/">images.guide</a> by Addy
                Osmani
                <br />—{' '}
                <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images">
                  Responsive images
                </a>{' '}
                on MDN
                <br />—{' '}
                <a href="https://iamakulov.com/notes/optimize-images-webpack/">
                  How to optimize images in webpack
                </a>{' '}
                by Ivan Akulov (the talk author)
              </small>
            </p>
          </Slide>
          <Slide
            slideId="fonts-header"
            isSectionHeader={true}
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={sectionHeadersByName['fonts-header']}
              />
            }
          >
            <p>And the last section on optimizations: fonts.</p>
          </Slide>
          <Slide
            slideId="fonts-video"
            image={
              <Video
                src={fontsLoadingUrl}
                muted={true}
                autoPlay={true}
                loop={true}
              />
            }
          >
            <p>
              When you browse the web from a slow connection, sometimes,
              there’re cases when a page has started loading, the layout and
              pictures are already visible, but the text is absent for a few
              more seconds. Like on the video.
            </p>
            <p>
              This happens when the page has custom fonts. On such pages,
              browsers usually don’t render the text immediately. Instead, they
              wait for a few seconds for those fonts to load to render the text
              with them. Only if a font doesn’t download after several seconds,
              they use the fallback font.
            </p>
            <p>
              This behavior of not showing the text is often reasonable as it
              prevents{' '}
              <a href="https://css-tricks.com/fout-foit-foft/">
                the flash of unstyled text
              </a>{' '}
              (jumping of text that happens when one font is replaced with
              another). But in slower networks, this behavior makes users wait
              for longer. And it’s undesirable.
            </p>
            <p>Let’s see how to optimize fonts to avoid this.</p>
          </Slide>
          <SectionHeader id="fallback-fonts">Fallback fonts</SectionHeader>
          <Slide
            slideId="fonts-fallback-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Slide with a CSS rule. The rule reads: font-family: PT Sans, Arial, sans-serif. The “Arial, sans-serif” part is highlighted."
                imageData={allSlidesByName['fonts-fallback-1']}
              />
            }
          >
            <p>First. Remember to specify the fallback font.</p>
            <p>
              A fallback font is a font that the browser uses if the primary
              font can’t be downloaded or if it takes a while to load. It’s
              specified in the <code>font</code> or <code>font-family</code> CSS
              declarations after the custom font name.
            </p>
            <p>
              A fallback font might be{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals#Web_safe_fonts">
                a popular built-in font
              </a>{' '}
              (like Georgia); it might be{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#Values">
                a generic font family
              </a>{' '}
              (like <code>serif</code> or <code>sans-serif</code>); or it might
              be both. Generally, even if you specify a popular built-in font,
              you should still add a generic font family – because even that
              font might be absent on some devices.
            </p>
          </Slide>
          <Slide
            slideId="fonts-fallback-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Two screenshots of a page side-by-side. The first screenshot uses a custom font, and the second screenshot uses Times New Roman. The fonts look vastly different"
                imageData={allSlidesByName['fonts-fallback-2']}
              />
            }
          >
            <p>
              Without the fallback font, if a custom font isn’t available, the
              browser will render everything in the default{' '}
              <a href="https://en.wikipedia.org/wiki/Serif">serif font</a>. And
              this might not look well.
            </p>
          </Slide>
          <Slide
            slideId="fonts-fallback-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt="Two screenshots of a page side-by-side. The first screenshot uses a custom font, and the second screenshot uses Calibri. The fonts look similar"
                imageData={allSlidesByName['fonts-fallback-3']}
              />
            }
          >
            <p>
              With the fallback font, however, you have a chance to specify the
              font that resembles the custom one.
            </p>
          </Slide>
          <SectionHeader id="font-display">font-display</SectionHeader>
          <Slide
            slideId="fonts-font-display-1"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['fonts-font-display-2']}
              />
            }
          >
            <p>
              Second. Use the <code>font-display</code> CSS property for your
              custom fonts.
            </p>
            <p>
              The <code>font-display</code> property adjusts the way a custom
              font is applied. By default, it’s set to <code>auto</code>, and in
              all major browsers, this means the browser will wait 3 seconds for
              the custom font to download. This means that if a network is slow,
              the visitor will have to wait for the text for the whole 3 extra
              seconds.
            </p>
            <p>
              This is bad. To optimize this, specify a different{' '}
              <code>font-display</code> value.
            </p>
            <p>
              <small>
                Note: in Microsoft Edge, the <code>font-display: auto</code>{' '}
                behavior is different. With it, if the custom font is not
                cached, Edge immediately renders the text in the fallback font
                and substitutes the custom font later when it’s loaded. This is
                not a bug because <code>font-display: auto</code> lets browsers
                define the loading strategy.
              </small>
            </p>
          </Slide>
          <Slide
            slideId="fonts-font-display-2"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['fonts-font-display-3']}
              />
            }
          >
            <p>
              There’re two <code>font-display</code> values that I believe are
              suitable in most cases.
            </p>
            <p>
              The first one is <code>font-display: fallback</code>. With it, the
              browser will render the text immediately with the available font:
              either the custom font if it’s cached, or the fallback font. Then,
              if the custom font isn’t cached, the browser will download it.
              And, if the custom font downloads quickly enough (usually in 3
              seconds), the browser will swap the fallback font with the custom
              one.
            </p>
            <p>
              With this behavior, sometimes, the user will see the page in the
              fallback font, start reading, but then the browser will flash the
              text by substituting the custom font (see also:{' '}
              <a href="https://css-tricks.com/fout-foit-foft/">
                the flash of unstyled text
              </a>
              ). This is slightly worse for the user experience, but it’s still
              better than not showing any text at all.
            </p>
          </Slide>
          <Slide
            slideId="fonts-font-display-3"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['fonts-font-display-4']}
              />
            }
          >
            <p>
              The second suitable <code>font-display</code> value is{' '}
              <code>optional</code>. With it, the browser will also render the
              text immediately with the available font: either the custom font
              if it’s cached, or the fallback font. But then, even if the custom
              font downloads, the browser won’t substitute it until the page is
              refreshed.
            </p>
            <p>
              This behavior means that the user will only see the page in the
              custom font or in the fallback one, but will never experience the
              flash of unstyled text.
            </p>
          </Slide>
          <Slide
            slideId="fonts-font-display-taste"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['fonts-font-display-5']}
              />
            }
          >
            <p>
              How to choose between <code>font-display: fallback</code> and{' '}
              <code>font-display: optional</code>?
            </p>
            <p>
              I believe it’s a matter of taste. I, personally, prefer to keep my
              text rendered with the custom font, so I choose the{' '}
              <code>font-display: fallback</code> value. If you’re OK that
              first-time visitors will see your page in a fallback font,{' '}
              <code>font-display: optional</code> would work great for you.
            </p>
            <p>
              <small>
                Note: this <code>font-display</code> trick is not applicable to
                icon fonts. In icon fonts, each icon is usually encoded by a
                rarely used Unicode character. Using <code>font-display</code>{' '}
                to render icons with a fallback font will make random characters
                appear in their place.
              </small>
            </p>
            <p>
              <small>
                Read more about <code>font-display</code>:{' '}
                <a href="https://css-tricks.com/font-display-masses/">
                  CSS-Tricks article
                </a>{' '}
                ·{' '}
                <a href="https://font-display.glitch.me/">
                  demo of different <code>font-display</code> values
                </a>
              </small>
            </p>
          </Slide>
          <Slide
            slideId="fonts-summing-up"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['fonts-summing-up']}
              />
            }
          >
            <p>
              That’s it about fonts. Summing up:
              <br />—{' '}
              <a href="#fonts-fallback-1">
                Specify the proper fallback font
              </a>{' '}
              (and a generic font family)
              <br />—{' '}
              <a href="#fonts-font-display-1">
                Use <code>font-display</code>
              </a>{' '}
              to configure how the custom font is applied
            </p>
          </Slide>
          <Slide
            slideId="tools-header"
            isSectionHeader={true}
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={sectionHeadersByName['tools-header']}
              />
            }
          >
            <p>
              Hooray, finally, tools! Here’re some instruments that will give
              you insights into the app’s performance.
            </p>
          </Slide>
          <Slide
            slideId="tools-pagespeed-insights"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['tools-pagespeed-insights']}
              />
            }
          >
            <p>
              The first tool is{' '}
              <a href="https://developers.google.com/speed/pagespeed/insights/">
                Google PageSpeed Insights
              </a>
              .
            </p>
            <p>
              PageSpeed Insights run a number of audits over the URL you give
              it. They analyze page resources, find optimization suggestions,
              and calculate your performance score.
            </p>
            <p>
              If you only start with web performance, this tool will work the
              best for you. Aim to have the PageSpeed score of 80 or higher.
            </p>
          </Slide>
          <Slide
            slideId="tools-lighthouse"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['tools-lighthouse']}
              />
            }
          >
            <p>
              The second tool is{' '}
              <a href="https://developers.google.com/web/tools/lighthouse/">
                Lighthouse
              </a>
              .
            </p>
            <p>
              Lighthouse is PageSpeed Insights on steroids. It has several
              audits (including performance, SEO and accessibility). It
              calculates multiple metrics and outputs even more performance
              suggestions.
            </p>
            <p>
              Unlike PageSpeed Insights (which run as a standalone site),
              Lighthouse is built into Chrome DevTools. This means you can use
              it even for a non-publicly-accessible app!
            </p>
          </Slide>
          <Slide
            slideId="tools-webpagetest"
            useImageBorder={true}
            image={
              <SlideGatsbyImage
                alt=""
                imageData={allSlidesByName['tools-webpagetest']}
              />
            }
          >
            <p>
              The third tool is{' '}
              <a href="https://webpagetest.org">WebPageTest</a>.
            </p>
            <p>
              WebPageTest is an advanced auditing tool. It analyzes a site
              performance and outputs a huge number of data like metrics,
              loading waterfall, content breakdown, and more. It’s useful when
              doing complex optimizations.
            </p>
          </Slide>
          <Slide
            slideId="tools-bundleanalyzer"
            image={
              <Video
                src={toolsWebpackBundleAnalyzer}
                muted={true}
                autoPlay={true}
                loop={true}
              />
            }
          >
            <p>
              And the last tool is{' '}
              <a href="https://www.npmjs.com/package/webpack-bundle-analyzer">
                webpack-bundle-analyzer
              </a>
              .
            </p>
            <p>
              <code>webpack-bundle-analyzer</code> is a webpack utility that
              visualizes your bundle content. It’s extremely useful to
              understand what takes size in your bundle and what you can
              optimize. Read more about how to use it{' '}
              <a href="https://developers.google.com/web/fundamentals/performance/webpack/monitor-and-analyze#analyze_why_the_bundle_is_so_large">
                at WebFundamentals
              </a>
              .
            </p>
            <p>That’s it about tools – and about the talk!</p>
            <p>
              <small>
                Video source:{' '}
                <a href="https://www.npmjs.com/package/webpack-bundle-analyzer">
                  webpack-bundle-analyzer docs
                </a>
                <br />
                More tools:{' '}
                <a href="https://github.com/iamakulov/awesome-webpack-perf#analysis-tools">
                  iamakulov/awesome-webpack-perf
                </a>
              </small>
            </p>
          </Slide>
          <Slide
            slideId="thanks"
            useImageBorder={true}
            image={
              <SlideGatsbyImage alt="" imageData={allSlidesByName['thanks']} />
            }
          >
            <p>Thanks!</p>
            <p>
              Follow me on Twitter:{' '}
              <a href="https://twitter.com/iamakulov">@iamakulov</a>
            </p>
            <p>
              <small>
                Thanks to <a href="https://twitter.com/arunbasillal">Arun</a>,{' '}
                <a href="https://twitter.com/theKashey">Anton Korzunov</a>,{' '}
                <a href="https://twitter.com/hollowaynz">Matthew Holloway</a>,{' '}
                <a href="https://twitter.com/bradleyfew">Bradley Few</a>,{' '}
                <a href="https://twitter.com/BrianRosamilia">Brian Rosamilia</a>
                , <a href="https://twitter.com/iamkeraf">Rafael Keramidas</a>,{' '}
                <a href="https://twitter.com/vitkarpov">Viktor Karpov</a>, and
                Artem Miroshnyk (in no particular order) for providing feedback
                on drafts.
              </small>
            </p>
          </Slide>
        </Slides>
        <TalkMeta
          authors={[
            {
              description: 'PerfPerfPerf founder',
              imageData: data.iamakulovPhoto.childImageSharp.gatsbyImageData,
              link: 'https://twitter.com/iamakulov',
              name: 'Ivan Akulov',
            },
          ]}
          lastUpdatedDate={lastUpdatedDate}
        />
        <Footnote>
          <p>
            <strong>Want to apply this advice to your site?</strong> We’ve
            worked with Google, Framer, SitePoint, and other companies.{' '}
            <a href="/#services">Reach out</a>
          </p>
        </Footnote>
        <Footer />
      </WidthWrapper>
    </Layout>
  );
};

export default WebPerf101Page;

export const query = graphql`
  {
    indexSlide: file(
      sourceInstanceName: { eq: "pages" }
      relativePath: { eq: "talks/web-perf-101/slides/index.png" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: NONE, layout: CONSTRAINED)
      }
    }
    sectionHeaders: allFile(
      filter: {
        relativeDirectory: { eq: "talks/web-perf-101/slides" }
        name: { glob: "*-header" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(width: 700, placeholder: NONE, layout: CONSTRAINED)
          }
        }
      }
    }
    allSlides: allFile(
      filter: {
        relativeDirectory: { eq: "talks/web-perf-101/slides" }
        extension: { nin: ["svg", "mp4"] }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: NONE, layout: CONSTRAINED)
          }
        }
      }
    }
    iamakulovPhoto: file(
      sourceInstanceName: { eq: "shared" }
      relativePath: { eq: "iamakulov.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 48
          height: 48
          quality: 90
          placeholder: NONE
          layout: FIXED
        )
      }
    }
    panda100: file(
      relativePath: { eq: "talks/web-perf-101/pandas/panda_100.jpg" }
    ) {
      publicURL
    }
    panda70: file(
      relativePath: { eq: "talks/web-perf-101/pandas/panda_70.jpg" }
    ) {
      publicURL
    }
    panda50: file(
      relativePath: { eq: "talks/web-perf-101/pandas/panda_50.jpg" }
    ) {
      publicURL
    }
    panda100Large: file(
      relativePath: { eq: "talks/web-perf-101/pandas/panda_100_large.png" }
    ) {
      publicURL
    }
    panda70Large: file(
      relativePath: { eq: "talks/web-perf-101/pandas/panda_70_large.png" }
    ) {
      publicURL
    }
    panda50Large: file(
      relativePath: { eq: "talks/web-perf-101/pandas/panda_50_large.png" }
    ) {
      publicURL
    }
  }
`;
