import React from "react"
import {Container, Row, Col} from 'react-bootstrap'
import MenuBar from "./menu-bar"
import Header from "./header"
import { useStaticQuery, graphql } from "gatsby"
import ResponsiveSize from "../hooks/responsive-size";

const HeaderMenuBar = function({show, pageID}) {
  if(show) {
    return(
      <MenuBar pageID={pageID}></MenuBar>
    )
  }
  else {
    return(
      <div></div>
    )
  }
}

export default function Layout({ pageID, children, showMenuBar }) {
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
    <div>
      <Container fluid className="px-0 main">
          <Row noGutters className="justify-content-center">
            <Col>
            <Header siteTitle={data.site.siteMetadata.title} />
            </Col>
          </Row>
          <Row noGutters>
            <Col>
              <Container fluid className="px-0">
                <main>{children}</main>
              </Container>
            </Col>
          </Row>
      </Container>
      <Container fluid className="px-0 main-navbar" style={{bottom: 0, position: `fixed`, width:`100%`, zIndex:`100`}}>
          <HeaderMenuBar show={showMenuBar} pageID={pageID} />
          <Row noGutters>
            <Col className="footer-col">
              <footer>
                <span style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}}>
                  <small>{`© ${new Date().getFullYear()} ${data.site.siteMetadata.author}`}</small>
                </span>
              </footer>
            </Col>
          </Row>
        </Container>
    </div>
  )
}