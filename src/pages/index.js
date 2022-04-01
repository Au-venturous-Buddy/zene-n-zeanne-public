import React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"
import {BsPuzzleFill} from "react-icons/bs";
import {GiPartyFlags} from "react-icons/gi";
import {FaCross} from "react-icons/fa";
import SEO from "../components/seo";

export default function Home() {
  return(
    <Layout pageID="home" showMenuBar={true}>
      <SEO title="Home" description="Welcome to the Zene 'N Zeanne Official Website!" />
      <section className="py-3 hero">
        <h1 style={{textAlign: `center`, margin: 0}}>
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
          Your Pinoy Twin Buddies.
        </h1>
        <br />
        <p style={{textAlign: `center`}}>
          New neighbors. New friends. New stories. Same twin power.
        </p>
      </section>
      <section className="py-3" style={{textAlign: `center`, color: `#fff`}}>
        <h3 className="mb-3">Zene 'n Zeanne aims to help you learn:</h3>
        <ul>
          <li><BsPuzzleFill aria-hidden={true} /> Autism Inclusion and Acceptance</li>
          <li><GiPartyFlags aria-hidden={true} /> Filipino Culture and Pride</li>
          <li><FaCross aria-hidden={true} /> Christianity, Faith, and Spirituality</li>
        </ul>
      </section>
      <section
        style={{
          margin: `0 auto`,
          marginTop: `50px`, 
          marginBottom: `90px`,
          maxWidth: 460,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <div style={{ margin: 0 }}>
          <StaticImage src="../images/CreativeNormal.png" alt="Be part of the #CreativeNormal" layout="fullWidth"></StaticImage>
        </div>
      </section>
    </Layout>
  )
}
