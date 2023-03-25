import React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"
import {GiPartyFlags, GiVrHeadset} from "react-icons/gi";
import {FaCross, FaInfinity, FaCommentMedical} from "react-icons/fa";
import {IoIosBasketball} from "react-icons/io"
import SEO from "../components/seo";
import ResponsiveHeader from "../components/responsive-header";
import SearchBox from "../components/search-box";
import MenuWindow from "../components/menu-window";

export default function Home() {
  return(
    <Layout menuBarItems={[(<MenuWindow pageID="home" />), (<SearchBox />)]} showMenuBar={true}>
    <SEO title="Home" description="Welcome to the Zene 'N Zeanne Official Website!" />
    <div className="table-background">
    <section className="py-3 m-3 home-credits-page">
      <section className="py-3 hero">
        <div style={{textAlign: `center`, margin: 0}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 860,
              padding: `1.45rem 1.0875rem`
            }}
            className="mb-4"
          >
            <div style={{ margin: 0 }}>
              <StaticImage src="../images/ZNZNxSSDT.png" alt="Zene 'N Zeanne Meets Sporty Sam: Dream Team" layout="fullWidth"></StaticImage>
            </div>
          </div>
          "Au-Some" meets "Dare Dream Big"!
          </ResponsiveHeader>
        </div>
        <p style={{textAlign: `center`}}>
          Sporty Sam: Dream Team is now joining forces with Zene 'N Zeanne to promote a culture of acceptance and love for everyone, even for all persons with disabilities of all kinds.
        </p>
      </section>
      <section className="py-3" style={{textAlign: `center`}}>
        <div className="mb-3">
          <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={800}>Zene 'n Zeanne aims to help you learn:</ResponsiveHeader>
        </div>
        <ul>
          <li><FaInfinity aria-hidden={true} /> Disability Inclusion and Acceptance</li>
          <li><GiPartyFlags aria-hidden={true} /> Filipino Culture and Pride</li>
          <li><FaCross aria-hidden={true} /> Christianity, Faith, and Spirituality</li>
          <li><IoIosBasketball aria-hidden={true} /> Staying Fit through Different Types of Sports and Exercises</li>
          <li><FaCommentMedical aria-hidden={true} /> Healthcare Reforms</li>
          <li><GiVrHeadset aria-hidden={true} /> Usage of Virtual/Mixed/Augmented Reality Technologies</li>
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
          <StaticImage src="../images/AUventurous Buddy Logo.png" alt="AU-venturous Buddy Logo" layout="fullWidth"></StaticImage>
        </div>
      </section>
    </section>
    </div>
    </Layout>
  )
}
