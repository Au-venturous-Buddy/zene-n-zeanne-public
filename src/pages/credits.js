import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";
import SEO from "../components/seo";
import ResponsiveSize from "../hooks/responsive-size";

export default function Credits() {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title,
            author
          }
        }
      }
    `
  )

  return (
    <Layout pageID="credits" showMenuBar={true}>
      <SEO title="Credits" description="Meet The People Behind Zene 'N Zeanne" />
      <section style={{margin: `0 auto`, maxWidth: 430}}>
        <StaticImage src="../images/Zene N Zeanne V4 Credits.png" alt="Twin Power" layout="fullWidth" />
      </section>

      <section className="m-5" style={{textAlign: "center", color: `#fff`}}>
          <h1 style={{fontSize: ResponsiveSize(2, "rem", 0.001, 500)}}>
            Credits
          </h1>

          <br />

          <section>
            <h2 style={{fontSize: ResponsiveSize(1.5, "rem", 0.001, 500)}}>Created By:</h2>
            <ul>
              <li>Ezekiel Adriel D. Lagmay</li>
            </ul>
          </section>
          
          <br />

          <section>
            <h2 style={{fontSize: ResponsiveSize(1.5, "rem", 0.001, 500)}}>Creative Mentors:</h2>
            <ul>
              <li>Sally Lagmay</li>
              <li>Carmela "Tita My" Castro-Nayve</li>
            </ul>
          </section>
          
          <br />

          <section>
            <h2 style={{fontSize: ResponsiveSize(1.5, "rem", 0.001, 500)}}>Special Thanks To:</h2>
            <ul>
              <li><a className="ext-web-link" target="_blank" rel="noreferrer" href="https://www.facebook.com/MommanManila">Gia, Gelli, Diego, Miguel, Nino and Michelle Ressa-Aventajado</a></li>
              <li>Vell Baria-Mitchell, her husband David Mitchell, and her twin brother Jessie Baria</li>
              <li>Joel M. Batitay</li>
              <li>Francine Campos and her brother Luis</li>
              <li>Ciab Canoy and her brother Jose Canoy</li>
              <li>Neithan Casano</li>
              <li>Courtney Castro</li>
              <li>Catherine Cham and her son Vico Cham</li>
              <li>Miguel N. Galace</li>
              <li>Kim Kiernan</li>
              <li>Clowee Anne Licsi and her twin siblings Ereen and RenRen</li>
              <li>Abigail Magno</li>
              <li>Carmela Castro-Nayve, her husband Jon, and their twins Camille and Jonah</li>
              <li>Alan Angelo Ng</li>
              <li>Myara Poliarco</li>
              <li>Cheshire Que</li>
              <li>Melissa and Neil Que, and their kids Noah and Miranda</li>
              <li>Alyssa Leana Que</li>
              <li>Emma Roco and Kate Roco</li>
              <li>Maria Mercedes "Didith" T. Rodrigo and her husband Reg Rodrigo</li>
            </ul>
          </section>
          
          <br />

          <section>
            <h2 style={{fontSize: ResponsiveSize(1.5, "rem", 0.001, 500)}}>A Special Shout-Out Also to the Fans of the Following Media Serving as Inspiration for Zene 'N Zeanne:</h2>
            <ul>
              <li><a className="ext-web-link" target="_blank" rel="noreferrer" href="https://sites.google.com/view/jonahandauti/home?authuser=0">Jonah's Adventures With Auti</a></li>
              <li>My Little Pony: Friendship is Magic (and all related TV series, movies, and specials)</li>
              <li>My Little Pony: A New Generation</li>
              <li>Reply 1988 (and the entire Reply series)</li>
              <li>Hometown Cha-Cha-Cha</li>
              <li>Upin and Ipin</li>
              <li>Maya and Miguel</li>
              <li>Peppa Pig</li>
              <li>Bluey (2018 Series)</li>
              <li>Team Umizoomi</li>
              <li>Bubble Guppies</li>
              <li>Ni Hao, Kai-Lan</li>
              <li>Dora the Explorer</li>
              <li>Dora and Friends: Into the City!</li>
              <li>Jelly, Ben, and Pogo</li>
            </ul>
          </section>
          
          {/*<li>
            Dedications:<br />
          </li>
          
          <br />*/}
      </section>

      <section className="m-5" style={{textAlign: "center", color: `#fff`}}>
        <section style={{margin: `0 auto`, maxWidth: 260}}>
          <StaticImage src="../images/FantaZZticNationCreativesLogo.png" alt="FantaZZticNation Creatives Logo" layout="fullWidth" />
        </section>

        <section className="m-2">
          To God be the Glory! <br />
          {`© ${new Date().getFullYear()} ${data.site.siteMetadata.author}`}
        </section>
      </section>
    </Layout>
  )
}