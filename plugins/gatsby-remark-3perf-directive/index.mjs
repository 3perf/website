import remarkDirective from 'remark-directive';

// This plugin just wraps the remark-directive plugin in a way that Gatsby can use.
// Actual directives are defined and processed in gatsby-remark-3perf-transformer.
export const setParserPlugins = () => {
  return [remarkDirective];
};
