/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const _ = require('lodash');

const pageTemplate = path.resolve('src/templates/page.js');
const tagTemplate = path.resolve('src/templates/tag.js');
const searchTemplate = path.resolve(`src/templates/search.js`);

exports.createPages = async function({ actions, graphql }) {

  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
              layout
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const tagList = buildTagList(result.data.allMarkdownRemark.edges);

    // Generate a page for each Markdown file based on the page component src/templates/page.js
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.path && node.frontmatter.layout &&
        node.frontmatter.layout === 'page') {
        createPage({
          path: node.frontmatter.path,
          component: pageTemplate,
          context: {
            tagList: tagList,
          },
        });
      }
    });

    // Generate a page for each tag based on the page component src/templates/tag.js
    if (tagList && tagList.length > 0) {
      tagList.forEach(tag => {
        createPage({
          path: "/tags/" + tag + ".html",
          component: tagTemplate,
          context: {
            tag: tag,
            tagList: tagList,
          }
        })
      })
    }

    // Generate the search page
    createPage({
      path: "/search.html",
      component: searchTemplate,
      context: {
        tagList: tagList,
      },
    })

  })
}

// Build a list of all tags that are used in the site
function buildTagList(data) {
  return _.uniq(data.reduce((acc, edge) => {
    return acc.concat(edge.node.frontmatter.tags)
  }, []))
  .filter(tag => {
    return tag !== null
  })
  .sort()
}
