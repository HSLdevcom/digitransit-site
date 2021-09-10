import React from "react";
import { graphql } from "gatsby";

import typography from "../utils/typography";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import SEO from "../components/SEO";
import PageContainer from "../components/PageContainer";

const { rhythm } = typography;

export default props => {
  return (
    <>
      <SEO
        pageTitle={props.data.markdownRemark.frontmatter.title}
        pageDescription={props.data.markdownRemark.excerpt}
        pagePath={props.data.markdownRemark.fields.slug}
      />
      <Layout slug={props.data.markdownRemark.fields.slug}>
        <div style={{ height: `calc(${rhythm(1.5)} + 23px)` }} />
        <PageContainer>
          <Markdown {...props} />
        </PageContainer>
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
      excerpt(pruneLength: 200)
    }
  }
`;
