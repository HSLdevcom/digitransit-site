import React from "react";
import { graphql } from "gatsby";

import typography from "../utils/typography";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Seo from "../components/SEO";
import PageContainer from "../components/PageContainer";

const { rhythm } = typography;

const Page = props => {
  return (
    <>
      <Layout slug={props.data.markdownRemark.fields.slug}>
        <div style={{ height: `calc(${rhythm(1.5)} + 23px)` }} />
        <PageContainer>
          <Markdown {...props} />
        </PageContainer>
      </Layout>
    </>
  );
};

export const Head = ({ data }) => (
  <Seo
    pageTitle={data.markdownRemark.frontmatter.title}
    pageDescription={data.markdownRemark.excerpt}
    pagePath={data.markdownRemark.fields.slug}
  />
);

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

export default Page;
