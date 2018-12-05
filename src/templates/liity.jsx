import React from 'react';
import { graphql } from 'gatsby' 
import { Container, Grid, Breakpoint, Span } from '@mjaakko/react-responsive-grid';
import { FrontPagePanels } from '../components/components'
import Layout from '../components/layout'
import Markdown from '../components/markdown'

import typography from '../utils/typography';
const { rhythm, fontSizeToPx } = typography;

const prefixer = require('react-style-normalizer');

export default (props) => {
  return (<Layout slug={props.data.markdownRemark.fields.slug}>
            <div>
              <div style={{height: `calc(${rhythm(1.5)} + 23px)`}}/>
              <FrontPagePanels {...props.data.markdownRemark.frontmatter}/>
              <Container
                 style={prefixer({
                   maxWidth: 1250,
                   width: "100%",
                   padding: `${rhythm(1)} ${rhythm(1/2)}`,
                   flex: "1",
                 })}
              >
                <div className="join-to-digitransit-content">
                   <Markdown {...props} />
                </div>
              </Container>
            </div>
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
  }
}
`
