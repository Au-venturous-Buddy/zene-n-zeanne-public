import { useStaticQuery, graphql } from "gatsby"

export const GetVideos = () => {
    const videosData = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/videos/.*/"}, ext: {eq: ".md"}, name: {eq: "index"}}
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
                    season
                    episode
                    category
                    version
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
    
    return videosData
}
      