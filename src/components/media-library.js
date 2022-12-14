import React, { useState } from "react"
import { Button, Modal, Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap"
import CloseButton from "./close-button";
import {BsCaretRightFill} from "react-icons/bs";
import CategoryFolder from "./category-folder";
import ResponsiveHeader from "./responsive-header"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo";
import SearchBox from "../components/search-box";
import MenuWindow from "../components/menu-window";
import ResponsiveSize from "../hooks/responsive-size";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

function VersionSelector({version, stateChangeFunction, closeFunction}) {
  const changeState = () => {
    stateChangeFunction(version)
    closeFunction()
  }
  
  return(
    <Button style={{border: `none`, backgroundColor: "white", color: "#017BFF"}} onClick={changeState}>
      {`Version ${version}`}
    </Button>
  )
}

function SelectVersionButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 250 }}
      overlay={helpTooltip("Select Version")}
    >
    <Button aria-label={`Select Version - Version ${props.currentVersion}`} onClick={handleShow} style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}}>
      <div aria-hidden={true}>
        Version {props.currentVersion} <BsCaretRightFill />
      </div>
    </Button>
    </OverlayTrigger>
    <Modal size="sm" show={show} onHide={handleClose} centered scrollable>
      <Modal.Header className="justify-content-center bold-text">
        <Modal.Title>
          <div style={{color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={1.5} minScreenSize={500}>Select Version</ResponsiveHeader>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section>
          <Container>
            {
              Object.keys(props.mediaItems).map((currentValue, index) => (
                <Row className="my-3 mx-1" style={{justifyContent: "center"}} key={index}>
                  <VersionSelector version={currentValue} stateChangeFunction={props.changeVersion} closeFunction={handleClose} />
                </Row>
              ))
            }
          </Container>
        </section>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={handleClose} />
      </Modal.Footer>
    </Modal>
    </>
  )
}
  
export default function MediaLibrary(props) {
  const [currentVersion, setCurrentVersion] = useState(props.defaultVersion);

  const changeVersion = (version) => setCurrentVersion(version)
  
  var mediaCurrentVersion = props.mediaItems[currentVersion];
  
  var mediaCategoriesItems = [];
  for(var i = 0; i < props.mediaCategories.allFile.edges.length; i++) {
    var currentValue = props.mediaCategories.allFile.edges[i].node;
    if(Object.keys(mediaCurrentVersion).includes(currentValue.name)) {
      mediaCategoriesItems.push(
        <CategoryFolder categoryName={currentValue.name.toLowerCase().replace(/ /g, "-")} buttonClassName={`view category-button ${props.buttonClassName}`} maxColumns={4} columnBreakpoints={[1200, 990, 520]} category={currentValue.name} contents={mediaCurrentVersion[currentValue.name]} subcategoryName={props.mediaSubCategoryName}>
          <div aria-hidden={true} className="category-button-contents">
            <GatsbyImage
              className="d-block w-100 category-img"
              image={getImage(currentValue)}
              alt={currentValue.name}
            />
            <div className="mt-3 bold-text category-caption" style={{textAlign: "center"}}>
              <ResponsiveHeader level={3} maxSize={0.9} minScreenSize={330}>{currentValue.name}</ResponsiveHeader>
            </div>
          </div>
        </CategoryFolder>
      )
    }
  }
  
  return(
    <Layout menuBarItems={[(<MenuWindow pageID={props.pageID} />), (<SelectVersionButton currentVersion={currentVersion} mediaItems={props.mediaItems} changeVersion={changeVersion} />), (<SearchBox />)]} showMenuBar={true}>
    <SEO title={props.title} description={props.description} />
      <section className="py-3 justify-content-center" style={{textAlign: "center"}}>
        <div className="my-3 py-3 media-shelf">
          <ul className={props.gridListClassName + " m-3"}>
            {mediaCategoriesItems.map((value, index) => (
              <li style={{display: "inline"}} key={index}>
                <div className="px-1 pt-3 m-3 media-shelf-design">
                  {value}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}