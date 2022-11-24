const json5 = require('json5');
const { render } = require('posthtml-render');

/**
 * @param {{
 *  kind: 'image' | 'video';
 *  alt: string;
 *  fallback?: { src: string; srcSet?: string; };
 *  sources: { src?: string; srcSet?: string; sizes?: string; type: string }[]
 *  presentationWidth?: number;
 *  presentationHeight?: number;
 * }} param0
 * @returns {string}
 */
function createMediaMarkup({
  kind,
  alt,
  fallback,
  sources = [],
  presentationWidth,
  presentationHeight,
}) {
  // Alt holds either the alt string, or a stringified JSON object with media options
  /**
   * @type {{
   *  scrollable?: { height: number; };
   *  alt?: string;
   *  caption?: string;
   *  presentationWidth?: number;
   *  presentationHeight?: number;
   *  sources?: { src?: string; srcSet?: string; sizes?: string; type: string }[];
   * }}
   */
  let mediaOptions = {};
  try {
    mediaOptions = json5.parse(alt) ?? {};
  } catch (e) {
    // It’s not a JSON string, so it’s just the alt text.
    // Ignore the exception
  }

  const resolvedPresentationWidth =
    mediaOptions.presentationWidth ?? presentationWidth;
  const resolvedPresentationHeight =
    mediaOptions.presentationHeight ?? presentationHeight;

  /** @type {import('posthtml-parser').NodeTag} */
  const figureElement = {
    tag: 'figure',
    attrs: {
      class: 'media-container',
    },
  };

  /** @type {import('posthtml-parser').NodeTag} */
  const containerElement = {
    tag: kind === 'image' ? 'picture' : 'video',
    attrs:
      kind === 'image'
        ? {}
        : {
            controls: true,
            muted: true,
            style:
              resolvedPresentationWidth && resolvedPresentationHeight
                ? `aspect-ratio: ${resolvedPresentationWidth} / ${resolvedPresentationHeight}`
                : undefined,
          },
  };

  /** @type {import('posthtml-parser').NodeTag[]} */
  const sourceElements = [...(mediaOptions.sources ?? []), ...sources].map(
    (source) => ({
      tag: 'source',
      attrs: {
        src: source.src,
        srcSet: source.srcSet,
        sizes: source.sizes,
        type: source.type,
      },
    }),
  );

  /** @type {import('posthtml-parser').NodeTag | null} */
  let fallbackElement = null;
  if (fallback) {
    if (kind === 'video')
      throw new Error('Fallbacks are not supported for videos');

    fallbackElement = {
      tag: 'img',
      attrs: {
        src: fallback.src,
        srcset: fallback.srcSet,
        alt:
          Object.keys(mediaOptions).length > 0
            ? mediaOptions.alt ?? ''
            : alt ?? '',
        width: resolvedPresentationWidth,
        height: resolvedPresentationHeight,
      },
    };
  }

  /** @type {import('posthtml-parser').NodeTag | null} */
  const captionElement = mediaOptions.caption
    ? {
        tag: 'figcaption',
        attrs: {
          class: 'media-container__caption',
        },
        content: mediaOptions.caption,
      }
    : null;

  // Scrollable images: on mobile, they scroll horizontally
  // instead of scaling down. This is used for images with lots of details,
  // like loading waterfalls
  if (mediaOptions.scrollable) {
    if (!fallbackElement) {
      throw new Error('Scrollable images require a fallback element');
    }

    figureElement.attrs.class += ' media-container_scrollable';

    const aspectRatio = presentationWidth / presentationHeight;
    fallbackElement.attrs.style = `min-height: ${mediaOptions.scrollable.height}px; min-width: calc(${mediaOptions.scrollable.height}px * ${aspectRatio});`;
  }

  return render([
    {
      ...figureElement,
      content: [
        {
          ...containerElement,
          content: [...sourceElements, fallbackElement].filter(Boolean),
        },
        captionElement,
      ].filter(Boolean),
    },
  ]);
}

module.exports = createMediaMarkup;
