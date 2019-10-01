import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import FrontPagePanels from "../components/FrontPagePanels";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import SEO from "../components/SEO";
import PageContainer from "../components/PageContainer";

import typography from "../utils/typography";
const { rhythm } = typography;

const MaintainDigitransit = styled.div`
  & img {
    height: 400px;
    float: right;
  }

  & h3 {
    clear: right;
  }

  @media (max-width: 600px) {
    & img {
      height: 200px;
      float: right;
    }
  }
`

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
            <MaintainDigitransit>
              <Markdown {...props} />
            </MaintainDigitransit>
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
