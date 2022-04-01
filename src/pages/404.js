import React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"
import SEO from "../components/seo";

export default function FourZeroFour() {
  return(
    <Layout showMenuBar={true}>
      <SEO title="404" description="Page Not Found!" />
      <section style={{marginBottom: `90px`}}>
        <h1 style={{textAlign: `center`}}>
        <div
            style={{
              margin: `0 auto`,
              maxWidth: 860,
              padding: `1.45rem 1.0875rem`,
            }}
          >
            <div style={{ margin: 0 }}>
              <StaticImage src="../images/Zene N Zeanne V4 FantaZZticFive.png" alt="The FantaZZtic Five" layout="fullWidth"></StaticImage>
            </div>
          </div>
          Looks like this page doesn't exist yet!
        </h1>
        <br />
        <p style={{textAlign: `center`}}>
          Please navigate to an existing page via the main menu below.
        </p>
      </section>
    </Layout>
  )
}
