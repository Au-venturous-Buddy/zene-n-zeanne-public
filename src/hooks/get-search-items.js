import { useStaticQuery, graphql } from "gatsby"

export const GetSearchItems = () => {
    const searchItems = useStaticQuery(
        graphql`
        query {
            allFile(
              filter: {extension: {eq: "md"}, name: {eq: "index"}}
              sort: {fields: relativeDirectory, order: DESC}
            ) {
              edges {
                node {
                  extension
                  name
                  childMarkdownRemark {
                    frontmatter {
                      title
                      synopsis
                      category
                      version
                    }
                    fields {
                      slug
                    }
                  }
                  relativeDirectory
                }
              }
            }
          }
        `
    )
    return searchItems;
}