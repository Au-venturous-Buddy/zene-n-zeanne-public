import { useStaticQuery, graphql } from "gatsby"

export const GetBonusCategories = () => {
    const bonusCategories = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/bonus/CATEGORIES.*/"}, ext: {eq: ".png"}}
            sort: {fields: name, order: ASC}
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
    
    return bonusCategories
}
      