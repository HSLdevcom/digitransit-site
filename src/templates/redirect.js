import React from "react";
import {
  Container
} from "@mjaakko/react-responsive-grid";
import { Link, navigate, graphql } from "gatsby";

import typography from "../utils/typography";

import Layout from "../components/layout";
import SEO from "../components/SEO";

const { rhythm } = typography;

const prefixer = require("react-style-normalizer");

export default class Redirect extends React.Component {
  componentDidMount() {
    navigate(this.props.data.markdownRemark.frontmatter.redirect)
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
        <Container
          style={prefixer({
            maxWidth: 1250,
            width: "100%",
            padding: `${rhythm(1)} ${rhythm(1 / 2)}`,
            flex: "1"
          })}
          >
          This page has been moved to 
          {" "}
          <Link
            //Display link to redirect destination, incase user has JavaScript disabled
            to={props.data.markdownRemark.frontmatter.redirect}>
              <code>{ props.data.markdownRemark.frontmatter.redirect }</code>
          </Link>
        </Container>
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
