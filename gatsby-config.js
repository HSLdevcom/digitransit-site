module.exports = {
  siteMetadata: {
    siteTitle: 'Digitransit',
    headerColor: '#39b6db',
    ghPagesURLPrefix: '/',
    i18n: {
      fi: {
        users: 'Käyttäjille',
        developers: 'Kehittäjille',
        municipalities: 'Kunnille',
      },
      en: {
        users: 'for Users',
        developers: 'for Developers',
        municipalities: 'for Municipalities',
      }
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
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
              maxWidth: 1250,
            },
          },
          { 
            resolve: `gatsby-remark-prismjs`,
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
}
