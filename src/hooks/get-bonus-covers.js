import { useStaticQuery, graphql } from "gatsby"

export const GetBonusCovers = () => {
    const bonusCovers = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/bonus/.*/"}, ext: {eq: ".png"}, name: {eq: "COVER"}}
            sort: {relativePath: DESC}
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
    
    return bonusCovers
}
      