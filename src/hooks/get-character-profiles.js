import { useStaticQuery, graphql } from "gatsby"

export const GetCharacterProfiles = () => {
    const characterProfiles = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/characters/.*/"}, ext: {eq: ".png"}, name: {eq: "PROFILE"}}
            sort: {relativeDirectory: ASC}
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
    
    return characterProfiles
}
      