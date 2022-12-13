import { useStaticQuery, graphql } from "gatsby"

export const GetCharacterInfo = () => {
    const characterInfo = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/characters/.*/"}, ext: {eq: ".md"}, name: {eq: "index"}}
            sort: {relativeDirectory: ASC}
          ) {
            edges {
              node {
                relativeDirectory
                name
                ext
                childMarkdownRemark {
                  frontmatter {
                    version
                    name
                    short_description
                    character_groups
                  }
                  internal {
                    content
                  }
                  html
                }
              }
            }
          }
        }
        `
        )
    
    return characterInfo
}
      