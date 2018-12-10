import React from "react";
import { Link, navigate, graphql } from "gatsby";
import {
  Container,
  Grid,
  Breakpoint,
  Span
} from "@mjaakko/react-responsive-grid";
import Typography from "typography";
import {
  DockerInfo,
  TechnologiesInfo,
  Assets,
  ArchitectureHeader,
  ReplitEmbed
} from "../components/components";
import Layout from "../components/layout";
import Markdown from "../components/markdown";

var typography = new Typography();
var rhythm = typography.rhythm,
  fontSizeToMS = typography.fontSizeToMS;

const prefixer = require("react-style-normalizer");

var _ = require("lodash");
const sortBy = _.sortBy;

export default props => {
  var childPages, docOptions, docPages;
  //rhythm = this.props.typography.rhythm;
  childPages = props.data.childPages.edges.map(function(edge) {
    var child = edge.node;
    return {
      title: child.frontmatter.title,
      level: child.fields.slug.split("/").length - 3,
      path: child.fields.slug,
      order: child.frontmatter.order
    };
  });
  childPages = sortBy(childPages, function(child) {
    return child.path;
  });
  docOptions = childPages.map(function(child) {
    return React.createElement(
      "option",
      {
        key: child.path,
        value: child.path
      },
      "-".repeat(child.level) + " " + child.title
    );
  });
  docPages = childPages.map(function(child) {
    var isActive = child.path === props.data.markdownRemark.fields.slug;
    return (
      <li
        key={child.path}
        style={{
          marginBottom: rhythm(1 / 2),
          marginLeft: rhythm(child.level)
        }}
      >
        <Link
          to={child.path}
          style={{
            textDecoration: "none"
          }}
        >
          {isActive ? <strong>{child.title}</strong> : child.title}
        </Link>
      </li>
    );
  });

  return (
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
        <div>
          <Breakpoint minWidth={700}>
            <div>
              <div
                style={{
                  overflowY: "auto",
                  paddingRight: `calc(${rhythm(1 / 2)} - 1px)`,
                  position: "absolute",
                  width: `calc(${rhythm(13)} - 1px)`,
                  borderRight: "1px solid lightgrey"
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    marginLeft: 0,
                    marginTop: rhythm(1 / 2)
                  }}
                >
                  {docPages}
                </ul>
              </div>
              <div
                style={{
                  padding: `0 ${rhythm(1)}`,
                  paddingLeft: `calc(${rhythm(13)} + ${rhythm(1)})`,
                  minHeight: "1800px"
                }}
              >
                <h1>{props.data.markdownRemark.frontmatter.title}</h1>
                <ArchitectureHeader
                  slug={props.data.markdownRemark.fields.slug}
                  {...props.data.markdownRemark.frontmatter}
                />
                <Markdown {...props} />
                <Assets {...props.data.markdownRemark.frontmatter} />
                <TechnologiesInfo {...props.data.markdownRemark.frontmatter} />
                <DockerInfo {...props.data.markdownRemark.frontmatter} />
                <ReplitEmbed {...props.data.markdownRemark.frontmatter} />
              </div>
            </div>
          </Breakpoint>
          <Breakpoint maxWidth={700}>
            <strong>Topics:</strong>{" "}
            <select
              defaultValue={props.data.markdownRemark.fields.slug}
              onChange={e => navigate(e.target.value)}
            >
              {docOptions}
            </select>
            <br />
            <br />
            <ArchitectureHeader
              slug={props.data.markdownRemark.fields.slug}
              {...props.data.markdownRemark.frontmatter}
            />
            <Markdown {...props} />
            <Assets {...props.data.markdownRemark.frontmatter} />
            <TechnologiesInfo {...props.data.markdownRemark.frontmatter} />
            <DockerInfo {...props.data.markdownRemark.frontmatter} />
            <ReplitEmbed {...props.data.markdownRemark.frontmatter} />
          </Breakpoint>
        </div>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    childPages: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/en/developers/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            order
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        headerText
        redirect
        description {
          info
          architecture
        }
        assets {
          title
          url
        }
        technologies {
          title
          url
        }
        docker {
          dockerfile
          imageName
          buildScript
          runContainer
          accessContainer
          travisBuild
        }
        replit {
          title
          note
          embeds {
            title
            url
            height
            description
          }
        }
      }
      html
    }
  }
`;
