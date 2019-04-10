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
  ReplitEmbed,
  TableOfContents
} from "../components/components";
import Layout from "../components/layout";
import Markdown from "../components/markdown";
import SEO from "../components/SEO";

var typography = new Typography();
var rhythm = typography.rhythm,
  fontSizeToMS = typography.fontSizeToMS;

const prefixer = require("react-style-normalizer");

const buildPageGraph = pages => {
  const pagesAsMap = new Map();

  const forDevelopers = pages.find(
    ({ node }) => node.fields.slug === "/en/developers/"
  ).node;

  pagesAsMap.set("/", {
    title: forDevelopers.frontmatter.title,
    path: forDevelopers.fields.slug,
    childPages: new Map()
  });

  pages.forEach(({ node }) => {
    const slugParts = node.fields.slug
      .split("/")
      .filter(slugPart => !!slugPart)
      .slice(2); //First two slug parts are 'en' and 'developers'

    let currentLevel = pagesAsMap.get("/").childPages;

    for (let i = 0; i < slugParts.length; i++) {
      const slugPart = slugParts[i];
      if (!currentLevel.has(slugPart) || !currentLevel.get(slugPart).path) {
        currentLevel.set(slugPart, {
          path: i === slugParts.length - 1 ? node.fields.slug : null,
          title: i === slugParts.length - 1 ? node.frontmatter.title : null,
          order:
            i === slugParts.length - 1
              ? node.frontmatter.order
                ? node.frontmatter.order
                : 0
              : null,
          childPages: currentLevel.has(slugPart)
            ? currentLevel.get(slugPart).childPages
            : new Map()
        });
      }

      currentLevel = currentLevel.get(slugPart).childPages;
    }
  });

  return pagesAsMap;
};

const sortPages = (a, b) => {
  const byOrderValue = a.order - b.order;

  return byOrderValue === 0
    ? a.path.localeCompare(b.path, "en-US")
    : byOrderValue;
};

const ChildPageList = ({ pages, currentPage }) => {
  if (pages.length === 0) {
    return null;
  }

  const pageLinks = [];
  pages.forEach(page => {
    pageLinks.push({
      order: page.order,
      path: page.path,
      link: (
        <li
          key={page.path}
          style={{
            marginBottom: rhythm(1 / 2)
          }}
        >
          <Link
            to={page.path}
            style={{
              textDecoration: "none"
            }}
          >
            {currentPage === page.path ? (
              <strong>{page.title}</strong>
            ) : (
              page.title
            )}
          </Link>
          <ChildPageList pages={page.childPages} currentPage={currentPage} />
        </li>
      )
    });
  });
  pageLinks.sort(sortPages);

  return (
    <ul style={{ listStyle: "none" }}>
      {pageLinks.map(pageLink => pageLink.link)}
    </ul>
  );
};

const buildOptions = pages => {
  const options = [];
  pages.forEach(page => {
    options.push({
      path: page.path,
      order: page.order,
      title: `${"-".repeat(page.path.split("/").length - 3)} ${page.title}`,
      childOptions: buildOptions(page.childPages)
    });
  });
  options.sort(sortPages);
  return options;
};

const mapOptions = options => {
  let optionElements = [];
  options.forEach(option => {
    optionElements.push(
      <option key={option.path} value={option.path}>
        {option.title}
      </option>
    );
    optionElements = optionElements.concat(mapOptions(option.childOptions));
  });
  return optionElements;
};

const ChildPageOptions = ({ pages }) => {
  return mapOptions(buildOptions(pages));
};

export default props => {
  const currentPage = props.data.markdownRemark.fields.slug;

  const pageGraph = buildPageGraph(props.data.childPages.edges, currentPage);

  return (
    <>
      <SEO
        pageTitle={props.data.markdownRemark.frontmatter.title}
        pageDescription={props.data.markdownRemark.excerpt}
        pagePath={props.data.markdownRemark.fields.slug}
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
          <div>
            <Breakpoint minWidth={700}>
              <div>
                <div
                  style={{
                    overflowY: "auto",
                    paddingRight: `calc(${rhythm(1 / 2)} - 1px)`,
                    paddingTop: rhythm(1 / 2),
                    position: "absolute",
                    width: `calc(${rhythm(13)} - 1px)`,
                    borderRight: "1px solid lightgrey"
                  }}
                >
                  <ChildPageList pages={pageGraph} currentPage={currentPage} />
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
                  <TableOfContents {...props} />
                  <Markdown {...props} />
                  <Assets {...props.data.markdownRemark.frontmatter} />
                  <TechnologiesInfo
                    {...props.data.markdownRemark.frontmatter}
                  />
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
                <ChildPageOptions pages={pageGraph} />
              </select>
              <br />
              <br />
              <ArchitectureHeader
                slug={props.data.markdownRemark.fields.slug}
                {...props.data.markdownRemark.frontmatter}
              />
              <TableOfContents {...props} />
              <Markdown {...props} />
              <Assets {...props.data.markdownRemark.frontmatter} />
              <TechnologiesInfo {...props.data.markdownRemark.frontmatter} />
              <DockerInfo {...props.data.markdownRemark.frontmatter} />
              <ReplitEmbed {...props.data.markdownRemark.frontmatter} />
            </Breakpoint>
          </div>
        </Container>
      </Layout>
    </>
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
        toc
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
      tableOfContents
      excerpt(pruneLength: 200)
    }
  }
`;
