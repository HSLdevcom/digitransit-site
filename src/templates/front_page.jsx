import React from "react";
import { graphql } from "gatsby";

import typography from "../utils/typography";
import { FrontPageHeader, FrontPagePanels } from "../components/components";

import Layout from "../components/layout";
import Markdown from "../components/markdown";
import Container from "../components/Container";
import SEO from "../components/SEO";

const { rhythm, fontSizeToPx } = typography;

const prefixer = require("react-style-normalizer");

export default props => {
  var urlPrefix = "";
  return (
    <>
      <SEO
        pageTitle={props.data.markdownRemark.frontmatter.title}
        pagePath={props.data.markdownRemark.fields.slug}
      />
      <Layout slug={props.data.markdownRemark.fields.slug}>
        {props.data.markdownRemark.frontmatter.isFront ||
        props.page.path == `${urlPrefix}/` ? (
          <FrontPageHeader {...props.data.markdownRemark.frontmatter} />
        ) : (
          <div style={{ height: `calc(${rhythm(1.5)} + 23px)` }} />
        )}
        <Container
          style={prefixer({
            maxWidth: 1250,
            width: "100%",
            padding: `${rhythm(1)} ${rhythm(1 / 2)}`,
            flex: "1"
          })}
        >
          <Markdown {...props} />
        </Container>
        {props.data.markdownRemark.frontmatter.isFront ||
        props.page.path == `${urlPrefix}/` ? (
          <FrontPagePanels {...props.data.markdownRemark.frontmatter} />
        ) : null}
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        headerText
        isFront
        panels {
          title
          body
          links {
            title
            url
          }
          image {
            publicURL
          }
          id
          background
          swapped
        }
      }
      html
    }
  }
`;
