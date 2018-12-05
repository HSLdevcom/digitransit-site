import React from 'react';
import { Container, Grid, Breakpoint, Span } from '@mjaakko/react-responsive-grid';
import { graphql } from 'gatsby'

import typography from '../utils/typography';

import Layout from '../components/layout';
import Markdown from '../components/markdown';

const { rhythm, fontSizeToPx } = typography;

const prefixer = require('react-style-normalizer');

export default (props) => {
  return (<Layout slug={props.data.markdownRemark.fields.slug}>
    <div style={{height: `calc(${rhythm(1.5)} + 23px)`}}/>
    <Container
      style={prefixer({
        maxWidth: 1250,
        width: "100%",
        padding: `${rhythm(1)} ${rhythm(1/2)}`,
        flex: "1",
      })}
    >
      <Markdown {...props} />
    </Container>
 </Layout>);
}

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
`
