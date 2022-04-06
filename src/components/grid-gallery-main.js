import React, { useState } from "react"
import {GridList, GridListTile} from '@material-ui/core';
import {Container, Button, Modal} from 'react-bootstrap';
import CloseButton from "./close-button";
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import ResponsiveHeader from "./responsive-header";

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

export default function GridGalleryMain({images, title}) {
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