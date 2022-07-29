const {createFilePath} = require('gatsby-source-filesystem')
const path = require(`path`)

exports.onCreateNode = ({node, getNode, actions}) => {
    if(node.internal.type === 'MarkdownRemark') {
        const {createNodeField} = actions
        const slug = createFilePath({node, getNode, basePath: `assets`})
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}

exports.createPages = async({graphql, actions}) => {
    const {createPage} = actions
    const result = await graphql(`
    query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                format
              }
            }
          }
        }
      }
    `)
    
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
          if(node.frontmatter.format === "wordpress" || node.frontmatter.format === "wordpress-v2022_2" || node.frontmatter.format === "ausome-blogs") {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/wordpress-v2022_2/src/index.js`),
                context: {
                  // Data passed to context is available
                  // in page queries as GraphQL variables.
                  pagePath: node.fields.slug,
                }
            })
          }
          if(node.frontmatter.format === "wordpress-v2022_1") {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/wordpress-v2022_1/src/index.js`),
                context: {
                  // Data passed to context is available
                  // in page queries as GraphQL variables.
                  pagePath: node.fields.slug,
                }
            })
          }
          else if(node.frontmatter.format === "caption-slideshow-v2022_1") {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/caption-slideshow-v2022_1/src/index.js'),
                context: {
                  // Data passed to context is available
                  // in page queries as GraphQL variables.
                  pagePath: node.fields.slug,
                }
            })
          }
          else if(node.frontmatter.format === "grid-gallery") {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/grid-gallery/src/index.js'),
                context: {
                  // Data passed to context is available
                  // in page queries as GraphQL variables.
                  pagePath: node.fields.slug,
                }
            })
          }
          else if(node.frontmatter.format === "comic-strip") {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/comic-strip/src/index.js'),
                context: {
                  // Data passed to context is available
                  // in page queries as GraphQL variables.
                  pagePath: node.fields.slug,
                }
            })
          }
          else if(node.frontmatter.format === "quiz-v2022_1") {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/quiz-v2022_1/src/index.js'),
                context: {
                  // Data passed to context is available
                  // in page queries as GraphQL variables.
                  pagePath: node.fields.slug,
                }
            })
          }
        }  
    )
}