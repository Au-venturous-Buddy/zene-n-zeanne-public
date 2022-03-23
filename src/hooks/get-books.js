import { useStaticQuery, graphql } from "gatsby"

export const GetBooks = () => {
    const booksData = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/books/.*/"}, ext: {eq: ".md"}, name: {eq: "index"}}
            sort: {fields: relativePath, order: DESC}
          ) {
            edges {
              node {
                relativeDirectory
                name
                ext
                childMarkdownRemark {
                  frontmatter {
                    title
                    category
                    version
                    volume
                    issue
                    synopsis
                  }
                  internal {
                    content
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        }
        `
        )
    
    return booksData
}
      