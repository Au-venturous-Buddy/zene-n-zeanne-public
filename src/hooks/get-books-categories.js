import { useStaticQuery, graphql } from "gatsby"

export const GetBooksCategories = () => {
    const booksCategories = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/books/CATEGORIES.*/"}, ext: {eq: ".png"}}
            sort: {fields: name, order: ASC}
          ) {
            edges {
              node {
                relativeDirectory
                name
                ext
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
        `
        )
    
    return booksCategories
}
      