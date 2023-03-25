import { useStaticQuery, graphql } from "gatsby"

export const GetBooksCategories = () => {
    const booksCategories = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/books/CATEGORIES.*/"}, ext: {eq: ".png"}}
            sort: {name: ASC}
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
    
    return booksCategories
}
      