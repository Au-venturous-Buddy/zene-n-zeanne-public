import React, { useState } from "react";
import Layout from "../components/layout"
import { graphql } from "gatsby";
import SEO from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {GridList, GridListTile} from '@material-ui/core';
import {Container, Button, Modal} from 'react-bootstrap';
import CloseButton from "../components/close-button";
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import ResponsiveHeader from "../components/responsive-header";

function ShowImage({image, title}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <Button className="view img-button" onClick={handleShow}>
          <GatsbyImage
            className="d-block w-100"
            image={getImage(image)}
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
            <GatsbyImage
              className="hover-shadow-card d-block w-100 mb-3"
              image={getImage(image)}
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
    <Container className="my-5">
      <div className="mb-5" style={{color: "#fff", textAlign: "center"}}>
        <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>
          {title}
        </ResponsiveHeader>
      </div>
      <GridList cellHeight="auto" spacing={5} cols={ResponsiveGridColumns(4, [993, 770, 500])}>
        {imgDisplay.map((currentValue, index) => (
          <GridListTile key={index}>
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 330,
                padding: `10%`
              }}
            >
              {currentValue}
            </div>
          </GridListTile>
        ))}
      </GridList>
    </Container>
  )
}

export default function GridGallery({data}) {
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
    <Layout showMenuBar={false}>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <div style={{textAlign: 'center'}}>
        <GridGalleryMain title={metadataItems.childMarkdownRemark.frontmatter.title} images={images} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($pagePath: String!) {
    allFile(
      filter: {relativeDirectory: {regex: $pagePath}}
      sort: {fields: relativePath, order: ASC}
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
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`