import firaCodeRegularWoff from '../../styles/webfonts/FiraCode-Regular.woff';
import firaCodeRegularWoff2 from '../../styles/webfonts/FiraCode-Regular.woff2';
import montserratBlackWoff from '../../styles/webfonts/Montserrat-Black.woff';
import montserratBlackWoff2 from '../../styles/webfonts/Montserrat-Black.woff2';
import montserratBoldWoff from '../../styles/webfonts/Montserrat-Bold.woff';
import montserratBoldWoff2 from '../../styles/webfonts/Montserrat-Bold.woff2';
import montserratRegularWoff from '../../styles/webfonts/Montserrat-Regular.woff';
import montserratRegularWoff2 from '../../styles/webfonts/Montserrat-Regular.woff2';
import merriweatherBoldWoff from '../../styles/webfonts/merriweather-v19-cyrillic_latin-700.woff';
import merriweatherBoldWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-700.woff2';
import merriweatherBoldItalicWoff from '../../styles/webfonts/merriweather-v19-cyrillic_latin-700italic.woff';
import merriweatherBoldItalicWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-700italic.woff2';
import merriweatherItalicWoff from '../../styles/webfonts/merriweather-v19-cyrillic_latin-italic.woff';
import merriweatherItalicWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-italic.woff2';
import merriweatherRegularWoff from '../../styles/webfonts/merriweather-v19-cyrillic_latin-regular.woff';
import merriweatherRegularWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-regular.woff2';

const getGlobalFonts = () => `
  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
    src: local('Montserrat Regular'),
      local('Montserrat-Regular'),
      url(${montserratRegularWoff2}) format('woff2'),
      url(${montserratRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
    src: local('Montserrat Bold'),
      local('Montserrat-Bold'),
      url(${montserratBoldWoff2}) format('woff2'),
      url(${montserratBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 900;
    font-style: normal;
    font-display: fallback;
    src: local('Montserrat Black'),
      local('Montserrat-Black'),
      url(${montserratBlackWoff2}) format('woff2'),
      url(${montserratBlackWoff}) format('woff');
  }
  
  @font-face {
    font-family: 'Merriweather';
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
    src: local('Merriweather Regular'),
      local('Merriweather-Regular'),
      url(${merriweatherRegularWoff2}) format('woff2'),
      url(${merriweatherRegularWoff}) format('woff');
  }
  
  @font-face {
    font-family: 'Merriweather';
    font-weight: 400;
    font-style: italic;
    font-display: fallback;
    src: local('Merriweather Italic'),
      local('Merriweather-Italic'),
      url(${merriweatherItalicWoff2}) format('woff2'),
      url(${merriweatherItalicWoff}) format('woff');
  }

  @font-face {
    font-family: 'Merriweather';
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
    src: local('Merriweather Bold'),
      local('Merriweather-Bold'),
      url(${merriweatherBoldWoff2}) format('woff2'),
      url(${merriweatherBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'Merriweather';
    font-weight: 700;
    font-style: italic;
    font-display: fallback;
    src: local('Merriweather Bold Italic'),
      local('Merriweather-BoldItalic'),
      url(${merriweatherBoldItalicWoff2}) format('woff2'),
      url(${merriweatherBoldItalicWoff}) format('woff');
  }

  @font-face {
    font-family: 'Fira Code';
    font-weight: 400;
    font-style: normal;
    font-display: optional;
    src: local('Fira Code Regular'),
      local('FiraCode-Regular'),
      url(${firaCodeRegularWoff2}) format('woff2'),
      url(${firaCodeRegularWoff}) format('woff');
  }
`;

export default getGlobalFonts;
