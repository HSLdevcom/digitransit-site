import React from "react"
import styled from "styled-components"

import typography from "../utils/typography"

const { rhythm } = typography

const TOCContainer = styled.div`
    display: inline-block;
    border: 1px solid lightgrey;
    background: #f9f9f9;
    padding: ${rhythm(1 / 4)};
    margin-bottom: ${rhythm(1)};
`

const TOCHeader = styled.span`
    display: block;
    text-align: center;
    margin-bottom: 0;
`

const TOC = styled.div`
    display: ${props => props.collaped ? 'block' : 'none'};
    
    & ul {
        padding-top: 0;
        padding-bottom: 0;
        margin-top: 0;
        margin-bottom: 0;
    }
    & p {
        margin-top: 0;
        margin-bottom: 0;
    }
    & > ul li {
        margin-top: 1px;
        margin-bottom: 1px;
        font-size: 12px;
    }
`

export default class TableOfContents extends React.Component {
    constructor(props) {
      super(props);
      this.state = { collapsed: false };
  
      this.update = this.update.bind(this);
    }
  
    update(e) {
      e.preventDefault();
      this.setState(state => {
        return { collapsed: !state.collapsed };
      });
    }
  
    render() {
      if (
        !this.props.data.markdownRemark.frontmatter.toc ||
        !this.props.data.markdownRemark.tableOfContents
      ) {
        return null;
      }
  
      return (
        <TOCContainer>
          <TOCHeader>
            <b>Table of contents</b>
            {" ["}
            <a href="javascript:;" onClick={this.update}>
              {this.state.collapsed ? "hide" : "show"}
            </a>
            {"]"}
          </TOCHeader>
          <TOC
            collaped={this.state.collapsed}
            dangerouslySetInnerHTML={{
              __html: this.props.data.markdownRemark.tableOfContents
            }}
          />
        </TOCContainer>
      );
    }
  }
  