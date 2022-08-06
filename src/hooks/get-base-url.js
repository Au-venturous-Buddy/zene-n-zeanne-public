import { useStaticQuery, graphql } from 'gatsby'

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined"

export default function GetBaseURL() {
    if(isBrowser) {
      return window.location.origin;
    }
    else {
      const domain = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            domain
          }
        }
      }
      `)
      return domain.site.siteMetadata.domain
    }
}