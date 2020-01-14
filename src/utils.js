const _ = require('lodash');

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

module.exports = {
  buildTagList,
}
