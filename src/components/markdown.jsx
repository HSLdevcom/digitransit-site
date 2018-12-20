import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Container, Grid, Breakpoint, Span } from '@mjaakko/react-responsive-grid';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import DocumentTitle from 'react-document-title';

import typography from '../utils/typography';

const { rhythm, fontSizeToPx } = typography;

const prefixer = require('react-style-normalizer');

export default (props) => {
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                siteTitle
              }
            }
          }`} render={data => (
                 <DocumentTitle title={props.data.markdownRemark.frontmatter.title ? `${props.data.markdownRemark.frontmatter.title} | ${data.site.siteMetadata.siteTitle}` : `${data.site.siteMetadata.siteTitle}`}>
                    <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
                 </DocumentTitle>)}
       />);
};

