import React, {useState} from "react"
import { Button, Modal, Badge } from "react-bootstrap"
import CloseButton from "./close-button";
import PlayNowButton from "./play-now-button";
import ResponsiveSize from "../hooks/responsive-size";

export default function MediaCover({title, cover, synopsis, slug, badgeItem, titleFontSize, playNowText}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
      <>
      <Button aria-label={`${title} - ${badgeItem}`} className="view img-button m-2" onClick={handleShow}>
        <div aria-hidden={true}>
          <img
            className="d-block w-100"
            src={cover}
            alt={title}
          />
          <div className="mask caption-background flex-center">
            <h4 className="m-3" style={{fontSize: titleFontSize}}>
              {title} <br />
              <Badge className="mt-3">{badgeItem}</Badge>
            </h4>
          </div>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <h1 style={{fontSize: ResponsiveSize(2, "rem", 0.001, 500), color: "#017BFF"}}>{title}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "justify", color: "#017BFF"}}>
          <section>
            <img
              className="hover-shadow-card d-block w-100 mb-3"
              src={cover}
              alt={title}
            />
            {synopsis}
          </section>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <PlayNowButton slug={slug}>{playNowText}</PlayNowButton>
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
      </>
    )
  }