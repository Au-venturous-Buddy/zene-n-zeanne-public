import { useStaticQuery, graphql } from "gatsby"

export const GetCharacterProfiles = () => {
    const characterProfiles = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/characters/.*/"}, ext: {eq: ".png"}, name: {eq: "PROFILE"}}
            sort: {fields: relativeDirectory, order: ASC}
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
    
    return characterProfiles
}
      