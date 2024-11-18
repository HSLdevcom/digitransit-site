import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

export default ({ pageTitle, pageDescription, pagePath }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            siteTitle
          }
        }
      }
    `}
    render={({ site: { siteMetadata: metadata } }) => {
      const title = pageTitle
        ? `${pageTitle} | ${metadata.siteTitle}`
        : metadata.siteTitle;

      const canonicalUrl = metadata.siteUrl + pagePath;

      const description =
        pageDescription ||
        "Uuden ajan reittioppaan käyttöliittymät ja rajapinnat.";

      const shareImageUrl = "http://digitransit.fi/share-image.png";

      const language = pagePath.startsWith("/en/") ? "en_US" : "fi_FI";

      return (
        <Helmet>
          <html lang={language.substring(0, 2)} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={metadata.siteTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={shareImageUrl} />
          <meta property="og:locale" content={language} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@digitransit" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={shareImageUrl} />
          <meta property="fb:admins" content="100006467997249" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Helmet>
      );
    }}
  />
);
