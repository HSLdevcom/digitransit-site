module.exports = {
  siteMetadata: {
    siteTitle: "Digitransit",
    headerColor: "#39b6db",
    siteUrl: "https://digitransit.fi",
    i18n: {
      fi: {
        users: "Käyttäjille",
        developers: "Kehittäjille",
        municipalities: "Kunnille",
        maintainers: "Ylläpitäjille"
      },
      en: {
        users: "for Users",
        developers: "for Developers",
        municipalities: "for Municipalities",
        maintainers: "for Maintainers"
      }
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1250
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers` //This plugin must be placed before 'gatsby-remark-prismjs' to avoid https://github.com/gatsbyjs/gatsby/issues/5764
          },
          {
            resolve: `gatsby-remark-prismjs`
          },
          {
            resolve: `gatsby-remark-copy-linked-files`
          },
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                "alert-success": {
                  classes: "alert alert-success",
                },
                "alert-info": {
                  classes: "alert alert-info",
                },
                "alert-warning": {
                  classes: "alert alert-warning",
                },
                "alert-danger": {
                  classes: "alert alert-danger",
                },
              },
            },
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`
  ]
};
