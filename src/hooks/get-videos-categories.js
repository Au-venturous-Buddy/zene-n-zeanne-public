import { useStaticQuery, graphql } from "gatsby"

export const GetVideosCategories = () => {
    const videosCategories = useStaticQuery(
        graphql`
        query {
          allFile(
            filter: {relativeDirectory: {regex: "/assets/videos/CATEGORIES.*/"}, ext: {eq: ".png"}}
            sort: {name: ASC}
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
    
    return videosCategories
}
      