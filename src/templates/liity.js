import React from "react";
import { graphql } from "gatsby";
import FrontPagePanels from "../components/FrontPagePanels";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import SEO from "../components/SEO";
import PageContainer from "../components/PageContainer";

import typography from "../utils/typography";
const { rhythm, fontSizeToPx } = typography;

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
          <PageContainer>
            <div className="join-to-digitransit-content">
              <Markdown {...props} />
            </div>
          </PageContainer>
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
