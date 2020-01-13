module.exports = {
  siteMetadata: {
    title: `gatsby-puppeteer`,
    description: `Example of using Puppeteer to test Gatsby sites`,
    author: `@timothymcmackin`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      // Retrieve Markdown files from the content/ folder
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-transformer-remark"
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
