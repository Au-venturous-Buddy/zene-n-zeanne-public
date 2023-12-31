import { useStaticQuery, graphql } from "gatsby"

export const GetCharacterPhotos = () => {
    const characterPhotos = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/characters/.*/"}, ext: {eq: ".png"}, name: {eq: "PHOTO"}}
            sort: {relativeDirectory: ASC}
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
    
    return characterPhotos
}
      