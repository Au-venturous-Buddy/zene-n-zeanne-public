import React from "react"
import Layout from "../components/layout"
import {Jumbotron} from 'react-bootstrap'
import SEO from "../components/seo";

export default function FourZeroFour() {
  return(
    <Layout showMenuBar={true}>
      <SEO title="404" description="Page Not Found!" />
      <Jumbotron className="hover-shadow hero">
        <h1 style={{textAlign: `center`, color: `#000`}}>
          Looks like this page doesn't exist yet!
        </h1>
        <br />
        <p style={{textAlign: `center`, color: `#000`}}>
          Please navigate to an existing page via the main menu below.
        </p>
      </Jumbotron>
    </Layout>
  )
}
