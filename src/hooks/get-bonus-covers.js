import { useStaticQuery, graphql } from "gatsby"

export const GetBonusCovers = () => {
    const bonusCovers = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/bonus/.*/"}, ext: {eq: ".png"}, name: {eq: "COVER"}}
            sort: {fields: relativePath, order: DESC}
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
    
    return bonusCovers
}
      