import firaCodeRegularWoff2 from '../../styles/webfonts/FiraCode-Regular.woff2';
import montserratBlackWoff2 from '../../styles/webfonts/Montserrat-Black.woff2';
import montserratBoldWoff2 from '../../styles/webfonts/Montserrat-Bold.woff2';
import montserratItalicWoff2 from '../../styles/webfonts/Montserrat-Italic.woff2';
import montserratRegularWoff2 from '../../styles/webfonts/Montserrat-Regular.woff2';
import merriweatherBoldWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-700.woff2';
import merriweatherBoldItalicWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-700italic.woff2';
import merriweatherItalicWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-italic.woff2';
import merriweatherRegularWoff2 from '../../styles/webfonts/merriweather-v19-cyrillic_latin-regular.woff2';

const getGlobalFonts = () => `
  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Regular'),
      local('Montserrat-Regular'),
      url(${montserratRegularWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    font-style: italic;
    font-display: swap;
    src: local('Montserrat Italic'),
      local('Montserrat-Italic'),
      url(${montserratItalicWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Bold'),
      local('Montserrat-Bold'),
      url(${montserratBoldWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 900;
    font-style: normal;
    font-display: swap;
    src: local('Montserrat Black'),
      local('Montserrat-Black'),
      url(${montserratBlackWoff2}) format('woff2');
  }
  
  @font-face {
    font-family: 'Merriweather';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: local('Merriweather Regular'),
      local('Merriweather-Regular'),
      url(${merriweatherRegularWoff2}) format('woff2');
  }
  
  @font-face {
    font-family: 'Merriweather';
    font-weight: 400;
    font-style: italic;
    font-display: swap;
    src: local('Merriweather Italic'),
      local('Merriweather-Italic'),
      url(${merriweatherItalicWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Merriweather';
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: local('Merriweather Bold'),
      local('Merriweather-Bold'),
      url(${merriweatherBoldWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Merriweather';
    font-weight: 700;
    font-style: italic;
    font-display: swap;
    src: local('Merriweather Bold Italic'),
      local('Merriweather-BoldItalic'),
      url(${merriweatherBoldItalicWoff2}) format('woff2');
  }

  @font-face {
    font-family: 'Fira Code';
    font-weight: 400;
    font-style: normal;
    font-display: optional;
    src: local('Fira Code Regular'),
      local('FiraCode-Regular'),
      url(${firaCodeRegularWoff2}) format('woff2');
  }
`;

export default getGlobalFonts;
