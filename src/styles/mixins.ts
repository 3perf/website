import { css } from 'styled-components';

// This mixin helps to write this code:
// :is(.a, .b, .c) + :is(.a, .b, .c) {
//   margin-top: 10px;
// }
// with proper fallbacks for browsers where `:is` is not supported.
//
// Usage example:
// const Button = styled.button`
//   ${anyPlusAny('.a', '.b', '.c')`
//     margin-top: 10px;
//   `}
// `;
export const anyPlusAny =
  (...selectors: string[]) =>
  (arg: any, ...otherArgs: any[]) => {
    const selectorString = selectors.join(',');

    // In CSS, the whole selector is invalid even if a part of it is invalid: https://css-tricks.com/one-invalid-pseudo-selector-equals-an-entire-ignored-selector/
    // Because not all browsers support :-webkit-any, :-moz-any, :matches, and :is,
    // we can’t join them in a single selector – and have to write them as 4 separate ones
    return css`
      *:-webkit-any(${selectorString}) + *:-webkit-any(${selectorString}) {
        ${css(arg, ...otherArgs)}
      }

      *:-moz-any(${selectorString}) + *:-moz-any(${selectorString}) {
        ${css(arg, ...otherArgs)}
      }

      *:matches(${selectorString}) + *:matches(${selectorString}) {
        ${css(arg, ...otherArgs)}
      }

      *:is(${selectorString}) + *:is(${selectorString}) {
        ${css(arg, ...otherArgs)}
      }
    `;
  };
