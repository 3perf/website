import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: {
        title: string;
        description: string;
        twitterId: string;
        siteUrl: string;
        logoUrl: string;
      };
    };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterId
          siteUrl
          logoUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
