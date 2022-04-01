import React from "react"
import Layout from "../components/layout"
import {Jumbotron} from 'react-bootstrap'
import SEO from "../components/seo";

export default function FourZeroFour() {
  return(
    <Layout showMenuBar={true}>
      <SEO title="404" description="Page Not Found!" />
      <section style={{marginBottom: `90px`}}>
        <h1 style={{textAlign: `center`}}>
          <img width="85%" alt="The FantaZZtic Five" src="/static/3f006716e92f737214226c1b1b949a39/Zene N Zeanne V4 FantaZZticFive.png" /><br />
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
