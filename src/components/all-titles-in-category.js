import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import {GridList, GridListTile} from '@material-ui/core';
import CloseButton from "./close-button";
import TitleInfoButton from "./title-info-button";
import ResponsiveHeader from "./responsive-header";

export default function AllTitlesInCategory({images, descriptions, categoryInfo, buttonLabel, buttonClassName, buttonStyle}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var titleList = [];
  for(var i = 0; i < images.allFile.edges.length; i++) {
    var titleCover = images.allFile.edges[i].node;
    var titleInfo = descriptions.allFile.edges[i].node;

    if(titleInfo.childMarkdownRemark.frontmatter.category === categoryInfo.category) {
      titleList.push(
        <GridListTile key={i}>
          <div
              style={{
              margin: `0 auto`,
              maxWidth: 330,
              paddingTop: `5%`,
              paddingBottom: `5%`
              }}
          >
            <TitleInfoButton info={titleInfo.childMarkdownRemark} cover={titleCover.publicURL} />
          </div>
        </GridListTile>
      )
    }
  }
  
  return(
  <>
    <Button style={buttonStyle} className={buttonClassName} onClick={handleShow}>{buttonLabel}</Button>
    <Modal size="md" show={show} onHide={handleClose} centered scrollable>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>{categoryInfo.category} - All Titles</ResponsiveHeader>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <GridList cellHeight="auto" spacing={5} cols={1}>
          {titleList}
        </GridList>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
    </Modal>
  </>
  )
}