import { useStaticQuery, graphql } from "gatsby"

export const GetVideosCategories = () => {
    const videosCategories = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/videos/CATEGORIES.*/"}, ext: {eq: ".png"}}
            sort: {fields: name, order: ASC}
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
    
    return videosCategories
}
      