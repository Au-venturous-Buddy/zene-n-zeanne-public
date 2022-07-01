import { useStaticQuery, graphql } from "gatsby"

export const GetVideosCovers = () => {
    const videosCovers = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/videos/.*/"}, ext: {eq: ".png"}, name: {eq: "COVER"}}
            sort: {fields: relativePath, order: DESC}
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
    
    return videosCovers
}
      