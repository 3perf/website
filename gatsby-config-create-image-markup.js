/////////////////////////////////
// This function provides custom image markup
// for https://www.gatsbyjs.org/packages/gatsby-remark-images-anywhere/.
// It
// - simplifies the output of gatsby-remark-images-anywhere (dropping background blur
//   and the aspect ratio div)
// - adds support for `scrollable` images

// Passed options are listed at https://www.gatsbyjs.org/packages/gatsby-remark-images-anywhere/#writing-your-own-markup
function createImageMarkup({
  alt,
  src,
  srcSet,
  srcWebp,
  srcSetWebp,
  sizes,
  originalImg,
  aspectRatio,
  presentationWidth,
  presentationHeight,
}) {
  const imageOptions =
    alt && alt.startsWith('{') && alt.endsWith('}')
      ? eval('(' + alt + ')')
      : {};

  const realAlt =
    Object.keys(imageOptions).length > 0 ? imageOptions.alt || '' : alt || '';

  // `width` and `height` are overwritten with CSS
  // but give the browser a sense of the aspect ratio.
  // This prevents the page from jumping when you’re scrolling up,
  // and lazy images above the viewport are being loaded
  const commonProps = `
    alt="${realAlt}"
    width="${presentationWidth}"
    height="${presentationHeight}"
  `;

  // Scrollable images: on mobile, they scroll horizontally
  // instead of scaling down. This is used for images with lots of details,
  // like loading waterfalls
  if (imageOptions.scrollable) {
    return `<figure class="image-container image-container_scrollable">
      <img
        src="${originalImg}"
        ${commonProps}
        style="min-height: ${imageOptions.scrollable.height}px; min-width: calc(${imageOptions.scrollable.height}px * ${aspectRatio});"
      />
    </figure>`;
  }

  // Normal responsive images
  return `<figure class="image-container">
    <picture>
      ${
        srcWebp
          ? `<source src="${srcWebp}" srcSet="${srcSetWebp}" sizes="${sizes}" type="image/webp" />`
          : ''
      }
      <source srcSet="${srcSet}" sizes="${sizes}" />
      <img
        src="${src}"
        ${commonProps}
        ${
          imageOptions.maxWidth
            ? `style="--max-width-from-options:${imageOptions.maxWidth}px"`
            : ''
        } />
    </picture>
  </figure>`;
}

module.exports = createImageMarkup;
