import '@fontsource/fira-code/latin-600.css';
import '@fontsource/fira-code/latin-400.css';

// We keep a copy of Montserrat in the repo because the Google Fonts version is missing some glyphs
// (e.g. the "→" arrow)
import montserratBlackWoff2Subset from '../../styles/webfonts/Montserrat-Black-subset.woff2';
import montserratBlackWoff2 from '../../styles/webfonts/Montserrat-Black.woff2';
import montserratBoldWoff2Subset from '../../styles/webfonts/Montserrat-Bold-subset.woff2';
import montserratBoldWoff2 from '../../styles/webfonts/Montserrat-Bold.woff2';
import montserratItalicWoff2Subset from '../../styles/webfonts/Montserrat-Italic-subset.woff2';
import montserratItalicWoff2 from '../../styles/webfonts/Montserrat-Italic.woff2';
import montserratRegularWoff2Subset from '../../styles/webfonts/Montserrat-Regular-subset.woff2';
import montserratRegularWoff2 from '../../styles/webfonts/Montserrat-Regular.woff2';

export const getGlobalFonts = () => `
  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Regular'),
      local('Montserrat-Regular'),
      url(${montserratRegularWoff2}) format('woff2');
    unicode-range: U+100-130,U+132-151,U+154-2BA,U+2BD-2C5,U+2C7-2D9,U+2DB,U+2DD-1FFF,U+2070-2073,U+2075-20AB,U+20AD-20E2,U+20E4-2121,U+2123-2138,U+213A-2190,U+219A-21A8,U+21AB-2211,U+2213,U+2214,U+2216-2319,U+231C-2327,U+2329-2387,U+2389-23CE,U+23D0-23E8,U+23F4-23F7,U+23FB-24C1,U+24C3-25A9,U+25AC-25B5,U+25B7-25BF,U+25C1-25FA,U+25FF,U+2606,U+2613,U+2686-268F,U+2706,U+2707,U+2713,U+2715,U+2717-271C,U+271E-2720,U+2722-2727,U+2729-2732,U+2735-2743,U+2745,U+2746,U+2748-274B,U+274D,U+274F-2752,U+2756,U+2758-2762,U+2768-2794,U+2798-27A0,U+27A2-27AF,U+27B1-27BE,U+27C0-2933,U+2936-2B04,U+2B08-2B1A,U+2B1D-2B4F,U+2B51-2B54,U+2B56-302F,U+3031-303C,U+303E-3296,U+3298,U+329A-FE0E,U+FE10-FEFE,U+FF00-FFFC,U+FFFE,U+FFFF;
  }
  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Regular'),
      local('Montserrat-Regular'),
      url(${montserratRegularWoff2Subset}) format('woff2');
    unicode-range: U+0-FF,U+131,U+152,U+153,U+2BB,U+2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191-2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: italic;
    font-display: swap;
    src: local('Montserrat Italic'),
      local('Montserrat-Italic'),
      url(${montserratItalicWoff2}) format('woff2');
    unicode-range: U+100-130,U+132-151,U+154-2BA,U+2BD-2C5,U+2C7-2D9,U+2DB,U+2DD-1FFF,U+2070-2073,U+2075-20AB,U+20AD-20E2,U+20E4-2121,U+2123-2138,U+213A-2190,U+219A-21A8,U+21AB-2211,U+2213,U+2214,U+2216-2319,U+231C-2327,U+2329-2387,U+2389-23CE,U+23D0-23E8,U+23F4-23F7,U+23FB-24C1,U+24C3-25A9,U+25AC-25B5,U+25B7-25BF,U+25C1-25FA,U+25FF,U+2606,U+2613,U+2686-268F,U+2706,U+2707,U+2713,U+2715,U+2717-271C,U+271E-2720,U+2722-2727,U+2729-2732,U+2735-2743,U+2745,U+2746,U+2748-274B,U+274D,U+274F-2752,U+2756,U+2758-2762,U+2768-2794,U+2798-27A0,U+27A2-27AF,U+27B1-27BE,U+27C0-2933,U+2936-2B04,U+2B08-2B1A,U+2B1D-2B4F,U+2B51-2B54,U+2B56-302F,U+3031-303C,U+303E-3296,U+3298,U+329A-FE0E,U+FE10-FEFE,U+FF00-FFFC,U+FFFE,U+FFFF;
  }
  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: italic;
    font-display: swap;
    src: local('Montserrat Italic'),
      local('Montserrat-Italic'),
      url(${montserratItalicWoff2Subset}) format('woff2');
    unicode-range: U+0-FF,U+131,U+152,U+153,U+2BB,U+2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191-2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
  @font-face {
    font-family: 'Montserrat';
    font-weight: bold;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Bold'),
      local('Montserrat-Bold'),
      url(${montserratBoldWoff2}) format('woff2');
    unicode-range: U+100-130,U+132-151,U+154-2BA,U+2BD-2C5,U+2C7-2D9,U+2DB,U+2DD-1FFF,U+2070-2073,U+2075-20AB,U+20AD-20E2,U+20E4-2121,U+2123-2138,U+213A-2190,U+219A-21A8,U+21AB-2211,U+2213,U+2214,U+2216-2319,U+231C-2327,U+2329-2387,U+2389-23CE,U+23D0-23E8,U+23F4-23F7,U+23FB-24C1,U+24C3-25A9,U+25AC-25B5,U+25B7-25BF,U+25C1-25FA,U+25FF,U+2606,U+2613,U+2686-268F,U+2706,U+2707,U+2713,U+2715,U+2717-271C,U+271E-2720,U+2722-2727,U+2729-2732,U+2735-2743,U+2745,U+2746,U+2748-274B,U+274D,U+274F-2752,U+2756,U+2758-2762,U+2768-2794,U+2798-27A0,U+27A2-27AF,U+27B1-27BE,U+27C0-2933,U+2936-2B04,U+2B08-2B1A,U+2B1D-2B4F,U+2B51-2B54,U+2B56-302F,U+3031-303C,U+303E-3296,U+3298,U+329A-FE0E,U+FE10-FEFE,U+FF00-FFFC,U+FFFE,U+FFFF;
  }
  @font-face {
    font-family: 'Montserrat';
    font-weight: bold;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Bold'),
      local('Montserrat-Bold'),
      url(${montserratBoldWoff2Subset}) format('woff2');
    unicode-range: U+0-FF,U+131,U+152,U+153,U+2BB,U+2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191-2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
  @font-face {
    font-family: 'Montserrat';
    font-weight: 900;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Black'),
      local('Montserrat-Black'),
      url(${montserratBlackWoff2}) format('woff2');
    unicode-range: U+100-130,U+132-151,U+154-2BA,U+2BD-2C5,U+2C7-2D9,U+2DB,U+2DD-1FFF,U+2070-2073,U+2075-20AB,U+20AD-20E2,U+20E4-2121,U+2123-2138,U+213A-2190,U+219A-21A8,U+21AB-2211,U+2213,U+2214,U+2216-2319,U+231C-2327,U+2329-2387,U+2389-23CE,U+23D0-23E8,U+23F4-23F7,U+23FB-24C1,U+24C3-25A9,U+25AC-25B5,U+25B7-25BF,U+25C1-25FA,U+25FF,U+2606,U+2613,U+2686-268F,U+2706,U+2707,U+2713,U+2715,U+2717-271C,U+271E-2720,U+2722-2727,U+2729-2732,U+2735-2743,U+2745,U+2746,U+2748-274B,U+274D,U+274F-2752,U+2756,U+2758-2762,U+2768-2794,U+2798-27A0,U+27A2-27AF,U+27B1-27BE,U+27C0-2933,U+2936-2B04,U+2B08-2B1A,U+2B1D-2B4F,U+2B51-2B54,U+2B56-302F,U+3031-303C,U+303E-3296,U+3298,U+329A-FE0E,U+FE10-FEFE,U+FF00-FFFC,U+FFFE,U+FFFF;
  }
  @font-face {
    font-family: 'Montserrat';
    font-weight: 900;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Black'),
      local('Montserrat-Black'),
      url(${montserratBlackWoff2Subset}) format('woff2');
    unicode-range: U+0-FF,U+131,U+152,U+153,U+2BB,U+2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191-2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
`;
