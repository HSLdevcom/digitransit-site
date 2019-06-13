import React from "react";
import { graphql } from "gatsby";
import FrontPagePanels from "../components/FrontPagePanels";
import Layout from "../components/layout";
import Markdown from "../components/markdown";
import SEO from "../components/SEO";
import Container from "../components/Container";

import typography from "../utils/typography";
const { rhythm, fontSizeToPx } = typography;

const prefixer = require("react-style-normalizer");

export default props => {
  return (
    <>
      <SEO
        pageTitle={props.data.markdownRemark.frontmatter.title}
        pageDescription={props.data.markdownRemark.excerpt}
        pagePath={props.data.markdownRemark.fields.slug}
      />
      <Layout slug={props.data.markdownRemark.fields.slug}>
        <div>
          <div style={{ height: `calc(${rhythm(1.5)} + 23px)` }} />
          <FrontPagePanels {...props.data.markdownRemark.frontmatter} />
          <Container
            style={prefixer({
              maxWidth: 1250,
              width: "100%",
              padding: `${rhythm(1)} ${rhythm(1 / 2)}`,
              flex: "1"
            })}
          >
            <div className="join-to-digitransit-content">
              <Markdown {...props} />
            </div>
          </Container>
        </div>
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
          textColor
          swapped
        }
      }
      html
      excerpt(pruneLength: 200)
    }
  }
`;
