import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";

import FrontPagePanels from "../components/FrontPagePanels";
import Layout from "../components/Layout";
import Markdown from "../components/Markdown";
import Seo from "../components/SEO";
import PageContainer from "../components/PageContainer";

import typography from "../utils/typography";
const { rhythm } = typography;

const JoinDigitransit = styled.div`
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

const JoinPage = props => {
  return (
    <>
      <Layout slug={props.data.markdownRemark.fields.slug}>
        <div>
          <div style={{ height: `calc(${rhythm(1.5)} + 23px)` }} />
          <FrontPagePanels {...props.data.markdownRemark.frontmatter} />
          <PageContainer>
            <JoinDigitransit>
              <Markdown {...props} />
            </JoinDigitransit>
          </PageContainer>
        </div>
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

export default JoinPage;
