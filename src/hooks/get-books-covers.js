import { useStaticQuery, graphql } from "gatsby"

export const GetBooksCovers = () => {
    const booksCovers = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/books/.*/"}, ext: {eq: ".png"}, name: {eq: "COVER"}}
            sort: {relativePath: DESC}
          ) {
            edges {
              node {
                relativeDirectory
                name
                ext
                publicURL
              }
            }
          }
        }
        `
        )
    
    return booksCovers
}
      