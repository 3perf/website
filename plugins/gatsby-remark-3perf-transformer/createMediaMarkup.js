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
 *  originalSrc?: string;
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
  originalSrc,
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
   *  maxWidth?: number;
   *  border?: boolean;
   *  clickable?: boolean;
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

  if (mediaOptions.maxWidth != null) {
    const w = mediaOptions.maxWidth;
    if (typeof w !== 'number' || !Number.isFinite(w) || w <= 0) {
      throw new Error('maxWidth must be a positive finite number (pixels)');
    }
    const fragment = `max-width: ${w}px`;
    const targetElement = fallbackElement ?? containerElement;
    targetElement.attrs.style = targetElement.attrs.style
      ? `${fragment}; ${targetElement.attrs.style}`
      : fragment;
  }

  if (mediaOptions.border) {
    figureElement.attrs.class += ' media-container_border';
  }

  /** @type {import('posthtml-parser').NodeTag} */
  const mediaElement = {
    ...containerElement,
    content: [...sourceElements, fallbackElement].filter(Boolean),
  };

  // Clickable images: wrap the image in a plain <a> linking to the original,
  // full-resolution asset, so readers can open it in a new tab to inspect
  // details. Falls back to the displayed `src` if the original isn’t available.
  let clickableMediaElement = mediaElement;
  if (mediaOptions.clickable) {
    if (!fallback) {
      throw new Error('Clickable media is only supported for images');
    }

    clickableMediaElement = {
      tag: 'a',
      attrs: {
        href: originalSrc ?? fallback.src,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      content: [mediaElement],
    };
  }

  return render([
    {
      ...figureElement,
      content: [clickableMediaElement, captionElement].filter(Boolean),
    },
  ]);
}

module.exports = createMediaMarkup;
