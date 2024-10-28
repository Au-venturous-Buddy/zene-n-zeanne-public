import { useStaticQuery, graphql } from "gatsby"

export const GetBooks = () => {
    const booksData = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/books/.*/"}, ext: {eq: ".md"}, name: {eq: "index"}}
            sort: {relativePath: DESC}
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
                    url
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
      