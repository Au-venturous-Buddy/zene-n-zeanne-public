import React, {useState} from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image";
import SEO from "../components/seo";
import ResponsiveHeader from "../components/responsive-header";
import SearchBox from "../components/search-box";
import MenuWindow from "../components/menu-window";
import {Button} from "react-bootstrap";
import ResponsiveSize from "../hooks/responsive-size";

export default function Credits() {
  const [currentSet, changeCurrentSet] = useState("ZNZN")

  const changeCurrentSetMain = () => {
    if(currentSet === "ZNZN") {
      changeCurrentSet("SSDT")
    }
    else {
      changeCurrentSet("ZNZN")
    }
  }

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

  var switchButton = (
    <Button style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} onClick={changeCurrentSetMain}>
      <span aria-hidden={true}>{(currentSet === "ZNZN") ? "Zene 'N Zeanne" : "Sporty Sam: Dream Team"}</span>
    </Button>
  )

  return (
    <Layout useCustomBackground={(currentSet === "SSDT") ? "wall-background" : null} menuBarItems={[(<MenuWindow pageID="credits" />), (<SearchBox />), (switchButton)]} showMenuBar={true}>
    <SEO title="Credits" description="Meet The People Behind Zene 'N Zeanne" />
    <div className={(currentSet === "ZNZN") ? "table-background" : "vr-background"}>
    <section className="py-3 m-3 home-credits-page">
      <section className="credits-photo-border" style={{margin: `0 auto`, padding: `1.45rem 1.0875rem`, maxWidth: 430}}>
        <div className="credits-photo-main">
          {
            (currentSet === "ZNZN") ?
            (<StaticImage src="../images/Zene N Zeanne V4 Credits.png" alt="Twin Power" layout="fullWidth" />) :
            (<StaticImage src="../images/Dream Team Emblem (Transparent).png" alt="DreamTeamEmblem" layout="fullWidth" />)
          }
        </div>
      </section>

      <section className="m-5" style={{textAlign: "center"}}>
          <section>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Created By:</ResponsiveHeader>
            <ul>
              <li>Ezekiel Adriel D. Lagmay</li>
            </ul>
          </section>
          
          <br />

          <section hidden={!(currentSet === "ZNZN")}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Creative Mentors:</ResponsiveHeader>
            <ul>
              <li>Sally Lagmay</li>
              <li>Carmela "Tita My" Castro-Nayve</li>
            </ul>
          </section>
          
          <br />

          <section>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Special Thanks To:</ResponsiveHeader>
            <ul>
              <li hidden={!(currentSet === "SSDT")}>Carlos Arcenas</li>
              <li><a className="ext-web-link" target="_blank" rel="noreferrer" href="https://www.facebook.com/MommanManila">Gia, Gelli, Diego, Miguel, Nino and Michelle Ressa-Aventajado</a></li>
              <li hidden={!(currentSet === "ZNZN")}>Vell Baria-Mitchell, her husband David Mitchell, and her twin brother Jessie Baria</li>
              <li>Joel M. Batitay</li>
              <li hidden={!(currentSet === "SSDT")}>Janine Cambay</li>
              <li hidden={!(currentSet === "ZNZN")}>Francine Campos and her brother Luis</li>
              <li hidden={!(currentSet === "ZNZN")}>Ciab Canoy and her brother Jose Canoy</li>
              <li>Neithan Casano</li>
              <li hidden={!(currentSet === "ZNZN")}>Courtney Castro</li>
              <li hidden={!(currentSet === "ZNZN")}>Catherine Cham and her son Vico Cham</li>
              <li hidden={!(currentSet === "SSDT")}>Gabrielle Anne Gabaton</li>
              <li>Miguel N. Galace</li>
              <li hidden={!(currentSet === "SSDT")}>Amanda, John, and Jeff Hsieh</li>
              <li hidden={!(currentSet === "ZNZN")}>Kim Kiernan</li>
              <li>Theo Lacson</li>
              <li hidden={!(currentSet === "ZNZN")}>Clowee Anne Licsi and her twin siblings Ereen and RenRen</li>
              <li hidden={!(currentSet === "SSDT")}><a className="ext-web-link" href="https://www.facebook.com/todaywiththelucas">Courageous Caitie, Ethan, Calea, Tori, Jayjay, and Feliz Lucas</a></li>
              <li>Anton Macrohon</li>
              <li>Abigail Magno</li>
              <li hidden={!(currentSet === "SSDT")}>Mighty Eli Marfil</li>
              <li hidden={!(currentSet === "ZNZN")}>Carmela Castro-Nayve, her husband Jon, and their twins Camille and Jonah</li>
              <li hidden={!(currentSet === "ZNZN")}>Alan Angelo Ng</li>
              <li hidden={!(currentSet === "ZNZN")}>Myara Poliarco</li>
              <li>Cheshire Que</li>
              <li>Melissa and Neil Que, and their kids Noah and Miranda</li>
              <li>Alyssa Leana Que</li>
              <li hidden={!(currentSet === "ZNZN")}>Emma Roco and Kate Roco</li>
              <li>Albert James Sayno</li>
              <li>Maria Mercedes "Didith" T. Rodrigo and her husband Reg Rodrigo</li>
              <li hidden={!(currentSet === "SSDT")}>Eric Vidal</li>
            </ul>
          </section>
          
          <br />

          <section>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>A Special Shout-Out Also to the Fans of the Following Media Serving as Inspiration for {(currentSet === "ZNZN") ? "Zene 'N Zeanne" : "Sporty Sam: Dream Team"}:</ResponsiveHeader>
            <ul>
              <li hidden={!(currentSet === "ZNZN")}><a className="ext-web-link" target="_blank" rel="noreferrer" href="https://sites.google.com/view/jonahandauti/home?authuser=0">Jonah's Adventures With Auti</a></li>
              <li hidden={!(currentSet === "SSDT")}>Marvel Cinematic Universe (Most especially The Avengers, X-Men, and Fantastic Four)</li>
              <li hidden={!(currentSet === "SSDT")}>Star Wars (Most especially the Stormtroopers, members of the 501st Legion, and that heartwarming Rogue One Globe commercial)</li>
              <li>My Little Pony: Friendship is Magic (and all related TV series, movies, and specials)</li>
              <li>My Little Pony: A New Generation</li>
              <li hidden={!(currentSet === "ZNZN")}>Reply 1988 (and the entire Reply series)</li>
              <li hidden={!(currentSet === "ZNZN")}>Hometown Cha-Cha-Cha</li>
              <li hidden={!(currentSet === "ZNZN")}>Upin and Ipin</li>
              <li hidden={!(currentSet === "ZNZN")}>Maya and Miguel</li>
              <li hidden={!(currentSet === "ZNZN")}>Peppa Pig</li>
              <li hidden={!(currentSet === "ZNZN")}>Bluey (2018 Series)</li>
              <li hidden={!(currentSet === "ZNZN")}>Team Umizoomi</li>
              <li hidden={!(currentSet === "ZNZN")}>Bubble Guppies</li>
              <li hidden={!(currentSet === "ZNZN")}>Ni Hao, Kai-Lan</li>
              <li hidden={!(currentSet === "ZNZN")}>Dora the Explorer</li>
              <li hidden={!(currentSet === "ZNZN")}>Dora and Friends: Into the City!</li>
              <li hidden={!(currentSet === "ZNZN")}>Jelly, Ben, and Pogo</li>
              <li hidden={!(currentSet === "SSDT")}>Power Rangers</li>
              <li hidden={!(currentSet === "SSDT")}>PAW Patrol</li>
              <li hidden={!(currentSet === "SSDT")}>PJ Masks</li>
              <li hidden={!(currentSet === "SSDT")}>DC Extended Universe</li>
              <li hidden={!(currentSet === "SSDT")}>HALO</li>
              <li hidden={!(currentSet === "SSDT")}>Minecraft</li>
              <li hidden={!(currentSet === "SSDT")}>Boboiboy</li>
              <li hidden={!(currentSet === "SSDT")}>Ejen Ali</li>
              <li hidden={!(currentSet === "SSDT")}>Contagion (2011 Film) (The Dream Begins Inspiration)</li>
            </ul>
          </section>

          <br />
          
          <section hidden={!(currentSet === "SSDT")}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Dedications:</ResponsiveHeader>
            <ul>
              <li>To all the brave COVID-19 frontliners, victims, and their loved ones (Volume 1)</li>
              <li>The late Pastor Dan Harder and his family, including his wife Ma'am Gina Harder and daughter Zoe Harder (Volume 1, Issue 2)</li>
            </ul>
          </section>
          
          <br />
      </section>

      <section className="m-5" style={{textAlign: "center"}}>
        <section style={{margin: `0 auto`, maxWidth: 260}}>
          <StaticImage src="../images/AUventurous Buddy Logo.png" alt="AU-venturous Buddy Logo" layout="fullWidth"></StaticImage>
        </section>

        <section className="m-2">
          To God be the Glory! <br />
          {`© ${new Date().getFullYear()} ${data.site.siteMetadata.author}`}
        </section>
      </section>
    </section>
    </div>
    </Layout>
  )
}