const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                isFront
              }
              fields  {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: getComponentForNode(node),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}

function getComponentForNode(node) {
  if (node.fields.slug.startsWith("/en/developers")) {
    return path.resolve(`./src/templates/developers.jsx`);
  } else if (node.fields.slug.startsWith("/liity")) {
    return path.resolve(`./src/templates/liity.jsx`);
  } else if (node.frontmatter.isFront) {
    return path.resolve(`./src/templates/front_page.jsx`);
  } else {
    return path.resolve(`./src/templates/page.jsx`);
  }
}
