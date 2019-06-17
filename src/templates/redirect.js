import React from "react";
import styled from "styled-components";
import { Link, navigate, graphql } from "gatsby";

import typography from "../utils/typography";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PageContainer from "../components/PageContainer";

const { rhythm } = typography;

export default class Redirect extends React.Component {
  componentDidMount() {
    navigate(this.props.data.markdownRemark.frontmatter.redirect, { replace: true })
  }

  render() {
    const { props } = this

    return (<>
      <SEO
        pageTitle={props.data.markdownRemark.frontmatter.title}
        //Set canonical URL to redirect destination for better SEO
        pagePath={props.data.markdownRemark.frontmatter.redirect}
      />
      <Layout slug={props.data.markdownRemark.fields.slug}>
        <div style={{ height: `calc(${rhythm(1.5)} + 23px)` }} />
        <PageContainer>
          This page has been moved to 
          {" "}
          <Link
            //Display link to redirect destination, incase user has JavaScript disabled
            to={props.data.markdownRemark.frontmatter.redirect}
            replace>
              <code>{ props.data.markdownRemark.frontmatter.redirect }</code>
          </Link>
        </PageContainer>
      </Layout>
    </>);
  }
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        redirect
      }
    }
  }
`;
