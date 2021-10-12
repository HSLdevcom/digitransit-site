import React from "react";
import { graphql } from "gatsby";

import typography from "../utils/typography";
import FrontPageHeader from "../components/FrontPageHeader";
import FrontPagePanels from "../components/FrontPagePanels";

import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import PageContainer from "../components/PageContainer";
import SEO from "../components/SEO";

const { rhythm } = typography;

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
        <PageContainer>
          <Markdown {...props} />
        </PageContainer>
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
        lang
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
    }
  }
`;
