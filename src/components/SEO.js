import React from "react";
import { useStaticQuery, graphql } from "gatsby";

// Rendered from the Gatsby Head API of each page template
const DEFAULT_DESCRIPTIONS = {
  fi: "Uuden ajan reittioppaan käyttöliittymät ja rajapinnat.",
  en: "User interfaces and APIs of the new generation journey planner.",
};

const SHARE_IMAGE_ALT = {
  fi: "Digitransit – uuden ajan reittiopas",
  en: "Digitransit – the new generation journey planner",
};

// Excerpts may start with the page heading and may contain line breaks.
// The heading is only dropped when a new sentence follows it, so that
// text like "Routing API provides..." is kept intact.
const cleanDescription = (text, pageTitle) => {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (pageTitle && collapsed.startsWith(`${pageTitle} `)) {
    const rest = collapsed.slice(pageTitle.length).trim();
    if (
      rest[0] &&
      rest[0] === rest[0].toUpperCase() &&
      rest[0] !== rest[0].toLowerCase()
    ) {
      return rest;
    }
  }
  return collapsed;
};

const Seo = ({ pageTitle, pageDescription, pagePath }) => {
  const {
    site: { siteMetadata: metadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          siteTitle
        }
      }
    }
  `);

  const title = pageTitle
    ? `${pageTitle} | ${metadata.siteTitle}`
    : metadata.siteTitle;

  const canonicalUrl = metadata.siteUrl + pagePath;

  const lang = pagePath.startsWith("/en/") ? "en" : "fi";
  const language = lang === "en" ? "en_US" : "fi_FI";

  const description =
    (pageDescription && cleanDescription(pageDescription, pageTitle)) ||
    DEFAULT_DESCRIPTIONS[lang];

  const shareImageUrl = `${metadata.siteUrl}/share-image.png`;

  return (
    <>
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={metadata.siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={shareImageUrl} />
      <meta property="og:image:width" content="1440" />
      <meta property="og:image:height" content="720" />
      <meta property="og:image:alt" content={SHARE_IMAGE_ALT[lang]} />
      <meta property="og:locale" content={language} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@digitransit" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImageUrl} />
      <meta name="twitter:image:alt" content={SHARE_IMAGE_ALT[lang]} />
      <meta property="fb:admins" content="100006467997249" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </>
  );
};

export default Seo;
