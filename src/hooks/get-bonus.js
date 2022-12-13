import { useStaticQuery, graphql } from "gatsby"

export const GetBonus = () => {
    const bonusData = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/bonus/.*/"}, ext: {eq: ".md"}, name: {eq: "index"}}
            sort: {relativePath: DESC}
          ) {
            edges {
              node {
                relativeDirectory
                name
                ext
                childMarkdownRemark {
                  frontmatter {
                    title
                    category
                    version
                    wave
                    release
                    synopsis
                  }
                  internal {
                    content
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        }
        `
        )
    
    return bonusData
}
      