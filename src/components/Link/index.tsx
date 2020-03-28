import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link';
import React from 'react';

const Link = ({ to, ...otherProps }: GatsbyLinkProps<{}>) => {
  if (to.startsWith('/')) {
    return <GatsbyLink to={to} {...otherProps as any} />;
  } else {
    return <a href={to} {...otherProps} />;
  }
};

export default Link;
