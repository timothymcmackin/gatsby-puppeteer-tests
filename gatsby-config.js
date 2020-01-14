const remark = require('remark');
const stripMarkdown = require('strip-markdown');

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
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // search with elasticlunr
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`, `excerpt`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            excerpt: node => {
              const text = remark()
                .use(stripMarkdown)
                .processSync(node.rawMarkdownBody);

              return String(text);
            },
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            path: node => node.frontmatter.path,
          },
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
