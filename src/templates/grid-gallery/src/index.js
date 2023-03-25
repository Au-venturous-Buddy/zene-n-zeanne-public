import React, { useState } from "react";
import Layout from "../../../components/layout"
import { graphql } from "gatsby";
import SEO from "../../../components/seo";
import {ImageList, ImageListItem} from '@mui/material';
import {Container, Button, Modal, Form} from 'react-bootstrap';
import CloseButton from "../../../components/close-button";
import ResponsiveGridColumns from "../../../hooks/responsive-grid-columns";
import ResponsiveHeader from "../../../components/responsive-header";
import ResponsiveSize from "../../../hooks/responsive-size";
import SettingsButton from "../../../components/settings-button";

function SettingsWindow(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <SettingsButton fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} handleShow={handleShow} />
      <Modal show={show} onHide={handleClose} fullscreen={true} scrollable={true}>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Settings</ResponsiveHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
              Table Background
            </ResponsiveHeader>
          </div>
          <Form.Select style={{color: "#017BFF"}} className="hover-shadow" id="table-background-selector" onChange={props.changeTableBackground} value={props.currentTableBackground}>
            {props.tableBackgroundOptions.map((value) => (<option key={value}>{value}</option>))}
          </Form.Select>
        </section>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={handleClose} />
      </Modal.Footer>
    </Modal>
    </>
  )
}

function ShowImage({image, title}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <Button className="view img-button" onClick={handleShow}>
          <img
            className="d-block w-100"
            src={image.publicURL}
            alt={image.name}
          />
      </Button>
      <Modal size="lg" show={show} onHide={handleClose} centered scrollable>
          <Modal.Header className="justify-content-center">
            <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
              <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>
                {`${title} - Image ${image.name}`}
              </ResponsiveHeader>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "justify"}}>
            <img
              className="hover-shadow-card d-block w-100 mb-3"
              src={image.publicURL}
              alt={image.name}
            />
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <CloseButton handleClose={handleClose} />
          </Modal.Footer>
        </Modal>
    </>
    )
}

function GridGalleryMain({images, title}) {
  var imgDisplay = [];
  
  for(var i = 0; i < images.length; i++) {
    imgDisplay.push(
      <ShowImage key={images[i].name} image={images[i]} title={title} />
    )
  }

  return (
    <Container className="py-5">
      <div className="mb-5" style={{textAlign: "center"}}>
        <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>
          {title}
        </ResponsiveHeader>
      </div>
      <ImageList rowHeight="auto" gap={5} cols={ResponsiveGridColumns(4, imgDisplay.length, [993, 770, 500])}>
        {imgDisplay.map((currentValue, index) => (
          <ImageListItem key={index}>
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 330,
                padding: `10%`
              }}
            >
              {currentValue}
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}

export default function GridGallery({data}) {
  const [currentTableBackground, changeTableBackground] = useState("Zene")

  const changeTableBackgroundMain = () => {
    var tableBackground = document.getElementById("table-background-selector").value;
    changeTableBackground(tableBackground);
  }

  var metadataItems = null;
  var images = [];
  for(var i = 0; i < data.allFile.edges.length; i++) {
    var nodeItem = data.allFile.edges[i].node
    if(nodeItem.relativeDirectory.includes("images") && nodeItem.ext === ".png") {
      images.push(nodeItem);
    }
    else if(nodeItem.ext === ".md" && nodeItem.name === "index") {
      metadataItems = nodeItem;
    }
  }

  return (
    <Layout showMenuBar menuBarItems={[(<SettingsWindow currentTableBackground={currentTableBackground} changeTableBackground={changeTableBackgroundMain} tableBackgroundOptions={['Zene', 'Zeanne', 'Classroom Table']} />)]}>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <div className={"table-background-" + currentTableBackground.toLowerCase().replace(/ /g, "-")} style={{textAlign: 'center'}}>
        <div className="miscellaneous-page" style={{textAlign: 'center'}}>
          <GridGalleryMain title={metadataItems.childMarkdownRemark.frontmatter.title} images={images} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($pagePath: String!) {
    allFile(
      filter: {relativeDirectory: {regex: $pagePath}}
      sort: {relativePath: ASC}
    ) {
      edges {
        node {
          name
          ext
          relativeDirectory
          publicURL
          childMarkdownRemark {
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`